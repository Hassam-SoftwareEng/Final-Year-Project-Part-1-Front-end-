
import React from "react";
import "../styles/MatchesPages.css";


interface User {
    fullName: string;
    email: string;
}

interface MatchesPagesProps {
    user: User;
    onLogout: () => void;
    onNavigateToDashboard: () => void;
    onNavigateToMessages: () => void;
    onNavigateToCreateProfile: () => void;
    onNavigateToSetting: () => void;
    onNavigateToRedFlagAlert: () => void;
}

export const MatchesPages: React.FC<MatchesPagesProps> = ({
    user,
    onLogout,
    onNavigateToDashboard,
    onNavigateToMessages,
    onNavigateToCreateProfile,
    onNavigateToSetting,
    onNavigateToRedFlagAlert
}) => {
    return (
        <div className="matches-page-container">
            {/* Navbar - Using the Dark Blue Theme requested */}
            <nav className="matches-navbar">
                <div className="nav-left">
                    <div className="logo-section">
                        <span className="logo-text">RoomEase</span>
                    </div>
                </div>

                <div className="nav-center">
                    <button className="nav-link" onClick={onNavigateToDashboard} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        Home
                    </button>
                    <a
                        href="#"
                        className="nav-link"
                        onClick={(e) => { e.preventDefault(); onNavigateToCreateProfile(); }}
                    >
                        Create Profile
                    </a>
                    <a href="#" className="nav-link">
                        Match
                    </a>
                    <a href="#" className="nav-link">
                        Map
                    </a>
                    <a href="#" className="nav-link">
                        Listing
                    </a>
                    <a href="#" className="nav-link" onClick={onNavigateToMessages}>
                        Message
                    </a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToRedFlagAlert(); }}>
                        Red Flag Alert
                    </a>
                </div>

                <div className="nav-right">
                    <a href="#" className="nav-link" style={{ marginRight: '20px' }} onClick={(e) => { e.preventDefault(); onNavigateToSetting(); }}>
                        Setting
                    </a>
                    <button className="logout-btn" onClick={onLogout}>
                        Logout
                    </button>
                </div>
            </nav>

            <main className="matches-content">
                <div className="matches-page-header">
                    <h1 className="matches-title">Matches</h1>
                    <p className="matches-subtitle">Your Perfect match is here</p>
                </div>
                <div className="matches-list">
                    {/* Match Card 1 - Ali Raza */}
                    <div className="match-card">
                        <div className="match-card-header">
                            <div className="avatar-circle">A</div>
                            <span className="verified-badge">✔</span>
                        </div>
                        <h3 className="match-name">Ali Raza</h3>
                        <p className="match-role">Marketing Manager</p>

                        <div className="match-location">
                            <span>Pwd ,Islamabad</span>
                            <span className="location-icon">📍</span>
                        </div>

                        <div className="compatibility-section">
                            <div className="comp-label">
                                <span>Compatibililty</span>
                                <span className="comp-score">92%</span>
                            </div>
                            <div className="progress-bar-container">
                                <div className="progress-bar" style={{ width: '92%' }}></div>
                            </div>
                        </div>

                        <div className="match-actions">
                            <button className="action-btn profile-btn">
                                <span className="icon">👤</span> Profile
                            </button>
                            <button className="action-btn message-btn" onClick={onNavigateToMessages}>
                                <span className="icon">💬</span> Message
                            </button>
                        </div>
                    </div>

                    {/* Match Card 2 - Bilal */}
                    <div className="match-card">
                        <div className="match-card-header">
                            <div className="avatar-circle">B</div>
                        </div>
                        <h3 className="match-name">Bilal</h3>
                        <p className="match-role">Graphic Designer</p>

                        <div className="match-location">
                            <span>Pwd ,Islamabad</span>
                            <span className="location-icon">📍</span>
                        </div>

                        <div className="compatibility-section">
                            <div className="comp-label">
                                <span>Compatibililty</span>
                                <span className="comp-score">85%</span>
                            </div>
                            <div className="progress-bar-container">
                                <div className="progress-bar" style={{ width: '85%' }}></div>
                            </div>
                        </div>

                        <div className="match-actions">
                            <button className="action-btn profile-btn">
                                <span className="icon">👤</span> Profile
                            </button>
                            <button className="action-btn message-btn" onClick={onNavigateToMessages}>
                                <span className="icon">💬</span> Message
                            </button>
                        </div>
                    </div>

                    {/* Match Card 3 - Moiz */}
                    <div className="match-card">
                        <div className="match-card-header">
                            <div className="avatar-circle">M</div>
                        </div>
                        <h3 className="match-name">Moiz</h3>
                        <p className="match-role">Doctor</p>

                        <div className="match-location">
                            <span>Pwd ,Islamabad</span>
                            <span className="location-icon">📍</span>
                        </div>

                        <div className="compatibility-section">
                            <div className="comp-label">
                                <span>Compatibililty</span>
                                <span className="comp-score">65%</span>
                            </div>
                            <div className="progress-bar-container">
                                <div className="progress-bar" style={{ width: '65%' }}></div>
                            </div>
                        </div>

                        <div className="match-actions">
                            <button className="action-btn profile-btn">
                                <span className="icon">👤</span> Profile
                            </button>
                            <button className="action-btn message-btn" onClick={onNavigateToMessages}>
                                <span className="icon">💬</span> Message
                            </button>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};
