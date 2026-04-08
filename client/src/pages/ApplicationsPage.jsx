import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    fetchTrackedApplications,
    fetchJobs,
    removeTrackedApplication,
    updateApplicationStatus,
} from '../services/api';

const statusOptions = ['applied', 'reviewed', 'shortlisted', 'rejected'];

const formatStatus = (status) => status.charAt(0).toUpperCase() + status.slice(1);

const ApplicationsPage = () => {
    const [applications, setApplications] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const [loadedApplications, loadedJobs] = await Promise.all([
                    fetchTrackedApplications(),
                    fetchJobs(),
                ]);
                setApplications(loadedApplications);
                setJobs(loadedJobs);
            } catch {
                setError('Failed to load application tracker');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const jobsById = useMemo(() => {
        const map = new Map();
        jobs.forEach((job) => map.set(job.id, job));
        return map;
    }, [jobs]);

    const handleStatusChange = async (applicationId, status) => {
        try {
            await updateApplicationStatus(applicationId, status);
            setApplications((prev) =>
                prev.map((application) =>
                    application.id === applicationId ? { ...application, status } : application
                )
            );
            setMessage('Application status updated.');
        } catch {
            setError('Could not update status at this time.');
        }
    };

    const handleRemoveApplication = async (applicationId) => {
        try {
            await removeTrackedApplication(applicationId);
            setApplications((prev) => prev.filter((application) => application.id !== applicationId));
            setMessage('Application removed.');
        } catch {
            setError('Could not remove this application right now.');
        }
    };

    if (loading) {
        return <div className="status-panel">Loading application tracker...</div>;
    }

    if (error) {
        return <div className="status-panel error">{error}</div>;
    }

    return (
        <div className="page-stack">
            <section className="subpage-header">
                <p className="eyebrow">Application Tracker</p>
                <h1>Track every application stage</h1>
                <p>Review your submissions and update each role to reflect your latest hiring progress.</p>
                <div className="hero-actions">
                    <Link to="/" className="btn btn-ghost">Back to Roles</Link>
                    <Link to="/saved-jobs" className="btn btn-primary">Go to Saved Jobs</Link>
                </div>
            </section>

            {message && <div className="status-panel">{message}</div>}

            <section className="jobs-feed">
                <div className="section-heading-row">
                    <h2>Submitted Applications</h2>
                    <span className="count-chip">{applications.length} total</span>
                </div>

                {applications.length === 0 ? (
                    <div className="status-panel">No applications yet. Apply to a role and it will appear here.</div>
                ) : (
                    <div className="application-grid">
                        {applications.map((application) => {
                            const job = jobsById.get(application.jobId);
                            return (
                                <article className="application-card" key={application.id}>
                                    <div className="application-card-head">
                                        <div>
                                            <h3>{job?.title ?? 'Unknown Role'}</h3>
                                            <p>{job?.company ?? 'Unknown Company'}</p>
                                        </div>
                                        <div className="application-card-actions">
                                            <span className={`status-pill status-${application.status}`}>
                                                {formatStatus(application.status)}
                                            </span>
                                            <button
                                                type="button"
                                                className="btn btn-danger-soft remove-application-btn"
                                                onClick={() => handleRemoveApplication(application.id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    <div className="application-meta">
                                        <p><strong>Candidate:</strong> {application.applicantName}</p>
                                        <p><strong>Email:</strong> {application.applicantEmail}</p>
                                        <p><strong>Submitted:</strong> {new Date(application.submittedAt).toLocaleDateString()}</p>
                                    </div>

                                    <label htmlFor={`status-${application.id}`}>Update Status</label>
                                    <select
                                        id={`status-${application.id}`}
                                        className="field-input"
                                        value={application.status}
                                        onChange={(event) => handleStatusChange(application.id, event.target.value)}
                                    >
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>
                                                {formatStatus(status)}
                                            </option>
                                        ))}
                                    </select>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
};

export default ApplicationsPage;
