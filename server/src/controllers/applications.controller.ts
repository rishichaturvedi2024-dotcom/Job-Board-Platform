import { Request, Response } from 'express';
import Application from '../models/application.model';

class ApplicationsController {
    async submitApplication(req: Request, res: Response) {
        try {
            const applicationData = req.body;
            const newApplication = new Application(applicationData);
            await newApplication.save();
            res.status(201).json({ message: 'Application submitted successfully', application: newApplication });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown server error';
            res.status(500).json({ message: 'Error submitting application', error: message });
        }
    }

    async getApplications(req: Request, res: Response) {
        try {
            const applications = await Application.find();
            res.status(200).json(applications);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown server error';
            res.status(500).json({ message: 'Error retrieving applications', error: message });
        }
    }
}

export default new ApplicationsController();