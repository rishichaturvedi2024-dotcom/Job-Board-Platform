import express from 'express';
import bodyParser from 'body-parser';
import { setJobsRoutes } from './routes/jobs.routes';
import { setApplicationsRoutes } from './routes/applications.routes';
import { setSavedJobsRoutes } from './routes/savedJobs.routes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setJobsRoutes(app);
setApplicationsRoutes(app);
setSavedJobsRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});