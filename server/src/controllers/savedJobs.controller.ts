import { Request, Response } from 'express';
import SavedJob from '../models/savedJob.model';

class SavedJobsController {
    async saveJob(req: Request, res: Response) {
        try {
            const savedJob = new SavedJob(req.body);
            await savedJob.save();
            res.status(201).json(savedJob);
        } catch (error) {
            res.status(500).json({ message: 'Error saving job', error });
        }
    }

    async getSavedJobs(req: Request, res: Response) {
        try {
            const savedJobs = await SavedJob.find();
            res.status(200).json(savedJobs);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving saved jobs', error });
        }
    }

    async deleteSavedJob(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await SavedJob.findByIdAndDelete(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting saved job', error });
        }
    }
}

export default new SavedJobsController();