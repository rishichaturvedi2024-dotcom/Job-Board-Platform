import { Router } from 'express';
import { JobsController } from '../controllers/jobs.controller';

const router = Router();
const jobsController = new JobsController();

router.get('/', jobsController.getAllJobs.bind(jobsController));
router.get('/filter', jobsController.filterJobs.bind(jobsController));
router.get('/:id', jobsController.getJobById.bind(jobsController));
router.post('/', jobsController.createJob.bind(jobsController));

export const setJobsRoutes = (app) => {
    app.use('/api/jobs', router);
};