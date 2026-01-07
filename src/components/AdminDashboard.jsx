import React from 'react';
import './MainContent.css'; // Reusing general styles
import React, { useState, useEffect } from 'react';
import './MainContent.css';

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('adminToken'));
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [editingSection, setEditingSection] = useState(null); // 'resume' or 'projects'
    const [editorContent, setEditorContent] = useState('');
    const [updateStatus, setUpdateStatus] = useState('');

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
        }
    }, [token]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('adminToken', data.token);
                setToken(data.token);
                setIsAuthenticated(true);
                setError('');
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('Login failed');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setToken(null);
        setIsAuthenticated(false);
        setEditingSection(null);
    };

    const fetchContent = async (key) => {
        // key = 'resume' or 'projects'
        setUpdateStatus('Loading...');
        try {
            const res = await fetch(`/api/data/${key}`);
            if (res.ok) {
                const data = await res.json();
                setEditorContent(JSON.stringify(data, null, 4));
                setEditingSection(key);
                setUpdateStatus('');
            }
        } catch (err) {
            setUpdateStatus('Error loading data');
        }
    };

    const handleSave = async () => {
        setUpdateStatus('Saving...');
        try {
            // Validate JSON
            const json = JSON.parse(editorContent);

            const res = await fetch(`/api/data/${editingSection}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(json)
            });

            if (res.ok) {
                setUpdateStatus('Saved successfully!');
                setTimeout(() => setUpdateStatus(''), 3000);
            } else {
                setUpdateStatus('Save failed.');
            }
        } catch (err) {
            setUpdateStatus('Invalid JSON syntax');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="section-container">
                <h2 className="section-title">Admin Login</h2>
                <div style={{ maxWidth: '400px', margin: '0 auto', background: '#f8f9fa', padding: '2rem', borderRadius: '8px' }}>
                    <form onSubmit={handleLogin} style={{ display: 'grid', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="form-input"
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-input"
                                style={{ width: '100%' }}
                            />
                        </div>
                        {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
                        <button type="submit" className="submit-btn">Login</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="section-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="section-title" style={{ margin: 0 }}>Dashboard</h2>
                <button onClick={handleLogout} className="nav-btn" style={{ fontSize: '0.8rem' }}>Logout</button>
            </div>

            <div style={{ margin: '2rem 0', display: 'flex', gap: '1rem' }}>
                <button
                    className={`nav-btn ${editingSection === 'resume' ? 'active' : ''}`}
                    onClick={() => fetchContent('resume')}
                    style={{ border: '1px solid var(--border-subtle)', padding: '0.5rem 1rem' }}
                >
                    Edit Resume
                </button>
                <button
                    className={`nav-btn ${editingSection === 'projects' ? 'active' : ''}`}
                    onClick={() => fetchContent('projects')}
                    style={{ border: '1px solid var(--border-subtle)', padding: '0.5rem 1rem' }}
                >
                    Edit Projects
                </button>
            </div>

            {editingSection && (
                <div style={{ animation: 'fadeIn 0.3s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h3>Editing {editingSection}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ color: updateStatus.includes('Error') || updateStatus.includes('Invalid') ? 'red' : 'green' }}>
                                {updateStatus}
                            </span>
                            <button onClick={handleSave} className="submit-btn">Save Changes</button>
                        </div>
                    </div>
                    <textarea
                        value={editorContent}
                        onChange={(e) => setEditorContent(e.target.value)}
                        style={{
                            width: '100%',
                            height: '500px',
                            fontFamily: 'monospace',
                            fontSize: '14px',
                            padding: '1rem',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '4px',
                            lineHeight: '1.5',
                            resize: 'vertical'
                        }}
                    />
                    <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                        Hint: Use standard JSON syntax. Changes are applied immediately after saving and refreshing the page.
                    </p>
                </div>
            )}

            {!editingSection && (
                <div style={{
                    padding: '3rem',
                    textAlign: 'center',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px dashed var(--border-subtle)',
                    color: 'var(--text-secondary)'
                }}>
                    Select a section above to start editing content using BREAD/CRUD operations.
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
