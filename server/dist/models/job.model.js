"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    static find(filters) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const location = (_a = filters === null || filters === void 0 ? void 0 : filters.location) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            const jobType = (_b = filters === null || filters === void 0 ? void 0 : filters.jobType) === null || _b === void 0 ? void 0 : _b.toLowerCase();
            const searchTerm = (_c = filters === null || filters === void 0 ? void 0 : filters.searchTerm) === null || _c === void 0 ? void 0 : _c.toLowerCase();
            return Job.jobs.filter((job) => {
                const matchesLocation = !location || job.location.toLowerCase().includes(location);
                const matchesJobType = !jobType || job.jobType.toLowerCase() === jobType;
                const matchesSearch = !searchTerm ||
                    job.title.toLowerCase().includes(searchTerm) ||
                    job.company.toLowerCase().includes(searchTerm) ||
                    job.description.toLowerCase().includes(searchTerm);
                return matchesLocation && matchesJobType && matchesSearch;
            });
        });
    }
    static findById(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = Job.jobs.find((job) => job.id === id)) !== null && _a !== void 0 ? _a : null;
        });
    }
    static create(input) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const job = new Job(`job_${Date.now()}_${Math.floor(Math.random() * 100000)}`, input.title, input.description, input.location, input.jobType, input.company, (_a = input.postedDate) !== null && _a !== void 0 ? _a : new Date());
            Job.jobs.unshift(job);
            return job;
        });
    }
}
Job.jobs = [];
exports.default = Job;
