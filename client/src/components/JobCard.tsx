import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../types';

interface JobCardProps {
    job: Job;
    onSave?: (jobId: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onSave }) => {
    const handleSave = () => {
        if (onSave) {
            onSave(job.id);
        }
    };

    return (
        <article className="job-card">
            <div className="job-card-top">
                <p className="job-company">{job.company}</p>
                <span className="job-type-chip">{job.jobType}</span>
            </div>

            <h3>{job.title}</h3>
            <p className="job-location">{job.location}</p>
            <p className="job-description">{job.description}</p>

            <div className="job-actions">
                <Link className="btn btn-ghost" to={`/job/${job.id}`}>View Details</Link>
                {onSave && <button onClick={handleSave} className="btn btn-primary">Save Job</button>}
            </div>
        </article>
    );
};

export default JobCard;