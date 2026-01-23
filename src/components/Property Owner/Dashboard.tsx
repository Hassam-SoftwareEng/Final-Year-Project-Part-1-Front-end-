import { useNavigate } from 'react-router-dom';
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
    onNavigateToListing?: (filter?: string) => void;
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
    onNavigateToPostListing
}) => {
    const navigate = useNavigate();

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
                        <button className="btn-standard" onClick={() => onNavigateToPostListing && onNavigateToPostListing()}>
                            <Plus size={18} strokeWidth={3} />
                            Add Property
                        </button>
                    </div>
                </header>

                {/* Listings Summary Card */}
                <div className="card border-0 shadow-sm rounded-3 p-4 mb-4 bg-white animate-fade-in-up">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="fw-bold mb-0 text-dark">Listings</h5>
                    </div>
                    <div className="row g-0">
                        {/* Active Stats - Left Side */}
                        <div
                            className="col-md-3 border-end d-flex align-items-center justify-content-center hover-bg-light rounded cursor-pointer"
                            onClick={() => onNavigateToListing && onNavigateToListing('active')}
                            style={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
                        >
                            <div className="d-flex align-items-center gap-3">
                                <div className="p-3 rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px' }}>
                                    <Home className="text-success" size={32} />
                                </div>
                                <div>
                                    <div className="text-secondary mb-1">Active</div>
                                    <div className="fw-bold fs-4">0</div>
                                </div>
                            </div>
                        </div>

                        {/* Other Stats - Right Side Grid */}
                        <div className="col-md-9 ps-md-5">
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div
                                        className="d-flex align-items-center gap-3 hover-scale cursor-pointer p-2 rounded"
                                        onClick={() => onNavigateToListing && onNavigateToListing('sale')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="p-2 rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backgroundColor: '#e0f2f1' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#26a69a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                                        </div>
                                        <div>
                                            <div className="text-secondary small">For Sale</div>
                                            <div className="fw-bold">0</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div
                                        className="d-flex align-items-center gap-3 hover-scale cursor-pointer p-2 rounded"
                                        onClick={() => onNavigateToListing && onNavigateToListing('rent')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="p-2 rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backgroundColor: '#e3f2fd' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#42a5f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                        </div>
                                        <div>
                                            <div className="text-secondary small">For Rent</div>
                                            <div className="fw-bold">0</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div
                                        className="d-flex align-items-center gap-3 hover-scale cursor-pointer p-2 rounded"
                                        onClick={() => onNavigateToListing && onNavigateToListing('pending')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="p-2 rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backgroundColor: '#fff3e0' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffa726" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                        </div>
                                        <div>
                                            <div className="text-secondary small">Pending</div>
                                            <div className="fw-bold">0</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div
                                        className="d-flex align-items-center gap-3 hover-scale cursor-pointer p-2 rounded"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="p-2 rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backgroundColor: '#ffebee' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef5350" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
                                        </div>
                                        <div>
                                            <div className="text-secondary small">Offline</div>
                                            <div className="fw-bold">0</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="fw-bold text-dark">Your Listings</h5>
                            <button className="btn-standard" onClick={() => navigate('/property-owner-view-all-listings')}>View All</button>
                        </div>
                        <div className="saved-listings-container" style={{ padding: '0' }}>
                            <div className="listing-card-modern">
                                <img src="/assets/images/premium_photo-1684175656320-5c3f701c082c (appartemnt).avif" className="listing-img" alt="Listing" />
                                <div className="listing-details">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <div className="listing-title mb-0">Modern Apartment in F-10</div>
                                        <span className="badge bg-success">For Sale</span>
                                    </div>
                                    <div className="listing-price">PKR 4.5 Crore</div>
                                    <div className="d-flex gap-2 mt-2">
                                        <button className="btn-standard flex-grow-1" onClick={() => alert('Edit Clicked')}>Edit</button>
                                        <button className="btn-standard flex-grow-1" style={{ borderColor: '#dc3545', color: '#dc3545' }} onClick={() => alert('Delete Clicked')}>Delete</button>
                                    </div>
                                </div>
                            </div>
                            <div className="listing-card-modern">
                                <img src="/assets/images/photo-1515263487990-61b07816b324 (flat).avif" className="listing-img" alt="Listing" />
                                <div className="listing-details">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <div className="listing-title mb-0">Cozy Studio DHA</div>
                                        <span className="badge bg-primary">For Rent</span>
                                    </div>
                                    <div className="listing-price">PKR 30,000/mo</div>
                                    <div className="d-flex gap-2 mt-2">
                                        <button className="btn-standard flex-grow-1" onClick={() => alert('Edit Clicked')}>Edit</button>
                                        <button className="btn-standard flex-grow-1" style={{ borderColor: '#dc3545', color: '#dc3545' }} onClick={() => alert('Delete Clicked')}>Delete</button>
                                    </div>
                                </div>
                            </div>
                            <div className="listing-card-modern">
                                <img src="/assets/images/Securemessaging.jpg" className="listing-img" alt="Listing" />
                                <div className="listing-details">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <div className="listing-title mb-0">Shared Room Blue Area</div>
                                        <span className="badge bg-primary">For Rent</span>
                                    </div>
                                    <div className="listing-price">PKR 15,000/mo</div>
                                    <div className="d-flex gap-2 mt-2">
                                        <button className="btn-standard flex-grow-1" onClick={() => alert('Edit Clicked')}>Edit</button>
                                        <button className="btn-standard flex-grow-1" style={{ borderColor: '#dc3545', color: '#dc3545' }} onClick={() => alert('Delete Clicked')}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            </main>
            <footer className="footer">
                <div className="footer-bottom">
                    <p>&copy; 2024 RoomEase. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
