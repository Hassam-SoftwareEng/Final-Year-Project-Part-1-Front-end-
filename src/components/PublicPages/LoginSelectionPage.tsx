import { useNavigate } from 'react-router-dom';
import { User, Shield, Home } from "lucide-react";
import "../../styles/PublicPagesCss/LoginSelection.css";

interface LoginSelectionPageProps {
    // Add props if needed
}

export const LoginSelectionPage = ({ }: LoginSelectionPageProps) => {
    const navigate = useNavigate();
    return (
        <div className="login-selection-wrapper">
            <h1 className="selection-title">Select Login Type</h1>

            <div className="cards-container">

                {/* User Card */}
                <div className="role-card user" onClick={() => navigate('/user-login')}>
                    <div className="card-content">
                        <div className="icon-wrapper">
                            <User size={64} />
                        </div>
                        <h3 className="card-role-title">User</h3>
                        <p className="card-desc">Login to find your perfect room</p>
                    </div>
                </div>

                {/* Admin Card */}
                <div className="role-card admin" onClick={() => navigate('/admin-login')}>
                    <div className="card-content">
                        <div className="icon-wrapper">
                            <Shield size={64} />
                        </div>
                        <h3 className="card-role-title">Admin</h3>
                        <p className="card-desc">Manage the platform and users</p>
                    </div>
                </div>

                {/* Property Owner Card */}
                <div className="role-card owner" onClick={() => navigate('/property-owner-login')}>
                    <div className="card-content">
                        <div className="icon-wrapper">
                            <Home size={64} />
                        </div>
                        <h3 className="card-role-title">Owner</h3>
                        <p className="card-desc">List your properties and manage bookings</p>
                    </div>
                </div>

            </div>
        </div>
    );
};
