import '../../styles/Property Owner/Dashboard.css';
import React from 'react';
import { CheckCircle, Home, Bell, Plus } from 'lucide-react';

interface DashboardProps {
    user?: {
        email: string;
        fullName: string;
    };
    onLogout: () => void;
    onNavigateToSetting?: () => void;
    onNavigateToListing?: () => void;
    onNavigateToNotification?: () => void;
    onNavigateToPostListing?: () => void;
    onNavigateToUserDashboard?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
    user = { email: 'owner@example.com', fullName: 'Property Owner' },
    onLogout,
    onNavigateToListing = () => console.log('Navigate to Listing'),
    onNavigateToNotification = () => console.log('Navigate to Notification'),
    onNavigateToSetting = () => console.log('Navigate to Setting'),
    onNavigateToPostListing,
    onNavigateToUserDashboard
}) => {

    return (
        <div className="dashboard-container">
            {/* Top Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm sticky-top px-3">
                <div className="container-fluid">
                    <a className="navbar-brand d-flex align-items-center gap-2" href="#" onClick={(e) => { e.preventDefault(); }}>
                        <Home className="text-primary" size={24} style={{ color: '#14919B' }} />
                        <span className="fw-bold" style={{ color: '#14919B', fontSize: '1.25rem' }}>RoomEase</span>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#dashboardNavbar" aria-controls="dashboardNavbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="dashboardNavbar">
                        <div className="ms-auto d-flex align-items-center gap-3">
                            {onNavigateToSetting && (
                                <button className="btn btn-link text-secondary p-0 border-0" onClick={(e) => { e.preventDefault(); onNavigateToSetting(); }} title="Settings">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                                </button>
                            )}
                            {onNavigateToNotification && (
                                <button className="btn btn-link text-secondary p-0 border-0" onClick={(e) => { e.preventDefault(); onNavigateToNotification(); }} title="Notifications">
                                    <Bell size={22} />
                                </button>
                            )}
                            <button className="btn-standard" onClick={onLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content Layout */}
            <main className="main-content">

                <header className="dashboard-header">
                    <div className="header-title-group">
                        <h1>
                            Welcome, {user.fullName ? user.fullName.split(' ')[0] : 'Owner'}
                            <span className="verified-badge">
                                <CheckCircle size={14} /> Verified
                            </span>
                        </h1>
                        <p className="header-subtitle">Manage your property listings here.</p>
                    </div>

                    <div className="header-stats">
                        <button className="btn-prominent" onClick={() => onNavigateToPostListing && onNavigateToPostListing()}>
                            <Plus size={18} strokeWidth={3} />
                            Add Property
                        </button>
                    </div>
                </header>

                {/* Your Listings Section */}
                <div className="mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-3 px-1">
                        <h3 className="fw-bold m-0" style={{ fontSize: '24px', color: '#111827' }}>
                            Your Listings
                        </h3>
                        <button className="btn-standard" onClick={() => onNavigateToListing && onNavigateToListing()}>View All</button>
                    </div>
                    <div className="saved-listings-container" style={{ padding: '0' }}>
                        <div className="listing-card-modern">
                            <img src="/assets/images/premium_photo-1684175656320-5c3f701c082c (appartemnt).avif" className="listing-img" alt="Listing" />
                            <div className="listing-details">
                                <div className="listing-title">Modern Apartment in F-10</div>
                                <div className="listing-price">PKR 45,000/mo</div>
                            </div>
                        </div>
                        <div className="listing-card-modern">
                            <img src="/assets/images/photo-1515263487990-61b07816b324 (flat).avif" className="listing-img" alt="Listing" />
                            <div className="listing-details">
                                <div className="listing-title">Cozy Studio DHA</div>
                                <div className="listing-price">PKR 30,000/mo</div>
                            </div>
                        </div>
                        <div className="listing-card-modern">
                            <img src="/assets/images/Securemessaging.jpg" className="listing-img" alt="Listing" />
                            <div className="listing-details">
                                <div className="listing-title">Shared Room Blue Area</div>
                                <div className="listing-price">PKR 15,000/mo</div>
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

export default Dashboard;
