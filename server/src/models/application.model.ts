export interface ApplicationInput {
    jobId: string;
    name?: string;
    applicantName?: string;
    email?: string;
    applicantEmail?: string;
    resume?: string | null;
    coverLetter?: string;
}

class Application {
    private static applications: Application[] = [];

    public id: string;
    public jobId: string;
    public applicantName: string;
    public applicantEmail: string;
    public resume: string;
    public coverLetter: string;
    public status: string;
    public submittedAt: Date;

    constructor(input: ApplicationInput) {
        this.id = `app_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
        this.jobId = input.jobId;
        this.applicantName = input.applicantName ?? input.name ?? '';
        this.applicantEmail = input.applicantEmail ?? input.email ?? '';
        this.resume = typeof input.resume === 'string' ? input.resume : '';
        this.coverLetter = input.coverLetter ?? '';
        this.status = 'submitted';
        this.submittedAt = new Date();
    }

    async save(): Promise<Application> {
        Application.applications.unshift(this);
        return this;
    }

    static async find(): Promise<Application[]> {
        return [...Application.applications];
    }

    static async findById(id: string): Promise<Application | null> {
        return Application.applications.find((application) => application.id === id) ?? null;
    }

    static async findByJobId(jobId: string): Promise<Application[]> {
        return Application.applications.filter((application) => application.jobId === jobId);
    }
}

export default Application;