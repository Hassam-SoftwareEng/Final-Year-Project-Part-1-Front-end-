import React, { useState } from 'react';
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
}

export const RedFlagAlert: React.FC<RedFlagAlertProps> = ({
    onLogout,
    onNavigateToDashboard,
    onNavigateToMatches,
    onNavigateToMessages,
    onNavigateToCreateProfile,
    onNavigateToSetting,
    onNavigateToMap
}) => {

    const [alerts] = useState([
        { id: 1, title: 'Suspicious Activity Detected', reportedPerson: 'JohnDoe123', description: 'Requested money before meeting.', severity: 'High', date: '2025-01-01' },
        { id: 2, title: 'Profile Verification Failed', reportedPerson: 'Alex', description: 'Person upload wrong file and empty.', severity: 'Medium', date: '2024-12-30' },
        { id: 3, title: 'Document Missing', reportedPerson: 'Taylor', description: 'Person did not upload document.', severity: 'High', date: '2024-12-28' },
    ]);

    return (
        <div className="red-flag-container">
            {/* Navbar */}
            <nav className="red-flag-navbar">
                <div className="nav-left">
                    <div className="logo-section">
                        <span className="logo-text">RoomEase</span>
                    </div>
                </div>

                <div className="nav-center">
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToDashboard(); }}>Home</a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToCreateProfile(); }}>Create Profile</a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToMatches(); }}>Match</a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToMap(); }}>Map</a>
                    <a href="#" className="nav-link">Listing</a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToMessages(); }}>Message</a>
                    <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>Red Flag Alert</a>
                </div>

                <div className="nav-right">
                    <a href="#" className="nav-link" style={{ marginRight: '20px' }} onClick={(e) => { e.preventDefault(); onNavigateToSetting(); }}>Setting</a>
                    <button className="logout-btn" onClick={onLogout}>Logout</button>
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
