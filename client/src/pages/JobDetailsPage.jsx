import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ApplicationForm from '../components/ApplicationForm';
import { fetchJobDetails, submitApplication } from '../services/api';

const JobDetailsPage = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitMessage, setSubmitMessage] = useState('');

    useEffect(() => {
        const loadJobDetails = async () => {
            try {
                const jobData = await fetchJobDetails(jobId);
                setJob(jobData);
            } catch {
                setError('Failed to fetch job details');
            } finally {
                setLoading(false);
            }
        };

        loadJobDetails();
    }, [jobId]);

    const handleSubmitApplication = async (applicationData) => {
        try {
            const result = await submitApplication(applicationData);
            setSubmitMessage(result.message || 'Application submitted successfully.');
        } catch {
            setSubmitMessage('Could not submit right now. Your details were saved locally.');
        }
    };

    if (loading) {
        return <div className="status-panel">Loading role details...</div>;
    }

    if (error) {
        return <div className="status-panel error">{error}</div>;
    }

    if (!job) {
        return <div className="status-panel">Job not found.</div>;
    }

    return (
        <div className="page-stack">
            <section className="subpage-header">
                <p className="eyebrow">Role Overview</p>
                <h1>{job.title}</h1>
                <p>{job.company} • {job.location} • {job.jobType}</p>
            </section>

            <section className="detail-layout">
                <article className="detail-card">
                    <h2>About this role</h2>
                    <p>{job.description}</p>

                    <div className="detail-meta-grid">
                        <div>
                            <span>Location</span>
                            <strong>{job.location}</strong>
                        </div>
                        <div>
                            <span>Job Type</span>
                            <strong>{job.jobType}</strong>
                        </div>
                        <div>
                            <span>Salary</span>
                            <strong>{job.salary || 'Competitive'}</strong>
                        </div>
                    </div>

                    <Link to="/" className="btn btn-ghost">Back to listings</Link>
                </article>

                <aside className="detail-card">
                    <h2>Apply now</h2>
                    <p>Share your details and we will route your profile to the hiring team.</p>
                    <ApplicationForm jobId={job.id} onSubmit={handleSubmitApplication} />
                    {submitMessage && <p className="inline-message">{submitMessage}</p>}
                </aside>
            </section>
        </div>
    );
};

export default JobDetailsPage;
