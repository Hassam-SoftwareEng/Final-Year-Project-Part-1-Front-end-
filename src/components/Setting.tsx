import React, { useState } from 'react';
import '../styles/SettingPage.css';

interface User {
    email: string;
    fullName: string;
}

interface SettingProps {
    user: User;
    onLogout: () => void;
    onNavigateToDashboard: () => void;
    onNavigateToMatches: () => void;
    onNavigateToMessages: () => void;
    onNavigateToAnalytics: () => void;
    onNavigateToCreateProfile: () => void;
    onNavigateToVerification: () => void;
    onNavigateToRedFlagAlert: () => void;
}

export const Setting: React.FC<SettingProps> = ({
    user,
    onLogout,
    onNavigateToDashboard,
    onNavigateToMatches,
    onNavigateToMessages,
    onNavigateToAnalytics,
    onNavigateToCreateProfile,
    onNavigateToVerification,
    onNavigateToRedFlagAlert
}) => {
    const [name, setName] = useState(user.fullName);
    const [email, setEmail] = useState(user.email);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation logic for password if user is trying to change it
        if (newPassword || confirmPassword) {
            if (newPassword !== confirmPassword) {
                alert('New passwords do not match!');
                return;
            }
            if (!currentPassword) {
                alert('Please enter your current password to change it.');
                return;
            }
        }

        // Logic to save profile and/or password
        alert('Settings updated successfully!');

        // Clear sensitive fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="setting-page-container">
            {/* Navbar */}
            <nav className="setting-navbar">
                <div className="nav-left">
                    <div className="logo-section">
                        <span className="logo-text">RoomEase</span>
                    </div>
                </div>

                <div className="nav-center">
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToDashboard(); }}>Home</a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToCreateProfile(); }}>Create Profile</a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToMatches(); }}>Match</a>
                    <a href="#" className="nav-link">Map</a>
                    <a href="#" className="nav-link">Listing</a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToMessages(); }}>Message</a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToRedFlagAlert(); }}>Red Flag Alert</a>
                </div>

                <div className="nav-right">
                    <a href="#" className="nav-link" style={{ marginRight: '20px' }} onClick={(e) => e.preventDefault()}>
                        Setting
                    </a>
                    <button className="logout-btn" onClick={onLogout}>Logout</button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="setting-content">
                <header className="setting-header">
                    <div>
                        <h1 className="setting-title">Settings</h1>
                        <p className="setting-subtitle">Manage your account settings and preferences</p>
                    </div>
                    <button className="verify-profile-btn" onClick={onNavigateToVerification}>Verify Your Profile</button>
                </header>

                {/* Personal Information */}
                {/* Account Settings */}
                <section className="setting-card">
                    <h2 className="card-title">Account Settings</h2>
                    <form onSubmit={handleSave}>
                        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#374151', marginBottom: '16px' }}>Personal Information</h3>
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                className="form-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Current Password</label>
                            <input
                                type="password"
                                className="form-input"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Leave blank to keep current password"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">New Password</label>
                            <input
                                type="password"
                                className="form-input"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Confirm New Password</label>
                            <input
                                type="password"
                                className="form-input"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="save-btn">Save Changes</button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
};
