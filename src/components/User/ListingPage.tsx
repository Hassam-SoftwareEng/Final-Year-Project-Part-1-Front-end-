import React, { useState } from 'react';

import { Bell, Home } from 'lucide-react';
import '../../styles/User/ListingPage.css';



interface ListingPageProps {
    onLogout: () => void;
    onNavigateToDashboard: () => void;
    onNavigateToSetting: () => void;
    onNavigateToRedFlagAlert: () => void;
    onNavigateToMap: () => void;
    onNavigateToListing: () => void; // Include self for consistency
    onNavigateToNotification?: () => void; // Optional to prevent breaking changes if not passed immediately
}

interface PropertyListing {
    id: number;
    title: string;
    price: number;
    priceUnit: string;
    location: string;
    type: string;
    image: string;
    beds?: number;
    sharing?: boolean;
}

export const ListingPage: React.FC<ListingPageProps> = ({
    onLogout,
    onNavigateToDashboard,

    onNavigateToNotification,
    onNavigateToMap,
    onNavigateToSetting,
    onNavigateToRedFlagAlert
}) => {
    // Mock Data based on Screenshot + Local Context
    const [listings] = useState<PropertyListing[]>([
        {
            id: 1,
            title: '1BHK Shraddha Avenue',
            price: 36000,
            priceUnit: 'per month',
            location: 'F-10 Markaz, Islamabad',
            type: 'Apartment',
            image: '/assets/images/premium_photo-1684175656320-5c3f701c082c (appartemnt).avif' // Reusing available asset
        },
        {
            id: 2,
            title: '3Sharing bedroom attach bathroom Mohid Heights',
            price: 14000,
            priceUnit: 'per month per head',
            location: 'G-11 Markaz, Islamabad',
            type: 'Shared Room',
            image: '/assets/images/placeholder-connect.038828c91304f70020e5.jpg' // Reusing available asset
        },
        {
            id: 3,
            price: 24000,
            title: 'Luxury Apartment in E-11',
            priceUnit: 'per month',
            location: 'E-11, Islamabad',
            type: 'Apartment',
            image: '/assets/images/placeholder-connect.038828c91304f70020e5.jpg'
        }
    ]);
    // Start of Component Logic
    const [filters, setFilters] = useState({
        propertyType: '',
        location: '',
        minPrice: '',
        maxPrice: '',
        gender: ''
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="listing-page-container">
            {/* Navbar */}
            {/* Navbar - Standardized */}
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
                                    className="nav-link fw-medium active"
                                    aria-current="page"
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); }}
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

            <main className="listing-content">
                {/* Page Header */}
                <div className="listing-header" style={{ padding: '0 32px', marginBottom: '20px' }}>
                    <h1 className="listing-title">Your Listing</h1>
                    <p className="listing-subtitle">Find your perfect space from our curated list.</p>
                </div>

                {/* Filter Section - Pinkish background per screenshot */}
                <div className="filter-section">
                    <div className="filter-bar">
                        <select
                            name="propertyType"
                            className="filter-input filter-select"
                            value={filters.propertyType}
                            onChange={handleFilterChange}
                        >
                            <option value="">Property Type</option>
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>

                        </select>

                        <div className="filter-input-wrapper">
                            <input
                                type="text"
                                name="location"
                                placeholder="Search Location..."
                                className="filter-input"
                                value={filters.location}
                                onChange={handleFilterChange}
                            />
                        </div>

                        <input
                            type="number"
                            name="minPrice"
                            placeholder="Min Price"
                            className="filter-input"
                            value={filters.minPrice}
                            onChange={handleFilterChange}
                        />

                        <input
                            type="number"
                            name="maxPrice"
                            placeholder="Max Price"
                            className="filter-input"
                            value={filters.maxPrice}
                            onChange={handleFilterChange}
                        />

                        <select
                            name="gender"
                            className="filter-input filter-select"
                            value={filters.gender}
                            onChange={handleFilterChange}
                        >
                            <option value="">Gender Preference</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="any">Any</option>
                        </select>

                        <button className="btn btn-secondary" style={{ padding: '0.5rem 1.2rem', whiteSpace: 'nowrap' }} onClick={() => setFilters({ propertyType: '', location: '', minPrice: '', maxPrice: '', gender: '' })}>
                            Clear Filters
                        </button>
                    </div>
                </div>

                {/* Listings Grid */}
                <div className="listings-grid-container">
                    <div className="listings-grid">
                        {listings.map(listing => (
                            <div key={listing.id} className="listing-card">
                                <div className="listing-image-container">
                                    <img src={listing.image} alt={listing.title} className="listing-card-image" />
                                </div>
                                <div className="listing-card-body">
                                    <h3 className="listing-card-title">{listing.title}</h3>
                                    <div className="listing-card-price">
                                        PKR {listing.price} <span className="price-unit">{listing.priceUnit}</span>
                                    </div>
                                    <div className="listing-card-location">
                                        {listing.location}
                                    </div>
                                    <div className="listing-card-type">
                                        {listing.type}
                                    </div>
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
};
