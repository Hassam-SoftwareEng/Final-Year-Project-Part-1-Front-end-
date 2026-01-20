import React, { useState } from 'react';
import '../../styles/User/SettingPage.css';
import { Bell, Home } from 'lucide-react';

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
    onNavigateToMap: () => void;
    onNavigateToListing: () => void;
    onNavigateToNotification?: () => void;
}

export const Setting: React.FC<SettingProps> = ({
    user,
    onLogout,
    onNavigateToDashboard,
    onNavigateToListing,
    onNavigateToVerification,
    onNavigateToNotification,

    onNavigateToMap,
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
            {/* Navbar - Standardized */}
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm sticky-top px-3">
                <div className="container-fluid">
                    {/* Logo Section */}
                    <a className="navbar-brand d-flex align-items-center gap-2" href="#" onClick={(e) => { e.preventDefault(); onNavigateToDashboard(); }}>
                        <Home className="text-primary" size={24} style={{ color: '#14919B' }} />
                        <span className="fw-bold" style={{ color: '#14919B', fontSize: '1.25rem' }}>RoomEase</span>
                    </a>

                    {/* Toggle Button for Mobile */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#dashboardNavbar" aria-controls="dashboardNavbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapsible Content */}
                    <div className="collapse navbar-collapse" id="dashboardNavbar">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
                            <li className="nav-item">
                                <a
                                    className="nav-link fw-medium"
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); onNavigateToDashboard(); }}
                                >
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link fw-medium"
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); onNavigateToMap(); }}
                                >
                                    Map
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link fw-medium"
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); onNavigateToListing(); }}
                                >
                                    Listing
                                </a>
                            </li>
                            {onNavigateToRedFlagAlert && (
                                <li className="nav-item">
                                    <a className="nav-link fw-medium" href="#" onClick={(e) => { e.preventDefault(); onNavigateToRedFlagAlert(); }}>
                                        Red Flag Alert
                                    </a>
                                </li>
                            )}
                        </ul>

                        <div className="d-flex align-items-center gap-3">
                            <a className="nav-link text-secondary fw-medium active" href="#" onClick={(e) => { e.preventDefault(); }}>Setting</a>
                            {onNavigateToNotification && (
                                <button
                                    className="btn btn-link text-secondary p-0 border-0"
                                    onClick={(e) => { e.preventDefault(); onNavigateToNotification(); }}
                                >
                                    <Bell size={20} />
                                </button>
                            )}
                            <button className="btn-standard" onClick={onLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
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
            <footer className="footer">
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} RoomEase. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};
