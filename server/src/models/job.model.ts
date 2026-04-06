export class Job {
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
}