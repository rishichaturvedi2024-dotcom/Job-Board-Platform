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
                ...(typeof location === 'string' && { location }),
                ...(typeof jobType === 'string' && { jobType }),
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
                ...(typeof searchTerm === 'string' && { searchTerm }),
            });
            res.status(200).json(jobs);
        } catch (error) {
            res.status(500).json({ message: 'Error searching jobs', error });
        }
    }

    async getJobById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const job = await Job.findById(id);

            if (!job) {
                res.status(404).json({ message: 'Job not found' });
                return;
            }

            res.status(200).json(job);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving job', error });
        }
    }

    async createJob(req: Request, res: Response) {
        const { title, description, location, jobType, company, postedDate } = req.body;

        if (!title || !description || !location || !jobType || !company) {
            res.status(400).json({ message: 'Missing required job fields' });
            return;
        }

        try {
            const job = await Job.create({
                title,
                description,
                location,
                jobType,
                company,
                postedDate: postedDate ? new Date(postedDate) : undefined,
            });

            res.status(201).json(job);
        } catch (error) {
            res.status(500).json({ message: 'Error creating job', error });
        }
    }
}

export default new JobsController();