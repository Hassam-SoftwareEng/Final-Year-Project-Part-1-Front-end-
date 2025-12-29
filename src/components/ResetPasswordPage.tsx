import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import '../styles/ResetPasswordPage.css';

interface Props {
  email: string;
  onResetPassword: (password: string) => void;
  onNavigateToLogin?: () => void;
}

export function ResetPasswordPage({ email, onResetPassword, onNavigateToLogin }: Props) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    onResetPassword(password);
  };

  return (
    <div className="login-bg-container">
      <div className="glass-wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Reset Password</h2>
          <p style={{ fontSize: '0.9rem', marginBottom: '20px' }}>Set a new password for <strong>{email}</strong></p>

          {error && <div className="alert alert-danger" style={{ background: 'rgba(220, 53, 69, 0.8)', color: 'white', border: 'none', fontSize: '0.9rem', marginBottom: '15px', padding: '10px', borderRadius: '4px' }}>{error}</div>}

          <div className="input-field">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
            />
            <label>New Password</label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle-btn"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="input-field">
            <input
              type={showConfirm ? "text" : "password"}
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder=" "
            />
            <label>Confirm Password</label>
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="password-toggle-btn"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button type="submit" className="btn-glass">
            Update Password
          </button>

          {onNavigateToLogin && (
            <div className="register">
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToLogin(); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                <ArrowLeft size={16} /> Back to Login
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
