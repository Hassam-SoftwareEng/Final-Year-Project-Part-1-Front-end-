import React, { useState } from 'react';
import { Home, Bell, User, Lock, Trash2, Camera, CheckCircle } from 'lucide-react';
import '../../styles/User/SettingPage.css';

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
    onNavigateToMap,
    onNavigateToRedFlagAlert,
    onNavigateToNotification,
    onNavigateToVerification, // Added for verification tab
    // Unused props removed from destructuring to silence warnings
}) => {
    const [activeTab, setActiveTab] = useState<'general' | 'security' | 'verification'>('general');

    // General State
    const [fullName, setFullName] = useState(user.fullName);
    const [email, setEmail] = useState(user.email);
    const [bio, setBio] = useState('');
    const [phone, setPhone] = useState('');

    // Security State
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Settings saved successfully!');
    };

    return (
        <div className="setting-page-wrapper">
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
                            {/* Standardized 'Setting' Link to match Dashboard style (active state handled by context or manual class) */}
                            <a
                                className="nav-link text-secondary fw-medium active"
                                href="#"
                                onClick={(e) => { e.preventDefault(); }}
                            >
                                Setting
                            </a>

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

            <div className="container-fluid py-3 px-3">
                <header className="dashboard-header">
                    <div className="header-title-group">
                        <h1>Settings</h1>
                        <p className="header-subtitle">Manage your profile and account preferences.</p>
                    </div>
                </header>

                <div className="">
                    <div className="border-bottom mb-0">
                        <ul className="nav nav-tabs border-bottom-0 gap-4">
                            <li className="nav-item">
                                <button
                                    className={`nav-link border-0 bg-transparent py-3 px-1 ${activeTab === 'general' ? 'active-tab' : 'text-muted'}`}
                                    onClick={() => setActiveTab('general')}
                                >
                                    <div className="d-flex align-items-center gap-2">
                                        <User size={18} /> General
                                    </div>
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link border-0 bg-transparent py-3 px-1 ${activeTab === 'security' ? 'active-tab' : 'text-muted'}`}
                                    onClick={() => setActiveTab('security')}
                                >
                                    <div className="d-flex align-items-center gap-2">
                                        <Lock size={18} /> Security
                                    </div>
                                </button>
                            </li>

                            <li className="nav-item">
                                <button
                                    className={`nav-link border-0 bg-transparent py-3 px-1 ${activeTab === 'verification' ? 'active-tab' : 'text-muted'}`}
                                    onClick={() => setActiveTab('verification')}
                                >
                                    <div className="d-flex align-items-center gap-2">
                                        <CheckCircle size={18} /> Verification
                                    </div>
                                </button>
                            </li>

                        </ul>
                    </div>

                    <div className="pt-0">
                        {activeTab === 'general' && (
                            <div className="animate-fade-in-up">
                                <div className="py-4 pb-0 position-relative">
                                    <h4 className="fw-bold mb-0">Profile Details</h4>
                                    <button type="button" className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-medium position-absolute top-50 end-0 translate-middle-y me-4 hover-scale" onClick={() => alert('Delete account functionality coming soon')}>
                                        <Trash2 size={16} /> Delete Account
                                    </button>
                                </div>
                                <div className="py-4">
                                    <div className="d-flex align-items-center gap-4 mb-4">
                                        <div className="position-relative hover-scale">
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${fullName}&background=random`}
                                                alt="Profile"
                                                className="rounded-circle"
                                                width="80"
                                                height="80"
                                            />
                                            <button className="btn btn-sm btn-light position-absolute bottom-0 end-0 rounded-circle shadow-sm border p-1">
                                                <Camera size={14} />
                                            </button>
                                        </div>
                                        <div>
                                            <button className="btn-standard me-2">Change Image</button>
                                            <button className="btn btn-ghost btn-sm text-danger">Remove</button>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSave}>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="form-label fw-medium">Full Name</label>
                                                <input type="text" className="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-medium">Email</label>
                                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-medium">Phone</label>
                                                <input type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label fw-medium">Bio</label>
                                                <textarea className="form-control" rows={3} placeholder="Tell us a little about yourself..." value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center mt-4">
                                            <button type="submit" className="btn-standard">
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="animate-fade-in-up">
                                <div className="py-4 pb-0">
                                    <h4 className="fw-bold mb-0">Security</h4>
                                    <p className="text-muted small">Manage your password and security preferences.</p>
                                </div>
                                <div className="py-4">
                                    <form onSubmit={handleSave}>
                                        <div className="mb-3">
                                            <label className="form-label fw-medium">Current Password</label>
                                            <input type="password" className="form-control" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                                        </div>
                                        <div className="row g-3 mb-4">
                                            <div className="col-md-6">
                                                <label className="form-label fw-medium">New Password</label>
                                                <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-medium">Confirm Password</label>
                                                <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                            </div>
                                        </div>
                                        <hr className="my-4" />
                                        <div className="form-check form-switch mb-3">
                                            <input className="form-check-input" type="checkbox" id="2faSwitch" />
                                            <label className="form-check-label fw-medium" htmlFor="2faSwitch">Two-Factor Authentication</label>
                                            <p className="text-muted small mb-0">Add an extra layer of security to your account.</p>
                                        </div>
                                        <div className="d-flex justify-content-center mt-4">
                                            <button type="submit" className="btn-standard">
                                                Update Security
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {activeTab === 'verification' && (
                            <div className="animate-fade-in-up">
                                <div className="py-4 pb-0">
                                    <h4 className="fw-bold mb-0">Identity Verification</h4>
                                    <p className="text-muted small">Verify your identity to build trust with other members.</p>
                                </div>
                                <div className="py-4">
                                    <div className="d-flex flex-column align-items-center justify-content-center text-center p-5 border rounded-4 bg-light">
                                        <div className="bg-white p-3 rounded-circle shadow-sm mb-4">
                                            <CheckCircle size={48} className="text-primary" style={{ color: '#14919B' }} />
                                        </div>
                                        <h5 className="fw-bold mb-2">Get Verified Badge</h5>
                                        <p className="text-muted mb-4" style={{ maxWidth: '400px' }}>
                                            Confirm your identity by uploading a government-issued ID. Verified users get 3x more responses.
                                        </p>
                                        <button className="btn-standard px-4 py-2" onClick={onNavigateToVerification}>
                                            Start Verification
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </div>

    );
};
