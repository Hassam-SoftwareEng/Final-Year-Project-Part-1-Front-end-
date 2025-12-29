import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import '../styles/login.css';

interface LoginPageProps {
  role?: 'admin' | 'user' | 'property-owner';
  onLoginSuccess?: (email: string, password: string) => void;
  onNavigateToSignup?: () => void;
  onNavigateToForgotPassword?: () => void;
  onBack?: () => void;
}

export function LoginPage({ role = 'user', onLoginSuccess, onNavigateToSignup, onNavigateToForgotPassword, onBack }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const getTitle = () => {
    switch (role) {
      case 'admin': return 'Admin Login';
      case 'property-owner': return 'Property Owner Login';
      default: return 'Login';
    }
  };

  const getBgClass = () => {
    switch (role) {
      case 'admin': return 'bg-admin';
      case 'property-owner': return 'bg-owner';
      default: return 'bg-user';
    }
  };

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
    <div className={`agent-login-page ${getBgClass()}`}>
      <div className="glass-wrapper">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              color: '#333',
              padding: 0
            }}
          >
            <ArrowLeft size={20} />
            <span style={{ marginLeft: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Back</span>
          </button>
        )}

        <div className="login-header">
          <h2>{getTitle()}</h2>
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
              placeholder="Jonathan_Reichert07"
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
