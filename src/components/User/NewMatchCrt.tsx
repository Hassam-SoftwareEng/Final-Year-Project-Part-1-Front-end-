import React from 'react';
import { Bell, Home } from 'lucide-react';
import '../../styles/User/NewMatchCrt.css'; // Import the specific CSS

interface NewMatchCrtProps {
    onLogout: () => void;
    onNavigateToDashboard: () => void;
    onNavigateToListing: () => void;
    onNavigateToNotification?: () => void;
    onNavigateToMap: () => void;
    onNavigateToSetting: () => void;
    onNavigateToRedFlagAlert: () => void;
}

export default function NewMatchCrt({
    onLogout,
    onNavigateToDashboard,
    onNavigateToListing,

    onNavigateToNotification,
    onNavigateToMap,
    onNavigateToSetting,
    onNavigateToRedFlagAlert
}: NewMatchCrtProps) {
    const [hoveredMatch, setHoveredMatch] = React.useState<string | null>(null);

    const matchesData = [
        { id: '1', name: 'Ali Khan', role: 'Student', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=400&h=400' },
        { id: '2', name: 'Bilal Raza', role: 'Professional', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=400&h=400' },
        { id: '3', name: 'Sarah Ahmed', role: 'Designer', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=400&h=400' },
        { id: '4', name: 'Zara Shah', role: 'Researcher', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?fit=crop&w=400&h=400' },
        { id: '5', name: 'Omar Farooq', role: 'Developer', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fit=crop&w=400&h=400' },
        { id: '6', name: 'Hina Altaf', role: 'Artist', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?fit=crop&w=400&h=400' },
    ];

    return (
        <div className="new-match-container">
            {/* Top Navbar (Bootstrap) - Reused for consistency */}
            {/* Top Navbar - Standardized */}
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

            <main className="new-match-content">
                <div className="new-match-card">
                    <div className="new-match-header">
                        <h2 className="new-match-title">New Matches</h2>
                        <p className="text-muted">Discover people who match your preferences.</p>
                    </div>

                    <div className="matches-interactive-list">
                        {/* Hover Image Display - Absolute Positioned */}
                        <div className={`match-hover-image-container ${hoveredMatch ? 'visible' : ''}`}>
                            {hoveredMatch && (
                                <img
                                    src={matchesData.find(m => m.id === hoveredMatch)?.image}
                                    alt="Match"
                                    className="match-hover-img"
                                />
                            )}
                        </div>

                        {matchesData.map((match) => (
                            <div
                                key={match.id}
                                className="match-list-item"
                                onMouseEnter={() => setHoveredMatch(match.id)}
                                onMouseLeave={() => setHoveredMatch(null)}
                            // onClick could navigate to valid individual profile if needed
                            >
                                <div className="match-info-group">
                                    <span className="match-name">{match.name}</span>
                                    <span className="match-role">/ {match.role}</span>
                                </div>
                                <div className="match-action-arrow">
                                    <span className="about-text">VIEW PROFILE</span> ↗
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <footer className="footer">
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} RoomEase. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
