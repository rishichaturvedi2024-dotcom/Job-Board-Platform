import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import JobSearch from '../components/JobSearch';
import JobCard from '../components/JobCard';
import { fetchJobs, saveJob } from '../services/api';

const PAGE_SIZE = 8;
const MODE_PRIORITY = 'priority';
const MODE_REMOTE = 'remote';
const MODE_FRESH = 'fresh';

const normalizeLocation = (value) => {
    const normalized = value.trim().toLowerCase().replace(/\s+/g, '');
    if (['bangalore', 'bangaluru', 'banglore', 'banglor'].includes(normalized)) {
        return 'banglore';
    }

    return normalized;
};

const HomePage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [openRoleMode, setOpenRoleMode] = useState(MODE_PRIORITY);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    useEffect(() => {
        const loadJobs = async () => {
            try {
                const jobData = await fetchJobs();
                setJobs(jobData);
            } catch {
                setError('Failed to fetch jobs');
            } finally {
                setLoading(false);
            }
        };

        loadJobs();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query.trim().toLowerCase());
        setVisibleCount(PAGE_SIZE);
    };

    const handleModeChange = (mode) => {
        setOpenRoleMode(mode);
        setVisibleCount(PAGE_SIZE);
    };

    const handleSaveJob = async (jobId) => {
        try {
            await saveJob(jobId);
        } catch {
            setError('Failed to save job');
        }
    };

    const latestPostedDate = jobs.reduce((latest, job) => {
        const postedAt = new Date(job.postedDate);
        return postedAt > latest ? postedAt : latest;
    }, new Date(0));

    const rolePool = jobs.filter((job) => {
        if (openRoleMode === MODE_REMOTE) {
            return normalizeLocation(job.location).includes('remote');
        }

        if (openRoleMode === MODE_FRESH) {
            const postedAt = new Date(job.postedDate);
            const daysDelta = Math.floor((latestPostedDate - postedAt) / (1000 * 60 * 60 * 24));
            return daysDelta <= 14;
        }

        return job.jobType.toLowerCase() === 'full-time';
    });

    const filteredJobs = rolePool.filter((job) => {
        const matchesSearch =
            !searchQuery ||
            job.title.toLowerCase().includes(searchQuery) ||
            job.company.toLowerCase().includes(searchQuery) ||
            job.description.toLowerCase().includes(searchQuery);

        return matchesSearch;
    });

    const visibleJobs = filteredJobs.slice(0, visibleCount);
    const hasMoreJobs = visibleCount < filteredJobs.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + PAGE_SIZE);
    };

    if (loading) return <div className="status-panel">Loading opportunities...</div>;
    if (error) return <div className="status-panel error">{error}</div>;

    return (
        <div className="page-stack">
            <section className="hero-panel">
                <p className="eyebrow">Curated Career Board</p>
                <h1>Build your next chapter with teams worth joining.</h1>
                <p className="hero-copy">
                    Discover high-intent openings across product, engineering, and design.
                    Filter by role type and location in seconds.
                </p>
                <div className="hero-actions">
                    <Link to="/explore-roles" className="btn btn-primary">Explore Roles</Link>
                    <Link to="/saved-jobs" className="btn btn-ghost">View Saved Jobs</Link>
                </div>
            </section>

            <section className="controls-wrap" id="open-roles">
                <JobSearch onSearch={handleSearch} />
                <div className="open-roles-panel">
                    <h2>Open Roles Feed</h2>
                    <p>Home page is a curated shortlist. Use Explore for full-catalog discovery.</p>
                    <div className="role-mode-row" role="group" aria-label="Open role mode">
                        <button
                            type="button"
                            className={`btn btn-ghost mode-chip ${openRoleMode === MODE_PRIORITY ? 'mode-chip-active' : ''}`}
                            onClick={() => handleModeChange(MODE_PRIORITY)}
                        >
                            Priority Full-Time
                        </button>
                        <button
                            type="button"
                            className={`btn btn-ghost mode-chip ${openRoleMode === MODE_REMOTE ? 'mode-chip-active' : ''}`}
                            onClick={() => handleModeChange(MODE_REMOTE)}
                        >
                            Remote First
                        </button>
                        <button
                            type="button"
                            className={`btn btn-ghost mode-chip ${openRoleMode === MODE_FRESH ? 'mode-chip-active' : ''}`}
                            onClick={() => handleModeChange(MODE_FRESH)}
                        >
                            Fresh 14 Days
                        </button>
                    </div>
                </div>
            </section>

            <section className="jobs-feed">
                <div className="section-heading-row">
                    <h2>Open Roles</h2>
                    <span className="count-chip">{filteredJobs.length} match{filteredJobs.length === 1 ? '' : 'es'}</span>
                </div>

                {filteredJobs.length === 0 ? (
                    <div className="status-panel">No jobs match your filters. Try widening your search.</div>
                ) : (
                    <>
                        <div className="jobs-grid">
                            {visibleJobs.map((job) => (
                                <JobCard key={job.id} job={job} onSave={handleSaveJob} />
                            ))}
                        </div>
                        {hasMoreJobs && (
                            <div className="load-more-row">
                                <button type="button" className="btn btn-primary" onClick={handleLoadMore}>
                                    Load More Roles
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

export default HomePage;
