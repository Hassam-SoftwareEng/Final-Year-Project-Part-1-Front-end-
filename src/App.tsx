import { useState } from "react";
import { LandingPage } from "./components/Landingpage";
import DashboardPage from "./components/DashboardPage";
import { AnalyticsReportPage } from "./components/AnalyticsReportPage";
import { LoginPage } from "./components/LoginPage";
import { LoginSelectionPage } from "./components/LoginSelectionPage";
import { SignupPage } from "./components/SignupPage";
import { ForgotPasswordPage } from "./components/ForgotPasswordPage";
import { ResetPasswordPage } from "./components/ResetPasswordPage";
import { MatchesPages } from "./components/MatchesPages";

type Page =
  | "landing"
  | "login-selection"
  | "login"
  | "signup"
  | "forgot-password"
  | "reset-password"
  | "dashboard"
  | "analytics-report"
  | "matches";






interface User {
  email: string;
  fullName: string;
}

interface Account {
  email: string;
  fullName: string;
  password: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [user, setUser] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [resetEmail, setResetEmail] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRole, setSelectedRole] = useState<'admin' | 'user' | 'property-owner'>('user');

  /* =========================
     LOGIN
  ========================== */
  const handleLoginSuccess = (email: string, password: string) => {
    const account = accounts.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (!account) {
      alert("Invalid email or password");
      return;
    }

    setUser({ email: account.email, fullName: account.fullName });
    setCurrentPage("dashboard");
  };

  /* =========================
     SIGNUP
  ========================== */
  const handleSignupSuccess = (data: Account) => {
    const exists = accounts.some((acc) => acc.email === data.email);

    if (exists) {
      alert("Account already exists with this email");
      return;
    }

    setAccounts((prev) => [...prev, data]);
    alert("Account created successfully! Please login.");
    setCurrentPage("login-selection");
  };

  /* =========================
     FORGOT PASSWORD
  ========================== */
  const handleForgotPassword = (email: string) => {
    const exists = accounts.some((acc) => acc.email === email);

    if (!exists) {
      alert("No account found with this email");
      return;
    }

    setResetEmail(email);
    setCurrentPage("reset-password");
  };

  /* =========================
     RESET PASSWORD
  ========================== */
  const handleResetPassword = (newPassword: string) => {
    if (!resetEmail) return;

    setAccounts((prev) =>
      prev.map((acc) =>
        acc.email === resetEmail
          ? { ...acc, password: newPassword }
          : acc
      )
    );

    alert("Password reset successful! Please login.");
    setResetEmail(null);
    setCurrentPage("login-selection");
  };

  /* =========================
     LOGOUT
  ========================== */
  const handleLogout = () => {
    setUser(null);
    setCurrentPage("landing");
  };

  return (
    <>
      {currentPage === "landing" && (
        <LandingPage
          onNavigateToLogin={() => setCurrentPage("login-selection")}
          onNavigateToSignup={() => setCurrentPage("signup")}
        />
      )}

      {currentPage === "login-selection" && (
        <LoginSelectionPage
          onBack={() => setCurrentPage("landing")}
          onSelectRole={(role) => {
            setSelectedRole(role);
            setCurrentPage("login");
          }}
        />
      )}

      {currentPage === "login" && (
        <LoginPage
          role={selectedRole}
          onBack={() => setCurrentPage("login-selection")}
          onNavigateToSignup={() => setCurrentPage("signup")}
          onNavigateToForgotPassword={() =>
            setCurrentPage("forgot-password")
          }
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {currentPage === "signup" && (
        <SignupPage
          onNavigateToLogin={() => setCurrentPage("login")}
          onSignupSuccess={handleSignupSuccess}
          onBack={() => setCurrentPage("login")}
        />
      )}

      {currentPage === "forgot-password" && (
        <ForgotPasswordPage
          onSubmitEmail={handleForgotPassword}
          onNavigateToLogin={() => setCurrentPage("login")}
        />
      )}

      {currentPage === "reset-password" && resetEmail && (
        <ResetPasswordPage
          email={resetEmail}
          onResetPassword={handleResetPassword}
          onNavigateToLogin={() => setCurrentPage("login")}
        />
      )}

      {currentPage === "dashboard" && user && (
        <DashboardPage
          user={user}
          onLogout={handleLogout}
          onNavigateToAnalytics={() => setCurrentPage("analytics-report")}
          onNavigateToMatches={() => setCurrentPage("matches")}
        />
      )}

      {currentPage === "analytics-report" && user && (
        <AnalyticsReportPage
          user={user}
          onLogout={handleLogout}
          onNavigateToDashboard={() => setCurrentPage("dashboard")}
        />
      )}

      {currentPage === "matches" && user && (
        <MatchesPages
          user={user}
          onLogout={handleLogout}
          onNavigateToDashboard={() => setCurrentPage("dashboard")}
        />
      )}
    </>
  );
}
