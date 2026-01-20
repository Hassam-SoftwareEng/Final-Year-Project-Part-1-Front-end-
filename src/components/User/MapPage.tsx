import React, { useState } from 'react';
import { Search, Navigation, Plus, Minus, MapPin, Share2, Edit2, Map as MapIcon, Star, Globe, Phone, Smartphone, Tag, RotateCcw, X, ChevronRight, Bell, Home } from 'lucide-react';
import '../../styles/User/MapPage.css';

interface MapPageProps {
    onLogout: () => void;
    onNavigateToDashboard: () => void;
    onNavigateToSetting: () => void;
    onNavigateToRedFlagAlert: () => void;
    onNavigateToListing: () => void;
    onNavigateToNotification?: () => void;
}

export const MapPage: React.FC<MapPageProps> = ({
    onLogout,
    onNavigateToDashboard,
    onNavigateToSetting,
    onNavigateToRedFlagAlert,
    onNavigateToListing,
    onNavigateToNotification
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlace, setSelectedPlace] = useState(''); // Stores the confirmed search result
    const [showLocationDetail, setShowLocationDetail] = useState(false);
    const [activeTab, setActiveTab] = useState('Overview');

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchQuery.trim() !== '') {
            setSelectedPlace(searchQuery); // Set title only on Enter
            setShowLocationDetail(true);
            setActiveTab('Overview'); // Reset to Overview on new search
        }
    };

    return (
        <div className="map-page-container">
            {/* Navbar (Bootstrap Standardized) */}
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
                                    className="nav-link fw-medium active"
                                    aria-current="page"
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); }}
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

            <div className="map-content-wrapper">
                {/* Search Bar Overlay - Wraps sidebar when active */}

                {/* Sidebar Detail Card */}
                {showLocationDetail && (
                    <div className="location-detail-sidebar">
                        <div className="sidebar-header-image">
                            <img src="/assets/images/premium_photo-1684175656320-5c3f701c082c (appartemnt).avif" alt="Location" />
                            <button className="close-sidebar-btn" onClick={() => setShowLocationDetail(false)}>
                                <Minus size={20} />
                            </button>
                        </div>

                        <div className="sidebar-content">
                            <h1 className="location-title">{selectedPlace || "Kazani Heights"}</h1>

                            <div className="location-rating-row">
                                <span className="rating-score">4.0</span>
                                <div className="stars">
                                    <Star size={14} fill="#fbbc04" color="#fbbc04" />
                                    <Star size={14} fill="#fbbc04" color="#fbbc04" />
                                    <Star size={14} fill="#fbbc04" color="#fbbc04" />
                                    <Star size={14} fill="#fbbc04" color="#fbbc04" />
                                    <Star size={14} fill="#e6e6e6" color="#e6e6e6" />
                                </div>
                                <span className="rating-count">(126)</span>
                            </div>
                            <div className="location-category">Serviced accommodation</div>

                            <div className="location-tabs">
                                <div
                                    className={`tab-item ${activeTab === 'Overview' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('Overview')}
                                >
                                    Overview
                                </div>
                                <div
                                    className={`tab-item ${activeTab === 'Reviews' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('Reviews')}
                                >
                                    Reviews
                                </div>
                            </div>
                            <hr className="sidebar-divider" style={{ marginTop: 0 }} />

                            {activeTab === 'Overview' ? (
                                <>
                                    {/* Action Buttons */}
                                    <div className="action-buttons-row">
                                        <div className="action-btn-item">
                                            <button className="circle-btn active-btn">
                                                <Navigation size={20} fill="#fff" />
                                            </button>
                                            <span>Directions</span>
                                        </div>
                                        <div className="action-btn-item">
                                            <button className="circle-btn">
                                                <div className="save-icon-placeholder" style={{ border: '2px solid #1a73e8', height: '14px', width: '10px' }}></div>
                                            </button>
                                            <span>Save</span>
                                        </div>
                                        <div className="action-btn-item">
                                            <button className="circle-btn">
                                                <MapIcon size={20} color="#1a73e8" />
                                            </button>
                                            <span>Nearby</span>
                                        </div>
                                        <div className="action-btn-item">
                                            <button className="circle-btn">
                                                <Smartphone size={20} color="#1a73e8" />
                                            </button>
                                            <span>Send to phone</span>
                                        </div>
                                        <div className="action-btn-item">
                                            <button className="circle-btn">
                                                <Share2 size={20} color="#1a73e8" />
                                            </button>
                                            <span>Share</span>
                                        </div>
                                    </div>

                                    <hr className="sidebar-divider" />

                                    {/* Details List */}
                                    <div className="details-list">
                                        <div className="detail-item">
                                            <MapPin size={20} className="detail-icon" />
                                            <span>{selectedPlace || "Kazani Heights"}, Service Road, Islamabad Expy, Block H Extension Islamabad, Pakistan</span>
                                        </div>
                                        <div className="detail-item">
                                            <Globe size={20} className="detail-icon" />
                                            <span>kazaniheights.com</span>
                                        </div>
                                        <div className="detail-item">
                                            <Phone size={20} className="detail-icon" />
                                            <span>+92 317 7709892</span>
                                        </div>
                                        <div className="detail-item">
                                            <Plus size={20} className="detail-icon" />
                                            <span>H548+4C Islamabad, Pakistan</span>
                                        </div>
                                        <div className="detail-item">
                                            <RotateCcw size={20} className="detail-icon" />
                                            <span>Your Maps activity</span>
                                        </div>
                                        <div className="detail-item">
                                            <Tag size={20} className="detail-icon" />
                                            <span>Add a label</span>
                                        </div>
                                    </div>

                                    <hr className="sidebar-divider" />

                                    {/* Photos & Videos Section */}
                                    <div className="section-header">Photos & videos</div>
                                    <div className="photos-scroll-container">
                                        <div className="photo-card" style={{ backgroundImage: 'url(/assets/images/premium_photo-1684175656320-5c3f701c082c (appartemnt).avif)' }}>
                                            <span className="photo-label">All</span>
                                        </div>
                                        <div className="photo-card" style={{ backgroundImage: 'url(/assets/images/placeholder-connect.038828c91304f70020e5.jpg)' }}>
                                            <span className="photo-label">Latest</span>
                                        </div>
                                        <div className="photo-card" style={{ backgroundImage: 'url(/assets/images/premium_photo-1684175656320-5c3f701c082c (appartemnt).avif)' }}>
                                            <span className="photo-label">Videos</span>
                                        </div>
                                        <div className="photo-card view-more-card">
                                            <ChevronRight size={24} color="#1a73e8" />
                                        </div>
                                    </div>
                                    <div className="add-photos-btn-container">
                                        <button className="add-photos-btn">
                                            <Plus size={18} />
                                            <span>Add photos & videos</span>
                                        </button>
                                    </div>

                                    <hr className="sidebar-divider" />

                                    {/* At this place Section */}
                                    <div className="section-header">At this place</div>
                                    <div className="places-list">
                                        <div className="place-item">
                                            <div className="place-info">
                                                <div className="place-name">Barasti Club</div>
                                                <div className="place-rating">
                                                    <span>4.0</span>
                                                    <div className="stars-small">
                                                        <Star size={10} fill="#fbbc04" color="#fbbc04" />
                                                        <Star size={10} fill="#fbbc04" color="#fbbc04" />
                                                        <Star size={10} fill="#fbbc04" color="#fbbc04" />
                                                        <Star size={10} fill="#fbbc04" color="#fbbc04" />
                                                        <Star size={10} fill="#e6e6e6" color="#e6e6e6" />
                                                    </div>
                                                    <span className="rating-count-small">(183)</span>
                                                </div>
                                                <div className="place-type">Fine dining restaurant</div>
                                                <div className="place-hours"><span className="closed-text">Closed</span> · Opens 10 AM</div>
                                            </div>
                                            <div className="place-thumbnail">
                                                <img src="/assets/images/premium_photo-1684175656320-5c3f701c082c (appartemnt).avif" alt="Place" />
                                            </div>
                                        </div>

                                        <div className="place-item">
                                            <div className="place-info">
                                                <div className="place-name">Logics Capital</div>
                                                <div className="place-rating">
                                                    <span>4.4</span>
                                                    <div className="stars-small">
                                                        <Star size={10} fill="#fbbc04" color="#fbbc04" />
                                                        <Star size={10} fill="#fbbc04" color="#fbbc04" />
                                                        <Star size={10} fill="#fbbc04" color="#fbbc04" />
                                                        <Star size={10} fill="#fbbc04" color="#fbbc04" />
                                                        <Star size={10} fill="#fbbc04" color="#fbbc04" />
                                                    </div>
                                                    <span className="rating-count-small">(22)</span>
                                                </div>
                                                <div className="place-type">Website designer</div>
                                                <div className="place-hours"><span className="closed-text">Closed</span> · Opens 10 AM</div>
                                            </div>
                                            <div className="place-thumbnail">
                                                <img src="/assets/images/placeholder-connect.038828c91304f70020e5.jpg" alt="Place" />
                                            </div>
                                        </div>

                                        <div className="place-item">
                                            <div className="place-info">
                                                <div className="place-name">Pds Inc</div>
                                                <div className="place-rating">
                                                    <span>5.0</span>
                                                    <div className="stars-small">
                                                        <Star size={10} fill="#fbbc04" color="#fbbc04" />
                                                        <Star size={10} fill="#fbbc04" color="#fbbc04" />
                                                        <Star size={10} fill="#fbbc04" color="#fbbc04" />
                                                        <Star size={10} fill="#fbbc04" color="#fbbc04" />
                                                        <Star size={10} fill="#fbbc04" color="#fbbc04" />
                                                    </div>
                                                    <span className="rating-count-small">(17)</span>
                                                </div>
                                                <div className="place-type">Logistics service</div>
                                                <div className="place-hours"><span className="closed-text">Closed</span> · Opens 5 PM</div>
                                            </div>
                                            <div className="place-thumbnail">
                                                <img src="/assets/images/premium_photo-1684175656320-5c3f701c082c (appartemnt).avif" alt="Place" />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="reviews-section">
                                    <div className="rating-breakdown-container">
                                        <div className="rating-left-col">
                                            {[5, 4, 3, 2, 1].map((num) => (
                                                <div className="rating-bar-row" key={num}>
                                                    <span className="rating-num">{num}</span>
                                                    <div className="rating-bar-bg">
                                                        <div
                                                            className="rating-bar-fill"
                                                            style={{ width: num === 5 ? '80%' : num === 4 ? '40%' : num === 3 ? '10%' : num === 1 ? '30%' : '5%' }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="rating-right-col">
                                            <div className="big-rating">4.0</div>
                                            <div className="stars">
                                                <Star size={16} fill="#fbbc04" color="#fbbc04" />
                                                <Star size={16} fill="#fbbc04" color="#fbbc04" />
                                                <Star size={16} fill="#fbbc04" color="#fbbc04" />
                                                <Star size={16} fill="#fbbc04" color="#fbbc04" />
                                                <Star size={16} fill="#e6e6e6" color="#e6e6e6" />
                                            </div>
                                            <div className="rating-count-text">126 reviews</div>
                                        </div>
                                    </div>

                                    <div className="write-review-container">
                                        <button className="write-review-btn">
                                            <Edit2 size={16} style={{ marginRight: '8px' }} />
                                            Write a review
                                        </button>
                                    </div>

                                    <div className="review-keywords">
                                        <div className="keyword-chip active">All</div>
                                        <div className="keyword-chip">Newest</div>
                                        <div className="keyword-chip">Oldest</div>
                                    </div>

                                    <div className="reviews-list">
                                        {[
                                            {
                                                name: "Nishat Saleem",
                                                reviews: "1 review",
                                                date: "Edited 2 months ago",
                                                rating: 1,
                                                text: "Not recommended for families or female residents.\n\nMy experience living in this building has been extremely disappointing and ...",
                                                img: "/assets/images/placeholder-connect.038828c91304f70020e5.jpg"
                                            },
                                            {
                                                name: "John Doe",
                                                reviews: "5 reviews",
                                                date: "1 week ago",
                                                rating: 5,
                                                text: "Great place to stay! The view is amazing and the amenities are top notch. Highly recommended for short stays.",
                                                img: "/assets/images/premium_photo-1684175656320-5c3f701c082c (appartemnt).avif"
                                            },
                                            {
                                                name: "Sarah Smith",
                                                reviews: "12 reviews",
                                                date: "3 weeks ago",
                                                rating: 4,
                                                text: "Good location, close to everything. The tracking service was a bit slow but overall a pleasant experience.",
                                                img: "/assets/images/placeholder-connect.038828c91304f70020e5.jpg"
                                            },
                                            {
                                                name: "Ali Khan",
                                                reviews: "3 reviews",
                                                date: "1 month ago",
                                                rating: 3,
                                                text: "Decent apartments but the pricing is on the higher side. Access to the main road is convenient though.",
                                                img: "/assets/images/premium_photo-1684175656320-5c3f701c082c (appartemnt).avif"
                                            },
                                            {
                                                name: "Maria Rodriguez",
                                                reviews: "8 reviews",
                                                date: "2 months ago",
                                                rating: 5,
                                                text: "Absolutely loved it! The staff was very helpful and the room was clean and spacious. Will definitely come back.",
                                                img: "/assets/images/placeholder-connect.038828c91304f70020e5.jpg"
                                            }
                                        ].map((review, index) => (
                                            <div className="review-card" key={index}>
                                                <div className="review-header">
                                                    <img src={review.img} alt="User" className="reviewer-img" />
                                                    <div className="reviewer-info">
                                                        <div className="reviewer-name">{review.name}</div>
                                                        <div className="review-meta">{review.reviews}</div>
                                                    </div>
                                                    <button className="review-menu-btn">
                                                        <div className="dots-icon">⋮</div>
                                                    </button>
                                                </div>
                                                <div className="review-stars-row">
                                                    <div className="stars">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={12}
                                                                fill={i < review.rating ? "#fbbc04" : "#e6e6e6"}
                                                                color={i < review.rating ? "#fbbc04" : "#e6e6e6"}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="review-date">{review.date}</span>
                                                </div>
                                                <div className="review-text">
                                                    {review.text.split('\n').map((line, i) => (
                                                        <React.Fragment key={i}>
                                                            {line}
                                                            {i < review.text.split('\n').length - 1 && <br />}
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Search Bar Overlay - Always on top left */}
                <div className="map-search-container">
                    <div className="search-box-card">

                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search Google Maps"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                        <div className="search-actions">
                            <button className="action-icon-btn">
                                <Search size={20} color="#1a73e8" />
                            </button>
                            <span className="search-divider"></span>
                            <button className="action-icon-btn" onClick={() => {
                                setSearchQuery('');
                                setSelectedPlace(''); // Clear title on X
                                setShowLocationDetail(false);
                            }}>
                                <X size={20} color="#5f6368" />
                            </button>
                        </div>
                    </div>
                </div>



                {/* Map Iframe */}
                <iframe

                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.308894892346!2d73.0479!3d33.6844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df948974419acb%3A0x984357e1632d30f!2sIslamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1709665000000!5m2!1sen!2s"
                    className="map-iframe"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <footer className="footer">
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} RoomEase. All rights reserved.</p>
                </div>
            </footer>
        </div >
    );
};
