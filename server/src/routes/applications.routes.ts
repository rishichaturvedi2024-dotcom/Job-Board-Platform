import { Router } from 'express';
import ApplicationsController from '../controllers/applications.controller';

const router = Router();
const applicationsController = new ApplicationsController();

router.post('/apply', applicationsController.submitApplication);
router.get('/applications', applicationsController.getApplications);

export const setApplicationsRoutes = (app) => {
    app.use('/api/applications', router);
};