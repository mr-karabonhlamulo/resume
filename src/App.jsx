import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import MainContent from '@/components/MainContent';

const App = () => {
    const [resumeData, setResumeData] = useState(null);
    const [projectsData, setProjectsData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resumeRes, projectsRes] = await Promise.all([
                    fetch('/api/data/resume'),
                    fetch('/api/data/projects')
                ]);

                if (resumeRes.ok && projectsRes.ok) {
                    const resume = await resumeRes.json();
                    const projects = await projectsRes.json();
                    setResumeData(resume);
                    setProjectsData(projects);
                } else {
                    console.error("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="loading-screen">Loading Profile...</div>;
    }

    if (!resumeData || !projectsData) {
        return <div className="error-screen">Failed to load content. Please check the backend connection.</div>;
    }

    return (
        <div className="app-container">
            <Sidebar
                personalInfo={resumeData.personal_info}
                skills={resumeData.core_skills}
                languages={resumeData.languages}
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
