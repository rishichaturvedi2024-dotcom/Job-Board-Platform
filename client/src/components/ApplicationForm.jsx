import React, { useState } from 'react';

const ApplicationForm = ({ jobId, onSubmit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [resume, setResume] = useState(null);
    const [coverLetter, setCoverLetter] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const applicationData = {
            jobId,
            name,
            email,
            resume,
            coverLetter,
        };
        onSubmit(applicationData);
    };

    return (
        <form onSubmit={handleSubmit} className="application-form">
            <div className="form-field">
                <label htmlFor="name">Full Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="field-input"
                />
            </div>
            <div className="form-field">
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="field-input"
                />
            </div>
            <div className="form-field">
                <label htmlFor="resume">Resume</label>
                <input
                    type="file"
                    id="resume"
                    onChange={(e) => setResume(e.target.files ? e.target.files[0] : null)}
                    required
                    className="field-input"
                />
            </div>
            <div className="form-field">
                <label htmlFor="coverLetter">Cover Letter</label>
                <textarea
                    id="coverLetter"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="field-input textarea"
                    rows={4}
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit Application</button>
        </form>
    );
};

export default ApplicationForm;
