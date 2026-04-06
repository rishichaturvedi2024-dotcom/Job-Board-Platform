import { Request, Response } from 'express';
import Job from '../models/job.model';

class JobsController {
    async getAllJobs(req: Request, res: Response) {
        try {
            const jobs = await Job.find();
            res.status(200).json(jobs);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching jobs', error });
        }
    }

    async filterJobs(req: Request, res: Response) {
        const { location, jobType } = req.query;
        try {
            const jobs = await Job.find({
                ...(location && { location }),
                ...(jobType && { jobType }),
            });
            res.status(200).json(jobs);
        } catch (error) {
            res.status(500).json({ message: 'Error filtering jobs', error });
        }
    }

    async searchJobs(req: Request, res: Response) {
        const { searchTerm } = req.query;
        try {
            const jobs = await Job.find({
                title: { $regex: searchTerm, $options: 'i' },
            });
            res.status(200).json(jobs);
        } catch (error) {
            res.status(500).json({ message: 'Error searching jobs', error });
        }
    }
}

export default new JobsController();