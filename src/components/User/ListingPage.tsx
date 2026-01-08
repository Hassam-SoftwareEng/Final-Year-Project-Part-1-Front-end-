import React, { useState } from 'react';

import '../../styles/User/ListingPage.css';



interface ListingPageProps {
    onLogout: () => void;
    onNavigateToDashboard: () => void;
    onNavigateToMatches: () => void;
    onNavigateToMessages: () => void;
    onNavigateToCreateProfile: () => void;
    onNavigateToSetting: () => void;
    onNavigateToRedFlagAlert: () => void;
    onNavigateToMap: () => void;
    onNavigateToListing: () => void; // Include self for consistency
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
    onNavigateToMatches,
    onNavigateToMessages,
    onNavigateToCreateProfile,
    onNavigateToSetting,
    onNavigateToRedFlagAlert,
    onNavigateToMap,
    onNavigateToListing
}) => {
    // Mock Data based on Screenshot + Local Context
    const [listings] = useState<PropertyListing[]>([
        {
            id: 1,
            title: '1BHK Shraddha Avenue',
            price: 36000,
            priceUnit: 'per month',
            location: 'Goregaon West, Mumbai',
            type: 'Co-Living',
            image: '/assets/images/premium_photo-1684175656320-5c3f701c082c (appartemnt).avif' // Reusing available asset
        },
        {
            id: 2,
            title: '3Sharing bedroom attach bathroom Mohid Heights',
            price: 14000,
            priceUnit: 'per month per head',
            location: 'Andheri West, Mumbai',
            type: 'Co-Living',
            image: '/assets/images/placeholder-connect.038828c91304f70020e5.jpg' // Reusing available asset
        },
        {
            id: 3,
            title: '4Sharing Mohid Heights',
            price: 12000,
            priceUnit: 'per month per head',
            location: 'Andheri West, Mumbai',
            type: 'Co-Living',
            image: '/assets/images/Securemessaging.jpg' // Reusing available asset
        },
        {
            id: 4,
            title: 'Luxury Apartment DHA',
            price: 45000,
            priceUnit: 'per month',
            location: 'DHA Phase 6, Lahore',
            type: 'Entire Flat',
            image: '/assets/images/Messaging.jpg'
        },
        {
            id: 5,
            title: 'Shared Room in Gulberg',
            price: 15000,
            priceUnit: 'per month',
            location: 'Gulberg III, Lahore',
            type: 'Shared Room',
            image: '/assets/images/Securemessaging.jpg'
        }
    ]);

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
            <nav className="listing-navbar">
                <div className="nav-left">
                    <div className="logo-section">
                        <span className="logo-text">RoomEase</span>
                    </div>
                </div>

                <div className="nav-center">
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToDashboard(); }}>
                        Home
                    </a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToCreateProfile(); }}>
                        Create Profile
                    </a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToMatches(); }}>
                        Match
                    </a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToMap(); }}>
                        Map
                    </a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToListing(); }}>
                        Listing
                    </a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToMessages(); }}>
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
                            <option value="co-living">Co-Living</option>
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

                        <button className="clear-filters-btn" onClick={() => setFilters({ propertyType: '', location: '', minPrice: '', maxPrice: '', gender: '' })}>
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
                                        ₹{listing.price} <span className="price-unit">{listing.priceUnit}</span>
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
        </div>
    );
};
