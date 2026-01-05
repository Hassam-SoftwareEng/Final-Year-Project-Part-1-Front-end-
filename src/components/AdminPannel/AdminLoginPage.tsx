import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import '../../styles/AdminPannel/AdminLogin.css';

interface AdminLoginPageProps {
    onLoginSuccess?: (email: string, password: string) => void;
    onNavigateToSignup?: () => void;
    onNavigateToForgotPassword?: () => void;
    onBack?: () => void;
}

export function AdminLoginPage({ onLoginSuccess, onNavigateToSignup, onNavigateToForgotPassword, onBack }: AdminLoginPageProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        onLoginSuccess?.(email, password);
    };

    return (
        <div className="agent-login-page bg-admin">
            <div className="glass-wrapper">
                {/* Back Button */}
                {onBack && (
                    <button
                        onClick={onBack}
                        className="back-button"
                    >
                        <ArrowLeft size={20} />
                        <span>Back</span>
                    </button>
                )}

                <div className="login-header">
                    <h2>Admin Login</h2>
                    <p className="subtitle">Please enter your details</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && (
                        <div className="alert-error">
                            {error}
                        </div>
                    )}

                    <div className="input-group-custom">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="admin@roomease.com"
                            className="custom-input"
                        />
                    </div>

                    <div className="input-group-custom">
                        <label htmlFor="password">Password</label>
                        <div style={{ position: 'relative', width: '100%' }}>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••••••"
                                className="custom-input"
                                style={{ paddingRight: '50px' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="password-toggle-btn"
                            >
                                {showPassword ? <EyeOff size={18} color="#666" /> : <Eye size={18} color="#666" />}
                            </button>
                        </div>
                    </div>

                    <div className="forgot-password">
                        <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToForgotPassword?.(); }}>
                            Forgot password?
                        </a>
                    </div>

                    <button type="submit" className="btn-dark-pill">
                        Log In
                    </button>
                </form>

                <div className="register-link">
                    <span>Are you new? </span>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        onNavigateToSignup?.();
                    }}>
                        Create an Account
                    </a>
                </div>
            </div>
        </div>
    );
}
