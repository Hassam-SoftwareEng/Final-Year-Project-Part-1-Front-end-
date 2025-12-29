import { useState } from "react";
import { ArrowLeft, CheckCircle } from 'lucide-react';
import '../styles/ForgotPasswordPage.css';

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
    <div className="login-bg-container">
      <div className="glass-wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Forgot Password</h2>

          {!isSubmitted ? (
            <>
              <p>Enter your email address and we'll send you a link to reset your password.</p>

              <div className="input-field">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                />
                <label>Enter your email</label>
              </div>

              <button type="submit" className="btn-glass">
                Send Reset Link
              </button>
            </>
          ) : (
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                <CheckCircle size={48} className="text-success" color="#2ecc71" />
              </div>
              <h3 style={{ margin: '10px 0', fontSize: '1.2rem', fontWeight: 'bold' }}>Check your email</h3>
              <p>We've sent a password reset link to <strong>{email}</strong></p>
            </div>
          )}

          <div className="register">
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToLogin(); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
              <ArrowLeft size={16} /> Back to Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
