import React, { useState } from 'react';
import '../../styles/AdminPannel/AdminDashboard.css';
import { CheckCircle } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    status: 'Active' | 'Suspended' | 'Pending';
    role: 'User' | 'Owner';
    joined: string;
    verified: boolean;
}

interface AdminDashboardProps {
    onNavigateToUser: () => void;
    onNavigateToListing: () => void;
    onNavigateToVerification: () => void;
    onNavigateToAnalytics: () => void;
    onNavigateToProfile: () => void;
    onNavigateToSetting: () => void;
    onLogout: () => void;
    user: { fullName: string; email: string } | null;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
    onNavigateToUser,
    onNavigateToListing,
    onNavigateToVerification,
    onNavigateToAnalytics,
    onNavigateToProfile,
    onNavigateToSetting,
    onLogout,
    user
}) => {
    // Mock Data based on Screenshot
    const [users] = useState<User[]>([
        {
            id: 1,
            name: 'Moiz',
            email: 'moiz@email.com',
            avatar: 'https://ui-avatars.com/api/?name=Moiz&background=random',
            status: 'Active',
            role: 'User',
            joined: '2024-11-15',
            verified: true
        },
        {
            id: 2,
            name: 'Talat',
            email: 'talat@gmail.com',
            avatar: 'https://ui-avatars.com/api/?name=Talat&background=random',
            status: 'Suspended',
            role: 'User',
            joined: '2024-11-10',
            verified: false
        },
        {
            id: 3,
            name: 'Hassan',
            email: 'hasssan@email.com',
            avatar: 'https://ui-avatars.com/api/?name=Hassan&background=random',
            status: 'Pending',
            role: 'Owner',
            joined: '2024-11-20',
            verified: false
        },
        {
            id: 4,
            name: 'Huzaifa',
            email: 'Huzaifa@gmail.com',
            avatar: 'https://ui-avatars.com/api/?name=Huzaifa&background=random',
            status: 'Active',
            role: 'User',
            joined: '2024-11-20',
            verified: true
        }
    ]);

    return (
        <div className="admin-dashboard-container">
            {/* Top Navbar - Scoped Class */}
            <nav className="admin-dashboard-navbar">
                <div className="logo-section">
                    <span className="logo-text">RoomEase</span>
                </div>

                <div className="nav-center">
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToUser(); }}>
                        User
                    </a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); console.log('Listing clicked'); onNavigateToListing(); }}>
                        Listing
                    </a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToVerification(); }}>
                        Verification
                    </a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToAnalytics(); }}>
                        Analytics
                    </a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToProfile(); }}>
                        My Profile
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

            {/* Main Content */}
            <div className="admin-content">
                <div className="admin-header">
                    <h1 className="admin-title">Welcome {user?.fullName || 'Admin'}</h1>
                </div>

                <div className="admin-section-header">
                    <h2 className="admin-section-title">User Management</h2>
                    <p className="admin-section-subtitle">Manage and moderate platform users</p>
                </div>

                <div className="user-management-card">




                    <div className="table-container">
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Status</th>
                                    <th>Role</th>
                                    <th>Joined</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            <div className="user-cell">
                                                <img src={user.avatar} alt={user.name} className="user-avatar" />
                                                <div className="user-info">
                                                    <span className="user-name">
                                                        {user.name}
                                                        {user.verified && <CheckCircle className="verified-icon" size={14} />}
                                                    </span>
                                                    <span className="user-email">{user.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`status-badge status-${user.status.toLowerCase()}`}>
                                                {user.status === 'Active' && '● Active'}
                                                {user.status === 'Suspended' && '● Suspended'}
                                                {user.status === 'Pending' && '● Pending'}
                                            </span>
                                        </td>
                                        <td>{user.role}</td>
                                        <td>{user.joined}</td>
                                        <td>
                                            <div className="actions-cell">
                                                <button className="action-btn btn-approve">Approve</button>
                                                <button className="action-btn btn-reject">Reject</button>
                                                <button className="action-btn btn-ban">Ban</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
