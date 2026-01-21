import React, { useState } from 'react';
import { Home, Bell, User, Lock, BellRing, Trash2, Camera } from 'lucide-react';
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
    // Unused props removed from destructuring to silence warnings
}) => {
    const [activeTab, setActiveTab] = useState<'general' | 'security' | 'notifications'>('general');

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

            <div className="container py-5">
                <h2 className="mb-4 fw-bold text-dark">Settings</h2>
                <div className="row g-4">
                    {/* Sidebar Tabs */}
                    <div className="col-lg-3 col-md-4">
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                            <div className="list-group list-group-flush">
                                <button
                                    className={`list-group-item list-group-item-action p-3 d-flex align-items-center gap-3 ${activeTab === 'general' ? 'active-tab' : ''}`}
                                    onClick={() => setActiveTab('general')}
                                >
                                    <User size={20} /> General
                                </button>
                                <button
                                    className={`list-group-item list-group-item-action p-3 d-flex align-items-center gap-3 ${activeTab === 'security' ? 'active-tab' : ''}`}
                                    onClick={() => setActiveTab('security')}
                                >
                                    <Lock size={20} /> Security
                                </button>
                                <button
                                    className={`list-group-item list-group-item-action p-3 d-flex align-items-center gap-3 ${activeTab === 'notifications' ? 'active-tab' : ''}`}
                                    onClick={() => setActiveTab('notifications')}
                                >
                                    <BellRing size={20} /> Notifications
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="col-lg-9 col-md-8">
                        {activeTab === 'general' && (
                            <div className="card border-0 shadow-sm rounded-4">
                                <div className="card-header bg-transparent border-0 p-4 pb-0 position-relative">
                                    <h4 className="fw-bold mb-0">Profile Details</h4>
                                    <button type="button" className="btn btn-outline-danger position-absolute top-50 end-0 translate-middle-y me-4 rounded-5 px-3 py-1 d-flex align-items-center gap-2" onClick={() => alert('Delete account functionality coming soon')}>
                                        <Trash2 size={16} /> Delete Account
                                    </button>
                                </div>
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center gap-4 mb-4">
                                        <div className="position-relative">
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
                            <div className="card border-0 shadow-sm rounded-4">
                                <div className="card-header bg-transparent border-0 p-4 pb-0">
                                    <h4 className="fw-bold mb-0">Security</h4>
                                    <p className="text-muted small">Manage your password and security preferences.</p>
                                </div>
                                <div className="card-body p-4">
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
                                        <div className="d-flex justify-content-end mt-4">
                                            <button type="submit" className="btn-standard">
                                                Update Security
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="card border-0 shadow-sm rounded-4">
                                <div className="card-header bg-transparent border-0 p-4 pb-0">
                                    <h4 className="fw-bold mb-0">Notifications</h4>
                                    <p className="text-muted small">Control what emails and alerts you receive.</p>
                                </div>
                                <div className="card-body p-4">
                                    <div className="mb-4">
                                        <h6 className="fw-bold">Email Notifications</h6>
                                        <div className="form-check form-switch mb-3">
                                            <input className="form-check-input" type="checkbox" id="newsSwitch" defaultChecked />
                                            <label className="form-check-label" htmlFor="newsSwitch">Weekly Newsletter</label>
                                        </div>
                                        <div className="form-check form-switch mb-3">
                                            <input className="form-check-input" type="checkbox" id="matchesSwitch" defaultChecked />
                                            <label className="form-check-label" htmlFor="matchesSwitch">New Match Alerts</label>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" id="msgsSwitch" defaultChecked />
                                            <label className="form-check-label" htmlFor="msgsSwitch">Direct Messages</label>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end mt-4">
                                        <button className="btn-standard">
                                            Save Preferences
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
