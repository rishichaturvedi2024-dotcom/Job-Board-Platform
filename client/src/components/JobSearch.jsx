import React, { useState } from 'react';

const JobSearch = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <form onSubmit={handleSearch} className="search-form" aria-label="Search job roles">
            <input
                type="text"
                placeholder="Search for job roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="field-input"
            />
            <button type="submit" className="btn btn-primary">Search</button>
        </form>
    );
};

export default JobSearch;
