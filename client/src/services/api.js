import axios from 'axios';
import { mockJobs } from '../data/mockJobs';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const SAVED_JOB_IDS_KEY = 'saved-job-ids';
const APPLICATIONS_KEY = 'submitted-applications';

const normalizeStoredApplications = (value) => {
    if (!Array.isArray(value)) {
        return [];
    }

    return value
        .map((entry) => {
            if (!entry || typeof entry !== 'object') {
                return null;
            }

            const application = entry;

            return {
                id: String(application.id ?? `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
                jobId: String(application.jobId ?? ''),
                applicantName: String(application.applicantName ?? application.name ?? ''),
                applicantEmail: String(application.applicantEmail ?? application.email ?? ''),
                resume: String(application.resume ?? application.resumeName ?? 'No file'),
                coverLetter: application.coverLetter ?? '',
                submittedAt: String(application.submittedAt ?? new Date().toISOString()),
                status: application.status ?? 'applied',
            };
        })
        .filter((item) => Boolean(item?.jobId && item.applicantName && item.applicantEmail));
};

const getStoredApplications = () => {
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

const setStoredApplications = (applications) => {
    window.localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
};

const getSavedJobIds = () => {
    const stored = window.localStorage.getItem(SAVED_JOB_IDS_KEY);
    if (!stored) {
        return [];
    }

    try {
        return JSON.parse(stored);
    } catch {
        return [];
    }
};

const setSavedJobIds = (ids) => {
    window.localStorage.setItem(SAVED_JOB_IDS_KEY, JSON.stringify(ids));
};

const getLocalJobs = (filters) => {
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

export const fetchJobs = async (filters) => {
    if (!API_BASE_URL) {
        return getLocalJobs(filters);
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/jobs`, { params: filters });
        return response.data;
    } catch {
        return getLocalJobs(filters);
    }
};

export const fetchJobDetails = async (jobId) => {
    if (!API_BASE_URL) {
        return mockJobs.find((job) => job.id === jobId) ?? null;
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/jobs/${jobId}`);
        return response.data;
    } catch {
        return mockJobs.find((job) => job.id === jobId) ?? null;
    }
};

export const submitApplication = async (applicationData) => {
    const input = applicationData;
    const localApplication = {
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
        const response = await axios.post(`${API_BASE_URL}/applications`, applicationData);
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

export const fetchTrackedApplications = async () => {
    if (!API_BASE_URL) {
        return getStoredApplications();
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/applications`);
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

export const updateApplicationStatus = async (applicationId, status) => {
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

export const saveJob = async (jobId) => {
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

export const fetchSavedJobs = async () => {
    const savedIds = getSavedJobIds();

    if (!API_BASE_URL) {
        return mockJobs.filter((job) => savedIds.includes(job.id));
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/savedJobs`);
        const idsFromApi = response.data.map((item) => item.jobId);
        setSavedJobIds(idsFromApi);

        return mockJobs.filter((job) => idsFromApi.includes(job.id));
    } catch {
        return mockJobs.filter((job) => savedIds.includes(job.id));
    }
};

export const clearSavedJobs = async () => {
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

export const getJobDetails = fetchJobDetails;
export const getSavedJobs = fetchSavedJobs;
