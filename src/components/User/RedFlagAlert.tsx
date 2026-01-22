import React, { useState } from 'react';
import { Bell, Home } from 'lucide-react';
import '../../styles/User/RedFlagAlert.css';

interface User {
    email: string;
    fullName: string;
}

interface RedFlagAlertProps {
    user: User;
    onLogout: () => void;
    onNavigateToDashboard: () => void;
    onNavigateToMatches: () => void;
    onNavigateToMessages: () => void;
    onNavigateToAnalytics: () => void;
    onNavigateToCreateProfile: () => void;
    onNavigateToSetting: () => void;
    onNavigateToMap: () => void;
    onNavigateToListing: () => void;
    onNavigateToRedFlagAlert: () => void;
    onNavigateToNotification?: () => void;
}

export const RedFlagAlert: React.FC<RedFlagAlertProps> = ({
    onLogout,
    onNavigateToDashboard,
    onNavigateToSetting,
    onNavigateToListing,
    onNavigateToMap,
    onNavigateToNotification,
    onNavigateToRedFlagAlert
}) => {

    const [alerts] = useState([
        { id: 1, title: 'Suspicious Activity Detected', reportedPerson: 'JohnDoe123', description: 'Requested money before meeting.', severity: 'High', date: '2025-01-01' },
        { id: 2, title: 'Profile Verification Failed', reportedPerson: 'Alex', description: 'Person upload wrong file and empty.', severity: 'Medium', date: '2024-12-30' },
        { id: 3, title: 'Document Missing', reportedPerson: 'Taylor', description: 'Person did not upload document.', severity: 'High', date: '2024-12-28' },
    ]);

    return (
        <div className="red-flag-container">
            {/* Navbar */}
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
                                    <a className="nav-link fw-medium active" aria-current="page" href="#" onClick={(e) => { e.preventDefault(); onNavigateToRedFlagAlert(); }}>
                                        Red Flag Alert
                                    </a>
                                </li>
                            )}
                        </ul>

                        <div className="d-flex align-items-center gap-3">
                            {onNavigateToSetting && (
                                <a className="nav-link text-secondary fw-medium" href="#" onClick={(e) => { e.preventDefault(); onNavigateToSetting(); }}>Setting</a>
                            )}
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
            <main className="red-flag-content">
                <header className="red-flag-header">
                    <h1 className="red-flag-title">Red Flag Alerts & Safety</h1>
                    <p className="red-flag-subtitle">Stay informed about potential risks and safety updates.</p>
                </header>

                <div className="alerts-list">
                    {alerts.map(alert => (
                        <div key={alert.id} className={`alert-card severity-${alert.severity.toLowerCase()}`}>
                            <div className="alert-header">
                                <h3 className="alert-title">{alert.title}</h3>
                                <span className="alert-date">{alert.date}</span>
                            </div>

                            <div className="alert-details">
                                <div className="detail-row">
                                    <span className="detail-label">Person:</span>
                                    <span className="detail-value">{alert.reportedPerson}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Description:</span>
                                    <p className="detail-value description-text">{alert.description}</p>
                                </div>
                            </div>

                            <div className="alert-footer">
                                <span className="alert-severity">{alert.severity} Priority</span>
                                <button className="report-btn">Report</button>
                            </div>
                        </div>
                    ))}
                </div>


            </main>

        </div>
    );
};
