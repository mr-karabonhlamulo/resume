import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import MainContent from '@/components/MainContent';
import AdminDashboard from '@/components/AdminDashboard';

import resumeDataStatic from './data/resume.json';
import projectsDataStatic from './data/projects.json';

const App = () => {
    const [resumeData, setResumeData] = useState(resumeDataStatic);
    const [projectsData, setProjectsData] = useState(projectsDataStatic);
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState('main'); // 'main' or 'admin'

    // We use static imports for the main view so they work on Vercel/GitHub Pages without a backend.
    // The Admin Dashboard component will still try to contact the backend, which is intended (only works locally).

    const handleProfileClick = () => {
        setView('admin');
    };

    const handleBackToMain = () => {
        setView('main');
    };

    if (loading) {
        return <div className="loading-screen">Loading Profile...</div>;
    }

    if (!resumeData || !projectsData) {
        return <div className="error-screen">Failed to load content. Please check the backend connection.</div>;
    }

    if (view === 'admin') {
        return (
            <div className="app-container" style={{ display: 'block' }}>
                <AdminDashboard onBack={handleBackToMain} />
            </div>
        );
    }

    return (
        <div className="app-container">
            <Sidebar
                personalInfo={resumeData.personal_info}
                skills={resumeData.core_skills}
                languages={resumeData.languages}
                onProfileClick={handleProfileClick}
            />
            <MainContent
                personalInfo={resumeData.personal_info}
                summary={resumeData.professional_summary}
                experience={resumeData.professional_experience}
                education={resumeData.education}
                projects={projectsData}
            />
        </div>
    );
};

export default App;
