import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard';
import JobFilters from '../components/JobFilters';
import JobSearch from '../components/JobSearch';
import { fetchJobs, saveJob } from '../services/api';

const PAGE_SIZE = 24;

const normalizeLocation = (value) => {
    const normalized = value.trim().toLowerCase().replace(/\s+/g, '');
    if (['bangalore', 'bangaluru', 'banglore', 'banglor'].includes(normalized)) {
        return 'banglore';
    }

    return normalized;
};

const ExploreRolesPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [jobTypeFilter, setJobTypeFilter] = useState('');
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [viewMode, setViewMode] = useState('grid');

    useEffect(() => {
        const loadJobs = async () => {
            try {
                const data = await fetchJobs();
                setJobs(data);
            } catch {
                setError('Failed to fetch roles');
            } finally {
                setLoading(false);
            }
        };

        loadJobs();
    }, []);

    const filteredJobs = useMemo(() => {
        const normalizedFilterLocation = normalizeLocation(locationFilter);

        return jobs.filter((job) => {
            const matchesSearch =
                !searchQuery ||
                job.title.toLowerCase().includes(searchQuery) ||
                job.company.toLowerCase().includes(searchQuery) ||
                job.description.toLowerCase().includes(searchQuery);

            const normalizedJobLocation = normalizeLocation(job.location);
            const matchesLocation =
                !normalizedFilterLocation ||
                normalizedJobLocation.includes(normalizedFilterLocation) ||
                normalizedFilterLocation.includes(normalizedJobLocation);

            const matchesJobType = !jobTypeFilter || job.jobType.toLowerCase() === jobTypeFilter;

            return matchesSearch && matchesLocation && matchesJobType;
        });
    }, [jobTypeFilter, jobs, locationFilter, searchQuery]);

    const roleStats = useMemo(() => {
        const companyCount = new Set(jobs.map((job) => job.company)).size;
        const locationCount = new Set(jobs.map((job) => normalizeLocation(job.location))).size;
        return {
            roleCount: jobs.length,
            companyCount,
            locationCount,
        };
    }, [jobs]);

    const visibleJobs = filteredJobs.slice(0, visibleCount);
    const hasMore = visibleCount < filteredJobs.length;
    const spotlightRole = filteredJobs[0] || null;

    const handleSearch = (query) => {
        setSearchQuery(query.trim().toLowerCase());
        setVisibleCount(PAGE_SIZE);
    };

    const handleFilterChange = (location, jobType) => {
        setLocationFilter(location);
        setJobTypeFilter(jobType.trim().toLowerCase());
        setVisibleCount(PAGE_SIZE);
    };

    const handleSaveJob = async (jobId) => {
        try {
            await saveJob(jobId);
        } catch {
            setError('Could not save this role right now');
        }
    };

    const applyQuickFilter = (jobType) => {
        setJobTypeFilter(jobType);
        setVisibleCount(PAGE_SIZE);
    };

    if (loading) {
        return <div className="status-panel">Loading explore roles...</div>;
    }

    if (error) {
        return <div className="status-panel error">{error}</div>;
    }

    return (
        <div className="page-stack">
            <section className="hero-panel explore-hero-panel">
                <p className="eyebrow">Explore Marketplace</p>
                <h1>Explore curated roles across high-growth teams.</h1>
                <p className="hero-copy">
                    Browse a larger opportunity catalog with role intelligence, location coverage,
                    and flexible hiring models.
                </p>
                <div className="quick-filter-row">
                    <button type="button" className="btn btn-ghost" onClick={() => applyQuickFilter('full-time')}>Full-time Focus</button>
                    <button type="button" className="btn btn-ghost" onClick={() => applyQuickFilter('contract')}>Contract Missions</button>
                    <button type="button" className="btn btn-ghost" onClick={() => applyQuickFilter('internship')}>Intern Track</button>
                    <button type="button" className="btn btn-primary" onClick={() => applyQuickFilter('')}>All Roles</button>
                </div>
                <div className="hero-actions">
                    <Link to="/" className="btn btn-ghost">Back to Home</Link>
                    <Link to="/saved-jobs" className="btn btn-primary">Review Saved Jobs</Link>
                </div>
            </section>

            <section className="explore-stats">
                <article className="stat-tile">
                    <span>Total Roles</span>
                    <strong>{roleStats.roleCount}</strong>
                </article>
                <article className="stat-tile">
                    <span>Hiring Companies</span>
                    <strong>{roleStats.companyCount}</strong>
                </article>
                <article className="stat-tile">
                    <span>Coverage Locations</span>
                    <strong>{roleStats.locationCount}</strong>
                </article>
            </section>

            <section className="controls-wrap">
                <JobSearch onSearch={handleSearch} />
                <JobFilters onFilterChange={handleFilterChange} />
            </section>

            {spotlightRole && (
                <section className="explore-spotlight">
                    <div>
                        <p className="eyebrow">Spotlight Role</p>
                        <h2>{spotlightRole.title}</h2>
                        <p>{spotlightRole.company} · {spotlightRole.location} · {spotlightRole.jobType}</p>
                    </div>
                    <div className="hero-actions">
                        <Link to={`/job/${spotlightRole.id}`} className="btn btn-primary">Open Spotlight</Link>
                        <button type="button" className="btn btn-ghost" onClick={() => handleSaveJob(spotlightRole.id)}>Save Spotlight</button>
                    </div>
                </section>
            )}

            <section className="jobs-feed">
                <div className="section-heading-row">
                    <h2>Explore Roles</h2>
                    <div className="explore-head-actions">
                        <span className="count-chip">{filteredJobs.length} match{filteredJobs.length === 1 ? '' : 'es'}</span>
                        <div className="view-toggle" role="group" aria-label="Explore view mode">
                            <button
                                type="button"
                                className={`btn btn-ghost ${viewMode === 'grid' ? 'active-view' : ''}`}
                                onClick={() => setViewMode('grid')}
                            >
                                Grid
                            </button>
                            <button
                                type="button"
                                className={`btn btn-ghost ${viewMode === 'list' ? 'active-view' : ''}`}
                                onClick={() => setViewMode('list')}
                            >
                                List
                            </button>
                        </div>
                    </div>
                </div>

                {filteredJobs.length === 0 ? (
                    <div className="status-panel">No roles match this filter set right now. Try another keyword or city.</div>
                ) : (
                    <>
                        <div className={`jobs-grid explore-jobs-grid ${viewMode === 'list' ? 'explore-list-view' : ''}`}>
                            {visibleJobs.map((job) => (
                                <JobCard key={job.id} job={job} onSave={handleSaveJob} />
                            ))}
                        </div>
                        {hasMore && (
                            <div className="load-more-row">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                                >
                                    Load More Explore Roles
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

export default ExploreRolesPage;
