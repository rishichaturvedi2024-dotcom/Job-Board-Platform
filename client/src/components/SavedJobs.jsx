import React from 'react';
import JobCard from './JobCard';

const SavedJobs = ({ jobs }) => {
    return (
        <div className="jobs-feed">
            {jobs.length === 0 ? (
                <div className="status-panel">No saved roles yet. Save opportunities from the home page.</div>
            ) : (
                <div className="jobs-grid">
                    {jobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedJobs;
