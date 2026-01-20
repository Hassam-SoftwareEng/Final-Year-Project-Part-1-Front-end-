import React, { useState } from 'react';
import { Bell, Home } from 'lucide-react';
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
    onNavigateToMap: () => void;
    onNavigateToRedFlagAlert: () => void;
    onNavigateToListing: () => void;
    onNavigateToNotification?: () => void;
}

export const VerificationPage: React.FC<VerificationPageProps> = ({
    onLogout,
    onNavigateToDashboard,
    onNavigateToListing,
    onNavigateToSetting,
    onNavigateToMap,
    onNavigateToRedFlagAlert,
    onNavigateToNotification
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
            < main className="verification-content" >
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
            </main >
            <footer className="footer">
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} RoomEase. All rights reserved.</p>
                </div>
            </footer>
        </div >
    );
};
