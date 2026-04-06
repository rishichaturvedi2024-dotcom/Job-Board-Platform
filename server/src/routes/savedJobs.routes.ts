import { Express, Router } from 'express';
import savedJobsController from '../controllers/savedJobs.controller';

const router = Router();

router.post('/', savedJobsController.saveJob);
router.get('/', savedJobsController.getSavedJobs);
router.delete('/:id', savedJobsController.deleteSavedJob);

export function setSavedJobsRoutes(app: Express): void {
    app.use('/api/savedJobs', router);
}