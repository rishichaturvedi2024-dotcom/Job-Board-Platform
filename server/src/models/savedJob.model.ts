export interface SavedJobInput {
    jobId: string;
    userId?: string;
}

class SavedJob {
    private static savedJobs: SavedJob[] = [];

    public id: string;
    public jobId: string;
    public userId: string;
    public savedAt: Date;

    constructor(input: SavedJobInput) {
        this.id = `saved_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
        this.jobId = input.jobId;
        this.userId = input.userId ?? 'anonymous';
        this.savedAt = new Date();
    }

    async save(): Promise<SavedJob> {
        const existing = SavedJob.savedJobs.find(
            (item) => item.jobId === this.jobId && item.userId === this.userId
        );

        if (!existing) {
            SavedJob.savedJobs.unshift(this);
            return this;
        }

        return existing;
    }

    static async find(): Promise<SavedJob[]> {
        return [...SavedJob.savedJobs];
    }

    static async findByIdAndDelete(id: string): Promise<SavedJob | null> {
        const index = SavedJob.savedJobs.findIndex((item) => item.id === id);

        if (index < 0) {
            return null;
        }

        const [removed] = SavedJob.savedJobs.splice(index, 1);
        return removed;
    }
}

export default SavedJob;