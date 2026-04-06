import { Express, Router } from 'express';
import applicationsController from '../controllers/applications.controller';

const router = Router();

router.post('/', applicationsController.submitApplication);
router.get('/', applicationsController.getApplications);

export const setApplicationsRoutes = (app: Express): void => {
    app.use('/api/applications', router);
};