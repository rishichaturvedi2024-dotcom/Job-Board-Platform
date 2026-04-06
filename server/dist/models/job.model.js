"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
class Job {
    constructor(id, title, description, location, jobType, company, postedDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.jobType = jobType;
        this.company = company;
        this.postedDate = postedDate;
    }
    static fromJson(json) {
        return new Job(json.id, json.title, json.description, json.location, json.jobType, json.company, new Date(json.postedDate));
    }
}
exports.Job = Job;
