import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard';
import JobFilters from '../components/JobFilters';
import JobSearch from '../components/JobSearch';
import { fetchJobs, saveJob } from '../services/api';
import { Job } from '../types';

const PAGE_SIZE = 24;

const normalizeLocation = (value: string): string => {
    const normalized = value.trim().toLowerCase().replace(/\s+/g, '');
    if (['bangalore', 'bangaluru', 'banglore', 'banglor'].includes(normalized)) {
        return 'banglore';
    }

    return normalized;
};

const ExploreRolesPage: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [jobTypeFilter, setJobTypeFilter] = useState('');
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

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

    const handleSearch = (query: string) => {
        setSearchQuery(query.trim().toLowerCase());
        setVisibleCount(PAGE_SIZE);
    };

    const handleFilterChange = (location: string, jobType: string) => {
        setLocationFilter(location);
        setJobTypeFilter(jobType.trim().toLowerCase());
        setVisibleCount(PAGE_SIZE);
    };

    const handleSaveJob = async (jobId: string) => {
        try {
            await saveJob(jobId);
        } catch {
            setError('Could not save this role right now');
        }
    };

    if (loading) {
        return <div className="status-panel">Loading explore roles...</div>;
    }

    if (error) {
        return <div className="status-panel error">{error}</div>;
    }

    return (
        <div className="page-stack">
            <section className="hero-panel">
                <p className="eyebrow">Explore Marketplace</p>
                <h1>Explore curated roles across high-growth teams.</h1>
                <p className="hero-copy">
                    Browse a larger opportunity catalog with role intelligence, location coverage,
                    and flexible hiring models.
                </p>
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

            <section className="jobs-feed">
                <div className="section-heading-row">
                    <h2>Explore Roles</h2>
                    <span className="count-chip">{filteredJobs.length} match{filteredJobs.length === 1 ? '' : 'es'}</span>
                </div>

                {filteredJobs.length === 0 ? (
                    <div className="status-panel">No roles match this filter set right now. Try another keyword or city.</div>
                ) : (
                    <>
                        <div className="jobs-grid">
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
