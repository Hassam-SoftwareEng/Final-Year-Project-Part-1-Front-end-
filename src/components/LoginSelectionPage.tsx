import { ArrowLeft } from 'lucide-react';
import '../styles/LoginSelectionPage.css';

interface LoginSelectionPageProps {
    onBack: () => void;
    onSelectRole: (role: 'admin' | 'user' | 'property-owner') => void;
}

export function LoginSelectionPage({ onBack, onSelectRole }: LoginSelectionPageProps) {
    return (
        <div className="login-selection-bg">
            <div className="glass-wrapper" style={{ maxWidth: '400px', padding: '40px' }}>

                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="back-button"
                >
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </button>

                <div className="login-header">
                    <h2>Login Options</h2>
                    <p className="subtitle">Please select your login type</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <button
                        className="btn-option"
                        onClick={() => onSelectRole('admin')}
                    >
                        Admin Login
                    </button>

                    <button
                        className="btn-option"
                        onClick={() => onSelectRole('user')}
                    >
                        User Login
                    </button>

                    <button
                        className="btn-option"
                        onClick={() => onSelectRole('property-owner')}
                    >
                        Property Owner Login
                    </button>
                </div>

            </div>
        </div>
    );
}
