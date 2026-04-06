export interface Job {
    id: string;
    title: string;
    description: string;
    location: string;
    jobType: string;
    company: string;
    postedDate: Date;
}

export interface Application {
    id: string;
    jobId: string;
    applicantName: string;
    applicantEmail: string;
    resume: string; // URL or path to the resume file
    coverLetter?: string; // Optional
    submittedDate: Date;
}

export interface SavedJob {
    id: string;
    jobId: string;
    userId: string;
    savedDate: Date;
}