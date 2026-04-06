import { Express, Router } from 'express';
import jobsController from '../controllers/jobs.controller';

const router = Router();

router.get('/', jobsController.getAllJobs.bind(jobsController));
router.get('/filter', jobsController.filterJobs.bind(jobsController));
router.get('/search', jobsController.searchJobs.bind(jobsController));
router.get('/:id', jobsController.getJobById.bind(jobsController));
router.post('/', jobsController.createJob.bind(jobsController));

export const setJobsRoutes = (app: Express): void => {
    app.use('/api/jobs', router);
};