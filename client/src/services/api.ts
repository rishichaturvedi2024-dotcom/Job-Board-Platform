import axios from 'axios';
import { Job } from '../types';
import { mockJobs } from '../data/mockJobs';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const SAVED_JOB_IDS_KEY = 'saved-job-ids';
const APPLICATIONS_KEY = 'submitted-applications';

const getSavedJobIds = (): string[] => {
    const stored = window.localStorage.getItem(SAVED_JOB_IDS_KEY);
    if (!stored) {
        return [];
    }

    try {
        return JSON.parse(stored) as string[];
    } catch {
        return [];
    }
};

const setSavedJobIds = (ids: string[]): void => {
    window.localStorage.setItem(SAVED_JOB_IDS_KEY, JSON.stringify(ids));
};

const getLocalJobs = (filters?: { location?: string; jobType?: string }): Job[] => {
    if (!filters) {
        return mockJobs;
    }

    const location = filters.location?.trim().toLowerCase();
    const jobType = filters.jobType?.trim().toLowerCase();

    return mockJobs.filter((job) => {
        const matchesLocation = !location || job.location.toLowerCase().includes(location);
        const matchesJobType = !jobType || job.jobType.toLowerCase() === jobType;

        return matchesLocation && matchesJobType;
    });
};

export const fetchJobs = async (filters?: { location?: string; jobType?: string }): Promise<Job[]> => {
    if (!API_BASE_URL) {
        return getLocalJobs(filters);
    }

    try {
        const response = await axios.get<Job[]>(`${API_BASE_URL}/jobs`, { params: filters });
        return response.data;
    } catch {
        return getLocalJobs(filters);
    }
};

export const fetchJobDetails = async (jobId: string): Promise<Job | null> => {
    if (!API_BASE_URL) {
        return mockJobs.find((job) => job.id === jobId) ?? null;
    }

    try {
        const response = await axios.get<Job>(`${API_BASE_URL}/jobs/${jobId}`);
        return response.data;
    } catch {
        return mockJobs.find((job) => job.id === jobId) ?? null;
    }
};

export const submitApplication = async (applicationData: unknown): Promise<{ message: string }> => {
    if (!API_BASE_URL) {
        const currentApplications = window.localStorage.getItem(APPLICATIONS_KEY);
        const parsed = currentApplications ? (JSON.parse(currentApplications) as unknown[]) : [];
        parsed.push(applicationData);
        window.localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(parsed));

        return { message: 'Application saved locally.' };
    }

    try {
        const response = await axios.post<{ message: string }>(`${API_BASE_URL}/applications`, applicationData);
        return response.data;
    } catch {
        const currentApplications = window.localStorage.getItem(APPLICATIONS_KEY);
        const parsed = currentApplications ? (JSON.parse(currentApplications) as unknown[]) : [];
        parsed.push(applicationData);
        window.localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(parsed));

        return { message: 'Application saved locally.' };
    }
};

export const saveJob = async (jobId: string): Promise<{ message: string }> => {
    const savedIds = getSavedJobIds();
    if (!savedIds.includes(jobId)) {
        savedIds.push(jobId);
        setSavedJobIds(savedIds);
    }

    if (!API_BASE_URL) {
        return { message: 'Job saved locally.' };
    }

    try {
        await axios.post(`${API_BASE_URL}/savedJobs`, { jobId });
        return { message: 'Job saved successfully.' };
    } catch {
        return { message: 'Job saved locally.' };
    }
};

export const fetchSavedJobs = async (): Promise<Job[]> => {
    const savedIds = getSavedJobIds();

    if (!API_BASE_URL) {
        return mockJobs.filter((job) => savedIds.includes(job.id));
    }

    try {
        const response = await axios.get<{ jobId: string }[]>(`${API_BASE_URL}/savedJobs`);
        const idsFromApi = response.data.map((item) => item.jobId);
        setSavedJobIds(idsFromApi);

        return mockJobs.filter((job) => idsFromApi.includes(job.id));
    } catch {
        return mockJobs.filter((job) => savedIds.includes(job.id));
    }
};

export const clearSavedJobs = async (): Promise<{ message: string }> => {
    const savedIds = getSavedJobIds();
    setSavedJobIds([]);

    if (!API_BASE_URL) {
        return { message: 'Saved jobs cleared locally.' };
    }

    try {
        await Promise.all(
            savedIds.map((id) => axios.delete(`${API_BASE_URL}/savedJobs/${id}`))
        );
        return { message: 'Saved jobs cleared successfully.' };
    } catch {
        return { message: 'Saved jobs cleared locally.' };
    }
};

// Backward-compatible aliases used by older imports.
export const getJobDetails = fetchJobDetails;
export const getSavedJobs = fetchSavedJobs;
