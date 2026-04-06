export interface Job {
    id: string;
    title: string;
    description: string;
    location: string;
    jobType: string;
    company: string;
    postedDate: string;
    salary?: string;
}

export interface Application {
    id: string;
    jobId: string;
    applicantName: string;
    applicantEmail: string;
    resume: string; // URL or path to the resume file
    coverLetter?: string; // Optional
}

export interface SavedJob {
    id: string;
    jobId: string;
    userId: string;
}