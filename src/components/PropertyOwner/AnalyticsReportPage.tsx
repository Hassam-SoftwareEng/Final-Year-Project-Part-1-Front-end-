import React from "react";
import { Bell, Home } from 'lucide-react';
import "../../styles/PropertyOwner/AnalyticsReportPage.css";

interface User {
    fullName: string;
    email: string;
}

interface AnalyticsReportPageProps {
    user: User;
    onLogout: () => void;
    onNavigateToDashboard: () => void;
    onNavigateToSetting: () => void;
    onNavigateToRedFlagAlert: () => void;
    onNavigateToMap: () => void;
    onNavigateToListing: () => void;
    onNavigateToNotification?: () => void;
    onNavigateToHome?: () => void;
}

export const AnalyticsReportPage: React.FC<AnalyticsReportPageProps> = ({
    onLogout,
    onNavigateToDashboard,
    onNavigateToSetting,
    onNavigateToRedFlagAlert,
    onNavigateToMap,
    onNavigateToListing,
    onNavigateToNotification,
    onNavigateToHome
}) => {
    // Use onNavigateToHome if provided, otherwise fallback to dashboard
    const handleHomeNavigation = onNavigateToHome || onNavigateToDashboard;

    return (
        <div className="analytics-container">
            {/* Navbar (Bootstrap Standardized) */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm sticky-top px-3">
                <div className="container-fluid">
                    {/* Logo Section */}
                    <a className="navbar-brand d-flex align-items-center gap-2" href="#" onClick={(e) => { e.preventDefault(); handleHomeNavigation(); }}>
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
                                    onClick={(e) => { e.preventDefault(); handleHomeNavigation(); }}
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

            {/* Main Content */}
            <main className="main-content analytics-main">
                <div className="page-header">
                    <h1 className="header-title analytics-title">Analytics Report</h1>
                    <p className="header-subtitle analytics-subtitle">Detailed insights and compatibility metrics</p>
                </div>

                <div className="analytics-content-grid">

                    {/* LEFT COLUMN: Area Chart */}
                    <div className="dark-card">
                        <div className="chart-header-row">
                            <h2 className="chart-title">View</h2>
                            <div className="time-filter">
                                Week <span>▼</span>
                            </div>
                        </div>

                        <div className="chart-svg-container">
                            {/* SVG Wave Chart */}
                            <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="waveGradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                                        <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                                    </linearGradient>
                                </defs>

                                {/* Grid Lines (Horizontal) */}
                                <line x1="0" y1="250" x2="800" y2="250" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                                <line x1="0" y1="170" x2="800" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                                <line x1="0" y1="90" x2="800" y2="90" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                                {/* The Wave Path */}
                                <path d="M0,150 C100,100 150,50 200,80 C300,140 350,150 450,110 C550,80 600,150 700,80 C750,50 800,150 800,150 L800,300 L0,300 Z"
                                    fill="url(#waveGradient)" />
                                <path d="M0,150 C100,100 150,50 200,80 C300,140 350,150 450,110 C550,80 600,150 700,80 C750,50 800,150 800,150"
                                    fill="none" stroke="#38BDF8" strokeWidth="3" />
                            </svg>

                            {/* Tooltip Marker (Visual only) */}
                            <div className="chart-marker-dot"></div>
                            <div className="chart-marker-tooltip">50 hr</div>

                            {/* Y-Axis Labels */}
                            <div style={{ position: 'absolute', left: 0, bottom: '50px', fontSize: '10px', color: '#64748B' }}>00 hr</div>
                            <div style={{ position: 'absolute', left: 0, bottom: '130px', fontSize: '10px', color: '#64748B' }}>20 hr</div>
                            <div style={{ position: 'absolute', left: 0, bottom: '210px', fontSize: '10px', color: '#64748B' }}>40 hr</div>

                            {/* X-Axis Labels */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '20px', paddingRight: '10px', marginTop: '10px' }}>
                                <span style={{ fontSize: '10px', color: '#64748B' }}>1 Oct</span>
                                <span style={{ fontSize: '10px', color: '#64748B' }}>2 Oct</span>
                                <span style={{ fontSize: '10px', color: '#64748B' }}>3 Oct</span>
                                <span style={{ fontSize: '10px', color: '#64748B' }}>4 Oct</span>
                                <span style={{ fontSize: '10px', color: '#E2E8F0', fontWeight: 'bold' }}>5 Oct</span>
                                <span style={{ fontSize: '10px', color: '#64748B' }}>7 Oct</span>
                                <span style={{ fontSize: '10px', color: '#64748B' }}>8 Oct</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Stats Panel */}
                    <div className="dark-card">
                        <div className="panel-header">Last 48 hours</div>

                        <div className="stats-list">
                            <div className="stats-row">
                                <span className="stats-label">Views</span>
                                <span className="stats-value">123 K</span>
                            </div>
                            <div className="stats-row">
                                <span className="stats-label">Times</span>
                                <span className="stats-value">231 hr</span>
                            </div>
                            <div className="stats-row" style={{ borderBottom: 'none' }}>
                                <span className="stats-label">Subscribers</span>
                                <span className="stats-value positive" style={{ color: '#4ADE80' }}>+ 51</span>
                            </div>
                        </div>

                        <div className="panel-header" style={{ marginBottom: '16px' }}>Top Videos</div>

                        <div className="video-list">
                            <div className="video-item">
                                <div className="video-thumbnail" style={{ background: 'linear-gradient(135deg, #F87171, #EF4444)' }}></div>
                                <div className="video-info">
                                    <span style={{ color: 'white', marginBottom: '2px', fontSize: '12px' }}>Adobe xd | Countdown</span>
                                    <span style={{ opacity: 0.6, fontSize: '11px' }}>3.2k views</span>
                                </div>
                            </div>
                            <div className="video-item">
                                <div className="video-thumbnail" style={{ background: 'linear-gradient(135deg, #60A5FA, #3B82F6)' }}></div>
                                <div className="video-info">
                                    <span style={{ color: 'white', marginBottom: '2px', fontSize: '12px' }}>Adobe xd | Email receipt</span>
                                    <span style={{ opacity: 0.6, fontSize: '11px' }}>1.8k views</span>
                                </div>
                            </div>
                        </div>
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
};
