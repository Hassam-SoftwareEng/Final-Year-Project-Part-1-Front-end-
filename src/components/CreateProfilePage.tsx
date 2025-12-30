import React, { useState } from "react";
import "../styles/CreateProfilePage.css";
import "../styles/DashboardPage.css"; // Reuse navbar styles

interface User {
    email: string;
    fullName: string;
}

interface CreateProfilePageProps {
    user: User;
    onNavigateToDashboard: () => void;
    onNavigateToMatches: () => void;
    onNavigateToMessages: () => void;
    onNavigateToAnalytics: () => void;
    onLogout: () => void;
}

export const CreateProfilePage: React.FC<CreateProfilePageProps> = ({
    user,
    onNavigateToDashboard,
    onNavigateToMatches,
    onNavigateToMessages,
    onNavigateToAnalytics,
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
            {/* Navbar */}
            <nav className="dashboard-navbar">
                <div className="nav-left">
                    <div className="logo-section">
                        <span className="logo-text">RoomEase</span>
                    </div>
                </div>

                <div className="nav-center">
                    <a
                        href="#"
                        className="nav-link"
                        onClick={(e) => { e.preventDefault(); onNavigateToDashboard(); }}
                    >
                        Home
                    </a>
                    <a
                        href="#"
                        className="nav-link active"
                        onClick={(e) => e.preventDefault()}
                    >
                        Create Profile
                    </a>
                    <a
                        href="#"
                        className="nav-link"
                        onClick={(e) => { e.preventDefault(); onNavigateToMatches(); }}
                    >
                        Match
                    </a>
                    <a href="#" className="nav-link">
                        Map
                    </a>
                    <a href="#" className="nav-link">
                        Listing
                    </a>
                    <a
                        href="#"
                        className="nav-link"
                        onClick={(e) => { e.preventDefault(); onNavigateToMessages(); }}
                    >
                        Message
                    </a>
                    <a
                        href="#"
                        className="nav-link"
                        onClick={(e) => { e.preventDefault(); onNavigateToAnalytics(); }}
                    >
                        Red Flag Alert
                    </a>
                </div>

                <div className="nav-right">
                    <a href="#" className="nav-link" style={{ marginRight: '20px' }}>
                        Setting
                    </a>
                    <button className="logout-btn" onClick={onLogout}>
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content - Merged Figma Code */}
            <div className="profile-container">
                <div className="profile-card">
                    {/* Replaced 'App-title' with 'Edit Profile' context or keep User's choice. 
                        User code had 'RoomEase' title. Since we have navbar, maybe change to 'Build Your Profile' 
                        or keep consistent title. Let's keep it clean. */}


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
                                ${formData.budgetRange * 10} - ${(formData.budgetRange * 10) + 500}
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
    );
};
