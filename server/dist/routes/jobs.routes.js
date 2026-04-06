"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setJobsRoutes = void 0;
const express_1 = require("express");
const jobs_controller_1 = __importDefault(require("../controllers/jobs.controller"));
const router = (0, express_1.Router)();
router.get('/', jobs_controller_1.default.getAllJobs.bind(jobs_controller_1.default));
router.get('/filter', jobs_controller_1.default.filterJobs.bind(jobs_controller_1.default));
router.get('/search', jobs_controller_1.default.searchJobs.bind(jobs_controller_1.default));
router.get('/:id', jobs_controller_1.default.getJobById.bind(jobs_controller_1.default));
router.post('/', jobs_controller_1.default.createJob.bind(jobs_controller_1.default));
const setJobsRoutes = (app) => {
    app.use('/api/jobs', router);
};
exports.setJobsRoutes = setJobsRoutes;
