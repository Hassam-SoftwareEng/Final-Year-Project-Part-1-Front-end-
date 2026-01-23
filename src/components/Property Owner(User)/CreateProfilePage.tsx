import React, { useState } from "react";
import { Bell, Home } from 'lucide-react';
import "../../styles/Property Owner(User)/CreateProfilePage.css";

interface User {
    email: string;
    fullName: string;
}

interface CreateProfilePageProps {
    user: User;
    onNavigateToDashboard: () => void;
    onNavigateToMatches?: () => void;
    onNavigateToMessages?: () => void;
    onNavigateToSetting: () => void;
    onNavigateToRedFlagAlert: () => void;
    onNavigateToMap: () => void;
    onNavigateToListing: () => void;
    onNavigateToNotification?: () => void;
    onNavigateToHome?: () => void;
    onLogout: () => void;
}

export const CreateProfilePage: React.FC<CreateProfilePageProps> = ({
    user,
    onNavigateToDashboard,
    onNavigateToListing,
    onNavigateToNotification,
    onNavigateToMap,
    onNavigateToSetting,
    onNavigateToRedFlagAlert,
    onNavigateToHome,
    onLogout
}) => {
    // Form State from Figma Code
    const [formData, setFormData] = useState({
        profilePhoto: null as File | null,
        fullName: user.fullName || '', // Pre-fill from props
        age: '',
        occupation: '',
        cleanliness: 'moderate',
        sleepSchedule: 'flexible',
        smoking: 'no',
        budgetRange: 50,
        city: '',
        preferredArea: ''
    });

    const [photoPreview, setPhotoPreview] = useState<string>(
        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=0D8ABC&color=fff&size=128`
    );
    const handleHomeNavigation = onNavigateToHome || onNavigateToDashboard;

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, profilePhoto: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveProfile = () => {
        console.log('Saving profile...', formData);
        alert('Profile saved successfully!');
        // Navigate after save
        onNavigateToDashboard();
    };

    return (
        <div className="dashboard-container create-profile-page">
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
            <div className="profile-container">
                <div className="profile-content-wrapper">
                    <div className="create-profile-header" style={{ marginBottom: '24px', textAlign: 'left' }}>
                        <h1 className="create-profile-title">Create Profile</h1>
                        <p className="create-profile-subtitle">Set up your profile to find the best roommate matches.</p>
                    </div>

                    <div className="profile-card">
                        {/* Top Section - Profile Photo */}
                        <div className="profile-photo-section">
                            <div className="photo-placeholder">
                                {photoPreview ? (
                                    <img src={photoPreview} alt="Profile" className="profile-photo" />
                                ) : (
                                    <div className="photo-empty">
                                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                id="photo-upload"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                className="file-input"
                            />
                            <label htmlFor="photo-upload" className="upload-button">
                                Change Photo
                            </label>
                        </div>

                        {/* Personal Details Section */}
                        <section className="form-section">
                            <h2 className="section-heading">Personal Details</h2>
                            <div className="profile-input-group">
                                <label htmlFor="fullName" className="input-label">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div className="profile-input-group">
                                <label htmlFor="age" className="input-label">Age</label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="Enter your age"
                                    min="18"
                                />
                            </div>
                            <div className="profile-input-group">
                                <label htmlFor="occupation" className="input-label">Occupation</label>
                                <input
                                    type="text"
                                    id="occupation"
                                    name="occupation"
                                    value={formData.occupation}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="Enter your occupation"
                                />
                            </div>
                        </section>

                        {/* Lifestyle Preferences Section */}
                        <section className="form-section">
                            <h2 className="section-heading">Lifestyle Preferences</h2>
                            <div className="profile-input-group">
                                <label htmlFor="cleanliness" className="input-label">Cleanliness Level</label>
                                <select
                                    id="cleanliness"
                                    name="cleanliness"
                                    value={formData.cleanliness}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value="very-clean">Very Clean</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="casual">Casual</option>
                                </select>
                            </div>
                            <div className="profile-input-group">
                                <label htmlFor="sleepSchedule" className="input-label">Sleep Schedule</label>
                                <select
                                    id="sleepSchedule"
                                    name="sleepSchedule"
                                    value={formData.sleepSchedule}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value="early-sleeper">Early Sleeper</option>
                                    <option value="night-owl">Night Owl</option>
                                    <option value="flexible">Flexible</option>
                                </select>
                            </div>
                            <div className="profile-input-group">
                                <label className="input-label">Smoking Preference</label>
                                <div className="radio-group">
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="smoking"
                                            value="yes"
                                            checked={formData.smoking === 'yes'}
                                            onChange={handleInputChange}
                                            className="radio-input"
                                        />
                                        <span>Yes</span>
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="smoking"
                                            value="no"
                                            checked={formData.smoking === 'no'}
                                            onChange={handleInputChange}
                                            className="radio-input"
                                        />
                                        <span>No</span>
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="smoking"
                                            value="occasionally"
                                            checked={formData.smoking === 'occasionally'}
                                            onChange={handleInputChange}
                                            className="radio-input"
                                        />
                                        <span>Occasionally</span>
                                    </label>
                                </div>
                            </div>
                        </section>

                        {/* Budget Range Section */}
                        <section className="form-section">
                            <h2 className="section-heading">Budget Range</h2>
                            <div className="input-group">
                                <label htmlFor="budgetRange" className="input-label">Monthly Budget</label>
                                <input
                                    type="range"
                                    id="budgetRange"
                                    name="budgetRange"
                                    min="0"
                                    max="100"
                                    value={formData.budgetRange}
                                    onChange={handleInputChange}
                                    className="range-slider"
                                />
                                <div className="budget-display">
                                    PKR {formData.budgetRange * 10} - PKR {(formData.budgetRange * 10) + 500}
                                </div>
                            </div>
                        </section>

                        {/* Location Preference Section */}
                        <section className="form-section">
                            <h2 className="section-heading">Location Preference</h2>
                            <div className="input-group">
                                <label htmlFor="city" className="input-label">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="Enter city"
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="preferredArea" className="input-label">Preferred Area / Locality</label>
                                <input
                                    type="text"
                                    id="preferredArea"
                                    name="preferredArea"
                                    value={formData.preferredArea}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="Enter preferred area or locality"
                                />
                            </div>
                        </section>

                        {/* Bottom Section - Action Buttons */}
                        <div className="button-group">
                            <button onClick={handleSaveProfile} className="btn btn-primary">
                                Upload Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer">
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} RoomEase. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};
