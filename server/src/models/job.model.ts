export interface CreateJobInput {
    title: string;
    description: string;
    location: string;
    jobType: string;
    company: string;
    postedDate?: Date;
}

class Job {
    private static jobs: Job[] = [];

    constructor(
        public id: string,
        public title: string,
        public description: string,
        public location: string,
        public jobType: string,
        public company: string,
        public postedDate: Date
    ) {}

    static fromJson(json: any): Job {
        return new Job(
            json.id,
            json.title,
            json.description,
            json.location,
            json.jobType,
            json.company,
            new Date(json.postedDate)
        );
    }

    static async find(filters?: {
        location?: string;
        jobType?: string;
        searchTerm?: string;
    }): Promise<Job[]> {
        const location = filters?.location?.toLowerCase();
        const jobType = filters?.jobType?.toLowerCase();
        const searchTerm = filters?.searchTerm?.toLowerCase();

        return Job.jobs.filter((job) => {
            const matchesLocation = !location || job.location.toLowerCase().includes(location);
            const matchesJobType = !jobType || job.jobType.toLowerCase() === jobType;
            const matchesSearch =
                !searchTerm ||
                job.title.toLowerCase().includes(searchTerm) ||
                job.company.toLowerCase().includes(searchTerm) ||
                job.description.toLowerCase().includes(searchTerm);

            return matchesLocation && matchesJobType && matchesSearch;
        });
    }

    static async findById(id: string): Promise<Job | null> {
        return Job.jobs.find((job) => job.id === id) ?? null;
    }

    static async create(input: CreateJobInput): Promise<Job> {
        const job = new Job(
            `job_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
            input.title,
            input.description,
            input.location,
            input.jobType,
            input.company,
            input.postedDate ?? new Date()
        );

        Job.jobs.unshift(job);
        return job;
    }
}

export default Job;