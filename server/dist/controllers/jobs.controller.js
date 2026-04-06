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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const job_model_1 = __importDefault(require("../models/job.model"));
class JobsController {
    getAllJobs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jobs = yield job_model_1.default.find();
                res.status(200).json(jobs);
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching jobs', error });
            }
        });
    }
    filterJobs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { location, jobType } = req.query;
            try {
                const jobs = yield job_model_1.default.find(Object.assign(Object.assign({}, (typeof location === 'string' && { location })), (typeof jobType === 'string' && { jobType })));
                res.status(200).json(jobs);
            }
            catch (error) {
                res.status(500).json({ message: 'Error filtering jobs', error });
            }
        });
    }
    searchJobs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { searchTerm } = req.query;
            try {
                const jobs = yield job_model_1.default.find(Object.assign({}, (typeof searchTerm === 'string' && { searchTerm })));
                res.status(200).json(jobs);
            }
            catch (error) {
                res.status(500).json({ message: 'Error searching jobs', error });
            }
        });
    }
    getJobById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const job = yield job_model_1.default.findById(id);
                if (!job) {
                    res.status(404).json({ message: 'Job not found' });
                    return;
                }
                res.status(200).json(job);
            }
            catch (error) {
                res.status(500).json({ message: 'Error retrieving job', error });
            }
        });
    }
    createJob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, location, jobType, company, postedDate } = req.body;
            if (!title || !description || !location || !jobType || !company) {
                res.status(400).json({ message: 'Missing required job fields' });
                return;
            }
            try {
                const job = yield job_model_1.default.create({
                    title,
                    description,
                    location,
                    jobType,
                    company,
                    postedDate: postedDate ? new Date(postedDate) : undefined,
                });
                res.status(201).json(job);
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating job', error });
            }
        });
    }
}
exports.default = new JobsController();
