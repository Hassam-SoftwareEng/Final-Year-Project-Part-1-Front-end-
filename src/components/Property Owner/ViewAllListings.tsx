import { useState } from 'react';
import { Home, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Property Owner/ViewAllListings.css';

interface ViewAllListingsProps {
    onLogout?: () => void;
    onNavigateToDashboard?: () => void;
    onNavigateToNotification?: () => void;
    onNavigateToSetting?: () => void;
}

export const ViewAllListings: React.FC<ViewAllListingsProps> = () => {
    const navigate = useNavigate();
    const [type, setType] = useState('All'); // 'All', 'Sale', 'Rent'

    return (
        <div className="dashboard-container">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm sticky-top px-3">
                <div className="container-fluid">
                    <a className="navbar-brand d-flex align-items-center gap-2" href="#" onClick={(e) => { e.preventDefault(); navigate('/property-owner-dashboard'); }}>
                        <Home className="text-primary" size={24} style={{ color: '#14919B' }} />
                        <span className="fw-bold" style={{ color: '#14919B', fontSize: '1.25rem' }}>RoomEase</span>
                    </a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#viewAllNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="viewAllNavbar">
                        <div className="ms-auto d-flex align-items-center gap-3">
                            <button className="btn btn-link text-secondary p-0 border-0" onClick={() => navigate('/property-owner-setting')} title="Settings">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#14919B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                            </button>
                            <button className="btn btn-link text-secondary p-0 border-0" onClick={() => navigate('/property-owner-notifications')} title="Notifications">
                                <Bell size={22} />
                            </button>
                            <button className="btn-standard" onClick={() => navigate('/')}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="main-content">
                <header className="dashboard-header">
                    <div className="header-title-group">
                        <h1>All Listings</h1>
                        <p className="header-subtitle">View and manage all your properties.</p>
                    </div>
                </header>

                {/* Filter Section */}
                <div className="card border-0 shadow-sm p-4 mb-4 rounded-3 bg-white">
                    <div className="d-flex align-items-center">
                        <div className="col-md-3">
                            <label className="form-label text-secondary small fw-medium mb-1">Filter by Type</label>
                            <select
                                className="form-select bg-light"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="All">All Types</option>
                                <option value="Sale">For Sale</option>
                                <option value="Rent">For Rent</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="saved-listings-container">
                    {/* Listings Mock Data - Sales */}
                    {(type === 'All' || type === 'Sale') && (
                        <>
                            <div className="listing-card-modern hover-scale">
                                <img src="/assets/images/premium_photo-1684175656320-5c3f701c082c (appartemnt).avif" className="listing-img" alt="Listing" />
                                <div className="listing-details">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <div className="listing-title mb-0">Modern Apartment in F-10</div>
                                        <span className="badge bg-success">For Sale</span>
                                    </div>
                                    <div className="listing-price">PKR 4.5 Crore</div>
                                    <div className="d-flex gap-2 mt-2">
                                        <button className="btn-standard flex-grow-1" onClick={() => navigate('/property-owner-detail-listing?id=sale-1')}>View</button>
                                        <button className="btn-standard flex-grow-1" style={{ borderColor: '#dc3545', color: '#dc3545' }} onClick={() => alert('Delete Clicked')}>Delete</button>
                                    </div>
                                </div>
                            </div>
                            <div className="listing-card-modern hover-scale">
                                <img src="/assets/images/photo-1515263487990-61b07816b324 (flat).avif" className="listing-img" alt="Listing" />
                                <div className="listing-details">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <div className="listing-title mb-0">Luxury Villa in DHA</div>
                                        <span className="badge bg-success">For Sale</span>
                                    </div>
                                    <div className="listing-price">PKR 12 Crore</div>
                                    <div className="d-flex gap-2 mt-2">
                                        <button className="btn-standard flex-grow-1" onClick={() => navigate('/property-owner-detail-listing?id=sale-1')}>View</button>
                                        <button className="btn-standard flex-grow-1" style={{ borderColor: '#dc3545', color: '#dc3545' }} onClick={() => alert('Delete Clicked')}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Listings Mock Data - Rent */}
                    {(type === 'All' || type === 'Rent') && (
                        <>
                            <div className="listing-card-modern hover-scale">
                                <img src="/assets/images/photo-1515263487990-61b07816b324 (flat).avif" className="listing-img" alt="Listing" />
                                <div className="listing-details">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <div className="listing-title mb-0">Cozy Studio DHA</div>
                                        <span className="badge bg-primary">For Rent</span>
                                    </div>
                                    <div className="listing-price">PKR 30,000/mo</div>
                                    <div className="d-flex gap-2 mt-2">
                                        <button className="btn-standard flex-grow-1" onClick={() => navigate('/property-owner-detail-listing?id=sale-1')}>View</button>
                                        <button className="btn-standard flex-grow-1" style={{ borderColor: '#dc3545', color: '#dc3545' }} onClick={() => alert('Delete Clicked')}>Delete</button>
                                    </div>
                                </div>
                            </div>
                            <div className="listing-card-modern hover-scale">
                                <img src="/assets/images/Securemessaging.jpg" className="listing-img" alt="Listing" />
                                <div className="listing-details">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <div className="listing-title mb-0">Shared Room Blue Area</div>
                                        <span className="badge bg-primary">For Rent</span>
                                    </div>
                                    <div className="listing-price">PKR 15,000/mo</div>
                                    <div className="d-flex gap-2 mt-2">
                                        <button className="btn-standard flex-grow-1" onClick={() => navigate('/property-owner-detail-listing?id=sale-2')}>View</button>
                                        <button className="btn-standard flex-grow-1" style={{ borderColor: '#dc3545', color: '#dc3545' }} onClick={() => alert('Delete Clicked')}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewAllListings;
