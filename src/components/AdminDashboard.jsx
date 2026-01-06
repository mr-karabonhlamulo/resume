import React from 'react';
import './MainContent.css'; // Reusing general styles

const AdminDashboard = () => {
    return (
        <div className="section-container">
            <h2 className="section-title">Admin Dashboard</h2>

            <div style={{ maxWidth: '800px' }}>
                <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                    Manage your portfolio content and integrations here.
                </p>

                <div style={{
                    padding: '2rem',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                    border: '1px solid var(--border-subtle)'
                }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>AI Job Integration</h3>
                    <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        Connect your profile with AI agents to automatically find and apply for the best matching jobs.
                    </p>
                    <a
                        href="#"
                        className="download-btn"
                        style={{ display: 'inline-block', textDecoration: 'none' }}
                        onClick={(e) => e.preventDefault()}
                    >
                        Integrate AI Job Matcher
                    </a>
                </div>

                <div style={{
                    padding: '2rem',
                    background: '#fff',
                    borderRadius: '8px',
                    border: '1px solid var(--border-subtle)'
                }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Edit Information</h3>
                    <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        Update your resume details, projects, and contact info.
                    </p>

                    {/* Placeholder for future form */}
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <button className="nav-btn" style={{ textAlign: 'left' }}>Edit Profile & Contact</button>
                        <button className="nav-btn" style={{ textAlign: 'left' }}>Manage Projects</button>
                        <button className="nav-btn" style={{ textAlign: 'left' }}>Update Experience</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
