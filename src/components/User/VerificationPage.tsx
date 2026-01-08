import React, { useState } from 'react';
import '../../styles/User/VerificationPage.css';

interface User {
    email: string;
    fullName: string;
}

interface VerificationPageProps {
    user: User;
    onLogout: () => void;
    onNavigateToDashboard: () => void;
    onNavigateToMatches: () => void;
    onNavigateToMessages: () => void;
    onNavigateToAnalytics: () => void;
    onNavigateToCreateProfile: () => void;
    onNavigateToSetting: () => void;
    onNavigateToRedFlagAlert: () => void;
    onNavigateToListing: () => void;
}

export const VerificationPage: React.FC<VerificationPageProps> = ({
    onLogout,
    onNavigateToDashboard,
    onNavigateToMatches,
    onNavigateToMessages,
    onNavigateToCreateProfile,
    onNavigateToSetting,
    onNavigateToRedFlagAlert,
    onNavigateToListing
}) => {
    const [idDocument, setIdDocument] = useState<File | null>(null);
    const [addressProof, setAddressProof] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement verification submission logic
        alert('Documents submitted for verification!');
        onNavigateToSetting();
    };

    return (
        <div className="verification-page-container">
            {/* Navbar */}
            <nav className="verification-navbar">
                <div className="nav-left">
                    <div className="logo-section">
                        <span className="logo-text">RoomEase</span>
                    </div>
                </div>

                <div className="nav-center">
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToDashboard(); }}>Home</a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToCreateProfile(); }}>Create Profile</a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToMatches(); }}>Match</a>
                    <a href="#" className="nav-link">Map</a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToListing(); }}>Listing</a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToMessages(); }}>Message</a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToRedFlagAlert(); }}>Red Flag Alert</a>
                </div>

                <div className="nav-right">
                    <a href="#" className="nav-link" style={{ marginRight: '20px' }} onClick={(e) => { e.preventDefault(); onNavigateToSetting(); }}>Setting</a>
                    <button className="logout-btn" onClick={onLogout}>Logout</button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="verification-content">
                <header className="verification-header">
                    <h1 className="verification-title">Verification & Safety</h1>
                    <p className="verification-subtitle">Upload documents to verify your profile and build trust</p>
                </header>

                <section className="verification-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Government Issued ID</label>
                            <p className="form-helper-text">Please upload a clear copy of your passport, driver's license, or national ID.</p>
                            <div className="file-upload-wrapper">
                                <input
                                    type="file"
                                    className="file-input"
                                    onChange={(e) => handleFileChange(e, setIdDocument)}
                                    accept="image/*,.pdf"
                                />
                                <div className="file-upload-placeholder">
                                    {idDocument ? idDocument.name : "Click to upload ID document"}
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Proof of Address</label>
                            <p className="form-helper-text">Upload a utility bill or bank statement dated within the last 3 months.</p>
                            <div className="file-upload-wrapper">
                                <input
                                    type="file"
                                    className="file-input"
                                    onChange={(e) => handleFileChange(e, setAddressProof)}
                                    accept="image/*,.pdf"
                                />
                                <div className="file-upload-placeholder">
                                    {addressProof ? addressProof.name : "Click to upload proof of address"}
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="cancel-btn" onClick={onNavigateToSetting}>Cancel</button>
                            <button type="submit" className="submit-btn">Submit for Verification</button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
};
