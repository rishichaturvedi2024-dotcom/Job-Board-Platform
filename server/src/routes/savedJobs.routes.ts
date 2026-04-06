import { Router } from 'express';
import SavedJobsController from '../controllers/savedJobs.controller';

const router = Router();
const savedJobsController = new SavedJobsController();

router.post('/', savedJobsController.saveJob);
router.get('/', savedJobsController.getSavedJobs);
router.delete('/:id', savedJobsController.deleteSavedJob);

export default function setSavedJobsRoutes(app) {
    app.use('/api/saved-jobs', router);
}