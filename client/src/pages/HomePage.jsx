import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import JobSearch from '../components/JobSearch';
import JobFilters from '../components/JobFilters';
import JobCard from '../components/JobCard';
import { fetchJobs, saveJob } from '../services/api';

const PAGE_SIZE = 10;

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
    const [locationFilter, setLocationFilter] = useState('');
    const [jobTypeFilter, setJobTypeFilter] = useState('');
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

    const handleFilterChange = (location, jobType) => {
        setLocationFilter(location.trim().toLowerCase());
        setJobTypeFilter(jobType.trim().toLowerCase());
        setVisibleCount(PAGE_SIZE);
    };

    const handleSaveJob = async (jobId) => {
        try {
            await saveJob(jobId);
        } catch {
            setError('Failed to save job');
        }
    };

    const filteredJobs = jobs.filter((job) => {
        const matchesSearch =
            !searchQuery ||
            job.title.toLowerCase().includes(searchQuery) ||
            job.company.toLowerCase().includes(searchQuery) ||
            job.description.toLowerCase().includes(searchQuery);
        const normalizedFilterLocation = normalizeLocation(locationFilter);
        const normalizedJobLocation = normalizeLocation(job.location);
        const matchesLocation =
            !normalizedFilterLocation ||
            normalizedJobLocation.includes(normalizedFilterLocation) ||
            normalizedFilterLocation.includes(normalizedJobLocation);
        const matchesJobType =
            !jobTypeFilter || job.jobType.toLowerCase() === jobTypeFilter;

        return matchesSearch && matchesLocation && matchesJobType;
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
                <JobFilters onFilterChange={handleFilterChange} />
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
