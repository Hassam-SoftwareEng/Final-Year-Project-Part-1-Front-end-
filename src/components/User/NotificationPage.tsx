import React, { useState } from 'react';
import '../../styles/User/NotificationPage.css';
import { Bell } from 'lucide-react';

interface NotificationPageProps {
    onLogout: () => void;
    onNavigateToDashboard: () => void;
    onNavigateToMatches: () => void;
    onNavigateToMessages: () => void;
    onNavigateToCreateProfile: () => void;
    onNavigateToSetting: () => void;
    onNavigateToRedFlagAlert: () => void;
    onNavigateToMap: () => void;
    onNavigateToListing: () => void;
    onNavigateToNotification: () => void;
}

export const NotificationPage: React.FC<NotificationPageProps> = ({
    onLogout,
    onNavigateToDashboard,
    onNavigateToMatches,
    onNavigateToMessages,
    onNavigateToCreateProfile,
    onNavigateToSetting,
    onNavigateToRedFlagAlert,
    onNavigateToMap,
    onNavigateToListing,
    onNavigateToNotification
}) => {
    const [notifications] = useState([
        {
            id: 1,
            title: "New Match Found!",
            description: "You have a new match with Ali Khan based on your preferences.",
            time: "2 mins ago",
            read: false
        },
        {
            id: 2,
            title: "Message Received",
            description: "Sarah sent you a message about the apartment listing.",
            time: "1 hour ago",
            read: true
        },
        {
            id: 3,
            title: "Profile Verified",
            description: "Your profile has been successfully verified by the admin.",
            time: "1 day ago",
            read: true
        }
    ]);

    return (
        <div className="notification-page-container">
            {/* Navbar */}
            <nav className="notification-navbar">
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
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToListing(); }}>Listing</a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToMessages(); }}>Message</a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToRedFlagAlert(); }}>Red Flag Alert</a>
                </div>

                <div className="nav-right">
                    <a href="#" className="nav-link" style={{ marginRight: '20px' }} onClick={(e) => { e.preventDefault(); onNavigateToSetting(); }}>Setting</a>
                    <button className="nav-icon-btn active" style={{ marginRight: '20px' }} onClick={(e) => { e.preventDefault(); onNavigateToNotification(); }}>
                        <Bell size={20} />
                    </button>
                    <button className="logout-btn" onClick={onLogout}>Logout</button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="notification-content">
                <div className="notification-header">
                    <h1 className="notification-title">Notifications</h1>
                </div>

                <div className="notification-list">
                    {notifications.map(notification => (
                        <div key={notification.id} className={`notification-card ${notification.read ? 'read' : 'unread'}`}>

                            <div className="notification-details">
                                <div className="notification-card-header">
                                    <h3 className="notification-card-title">{notification.title}</h3>
                                    <span className="notification-time">{notification.time}</span>
                                </div>
                                <p className="notification-description">{notification.description}</p>
                            </div>
                            {!notification.read && <div className="unread-dot"></div>}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};
