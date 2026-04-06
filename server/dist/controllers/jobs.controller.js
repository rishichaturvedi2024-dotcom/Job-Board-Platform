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
                const jobs = yield job_model_1.default.find(Object.assign(Object.assign({}, (location && { location })), (jobType && { jobType })));
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
                const jobs = yield job_model_1.default.find({
                    title: { $regex: searchTerm, $options: 'i' },
                });
                res.status(200).json(jobs);
            }
            catch (error) {
                res.status(500).json({ message: 'Error searching jobs', error });
            }
        });
    }
}
exports.default = new JobsController();
