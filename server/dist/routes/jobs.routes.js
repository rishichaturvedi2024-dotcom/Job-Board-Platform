"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setJobsRoutes = void 0;
const express_1 = require("express");
const jobs_controller_1 = require("../controllers/jobs.controller");
const router = (0, express_1.Router)();
const jobsController = new jobs_controller_1.JobsController();
router.get('/', jobsController.getAllJobs.bind(jobsController));
router.get('/filter', jobsController.filterJobs.bind(jobsController));
router.get('/:id', jobsController.getJobById.bind(jobsController));
router.post('/', jobsController.createJob.bind(jobsController));
const setJobsRoutes = (app) => {
    app.use('/api/jobs', router);
};
exports.setJobsRoutes = setJobsRoutes;
