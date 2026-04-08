import axios from 'axios';
import { Application, Job } from '../types';
import { mockJobs } from '../data/mockJobs';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const SAVED_JOB_IDS_KEY = 'saved-job-ids';
const APPLICATIONS_KEY = 'submitted-applications';

type ApplicationStatus = Application['status'];

interface SubmittedApplicationInput {
    jobId: string;
    name: string;
    email: string;
    resume: File | null;
    coverLetter: string;
}

const normalizeStoredApplications = (value: unknown): Application[] => {
    if (!Array.isArray(value)) {
        return [];
    }

    return value
        .map((entry) => {
            if (!entry || typeof entry !== 'object') {
                return null;
            }

            const application = entry as Partial<Application> & {
                name?: string;
                email?: string;
                resumeName?: string;
            };

            return {
                id: String(application.id ?? `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
                jobId: String(application.jobId ?? ''),
                applicantName: String(application.applicantName ?? application.name ?? ''),
                applicantEmail: String(application.applicantEmail ?? application.email ?? ''),
                resume: String(application.resume ?? application.resumeName ?? 'No file'),
                coverLetter: application.coverLetter ?? '',
                submittedAt: String(application.submittedAt ?? new Date().toISOString()),
                status: (application.status ?? 'applied') as ApplicationStatus,
            } as Application;
        })
        .filter((item): item is Application => Boolean(item?.jobId && item.applicantName && item.applicantEmail));
};

const getStoredApplications = (): Application[] => {
    const currentApplications = window.localStorage.getItem(APPLICATIONS_KEY);
    if (!currentApplications) {
        return [];
    }

    try {
        return normalizeStoredApplications(JSON.parse(currentApplications));
    } catch {
        return [];
    }
};

const setStoredApplications = (applications: Application[]): void => {
    window.localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
};

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
    const input = applicationData as SubmittedApplicationInput;
    const localApplication: Application = {
        id: `app-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        jobId: input.jobId,
        applicantName: input.name,
        applicantEmail: input.email,
        resume: input.resume?.name ?? 'No file',
        coverLetter: input.coverLetter,
        submittedAt: new Date().toISOString(),
        status: 'applied',
    };

    if (!API_BASE_URL) {
        const parsed = getStoredApplications();
        parsed.push(localApplication);
        setStoredApplications(parsed);

        return { message: 'Application saved locally.' };
    }

    try {
        const response = await axios.post<{ message: string }>(`${API_BASE_URL}/applications`, applicationData);
        const parsed = getStoredApplications();
        parsed.push(localApplication);
        setStoredApplications(parsed);
        return response.data;
    } catch {
        const parsed = getStoredApplications();
        parsed.push(localApplication);
        setStoredApplications(parsed);

        return { message: 'Application saved locally.' };
    }
};

export const fetchTrackedApplications = async (): Promise<Application[]> => {
    if (!API_BASE_URL) {
        return getStoredApplications();
    }

    try {
        const response = await axios.get<Application[]>(`${API_BASE_URL}/applications`);
        const normalized = normalizeStoredApplications(response.data);
        if (normalized.length > 0) {
            setStoredApplications(normalized);
            return normalized;
        }

        return getStoredApplications();
    } catch {
        return getStoredApplications();
    }
};

export const updateApplicationStatus = async (
    applicationId: string,
    status: ApplicationStatus
): Promise<{ message: string }> => {
    const current = getStoredApplications();
    const updated = current.map((application) =>
        application.id === applicationId ? { ...application, status } : application
    );
    setStoredApplications(updated);

    if (!API_BASE_URL) {
        return { message: 'Status updated locally.' };
    }

    try {
        await axios.patch(`${API_BASE_URL}/applications/${applicationId}`, { status });
        return { message: 'Status updated successfully.' };
    } catch {
        return { message: 'Status updated locally.' };
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
