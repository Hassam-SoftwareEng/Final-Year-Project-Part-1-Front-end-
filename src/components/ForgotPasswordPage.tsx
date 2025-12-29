import { useState } from "react";
import { ArrowLeft, CheckCircle } from 'lucide-react';
import '../styles/LoginSelectionPage.css';
import '../styles/login.css';

interface Props {
  onSubmitEmail: (email: string) => void;
  onNavigateToLogin: () => void;
}

export function ForgotPasswordPage({ onSubmitEmail, onNavigateToLogin }: Props) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitEmail(email);
    setIsSubmitted(true);
  };

  return (
    <div className="login-selection-bg">
      <div className="glass-wrapper" style={{ maxWidth: '480px' }}>
        <form onSubmit={handleSubmit}>

          {!isSubmitted ? (
            <>
              <div className="login-header">
                <h2>Forgot Password</h2>
                <p className="subtitle" style={{ color: '#000' }}>Enter your email address and we'll send you a link to reset your password.</p>
              </div>

              <div className="input-group-custom">
                <label htmlFor="email" style={{ color: '#374151' }}>Enter your email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="custom-input"
                  style={{ color: '#000' }}
                />
              </div>

              <button type="submit" className="btn-option" style={{ marginTop: '20px' }}>
                Send Reset Link
              </button>
            </>
          ) : (
            <div style={{ textAlign: 'center', margin: '20px 0', color: '#000' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                <CheckCircle size={48} className="text-success" color="#2ecc71" />
              </div>
              <h3 style={{ margin: '10px 0', fontSize: '1.2rem', fontWeight: 'bold', color: '#000' }}>Check your email</h3>
              <p style={{ color: '#333' }}>We've sent a password reset link to <strong>{email}</strong></p>
            </div>
          )}

          <div className="register-link">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigateToLogin(); }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', textDecoration: 'none', color: '#333' }}
            >
              <ArrowLeft size={16} /> <span style={{ textDecoration: 'underline' }}>Back to Login</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
