import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../styles/User/UserLogin.css';

interface UserLoginPageProps {
    onLoginSuccess?: (email: string, password: string) => void;
}

export function UserLoginPage({
    onLoginSuccess,
}: UserLoginPageProps) {
    const navigate = useNavigate();

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
        <div className="animated-login-wrapper">
            <div className="box">
                {/* Back Button */}
                <button onClick={() => navigate('/login-selection')} className="absolute-back-btn">
                    <ArrowLeft size={24} color="#14919B" />
                </button>
                <div className="form">
                    <h2>User Login</h2>
                    <p className="subtitle">Please enter your details</p>

                    <form onSubmit={handleSubmit}>
                        {error && <div className="error-msg">{error}</div>}

                        <div className="inputBox">
                            <label>Email</label>
                            <input
                                type="email"
                                required
                                placeholder="user@roomease.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="inputBox">
                            <label>Password</label>
                            <div className="password-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="forgot-password">
                            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/user-forgot-password'); }}>
                                Forgot password?
                            </a>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                            Log In
                        </button>

                        <div className="footer-links">
                            <span>Are you new?</span>
                            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/user-signup', { replace: true }); }}>
                                Create an Account
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
