import React, { useState } from 'react';

const JobFilters = ({ onFilterChange }) => {
    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState('');

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
        onFilterChange(e.target.value, jobType);
    };

    const handleJobTypeChange = (e) => {
        setJobType(e.target.value);
        onFilterChange(location, e.target.value);
    };

    return (
        <div className="filter-panel">
            <h2>Filter Roles</h2>
            <div className="filter-field">
                <label htmlFor="location">Location</label>
                <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={handleLocationChange}
                    className="field-input"
                    placeholder="Remote, Banglore, Delhi..."
                />
            </div>
            <div className="filter-field">
                <label htmlFor="jobType">Job Type</label>
                <select
                    id="jobType"
                    value={jobType}
                    onChange={handleJobTypeChange}
                    className="field-input"
                >
                    <option value="">All</option>
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                </select>
            </div>
        </div>
    );
};

export default JobFilters;
