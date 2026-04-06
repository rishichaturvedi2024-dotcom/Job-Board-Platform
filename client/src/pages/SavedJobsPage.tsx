import React, { useEffect, useState } from 'react';
import SavedJobs from '../components/SavedJobs';
import { fetchSavedJobs } from '../services/api';
import { Job } from '../types';

const SavedJobsPage: React.FC = () => {
    const [savedJobs, setSavedJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadSavedJobs = async () => {
            try {
                const jobs = await fetchSavedJobs();
                setSavedJobs(jobs);
            } catch {
                setError('Failed to fetch saved jobs');
            } finally {
                setLoading(false);
            }
        };

        loadSavedJobs();
    }, []);

    if (loading) {
        return <div className="status-panel">Loading saved roles...</div>;
    }

    if (error) {
        return <div className="status-panel error">{error}</div>;
    }

    return (
        <div className="page-stack">
            <section className="subpage-header">
                <p className="eyebrow">Saved Collection</p>
                <h1>Your Shortlist</h1>
                <p>Track promising opportunities and revisit them any time.</p>
            </section>
            <SavedJobs jobs={savedJobs} />
        </div>
    );
};

export default SavedJobsPage;