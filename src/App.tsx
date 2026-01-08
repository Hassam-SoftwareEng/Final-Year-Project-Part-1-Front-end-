import { useState } from "react";
import { LandingPage } from "./components/PublicPages/Landingpage";
import DashboardPage from "./components/User/DashboardPage";
import { AnalyticsReportPage } from "./components/User/AnalyticsReportPage";
import { ResetPasswordPage } from "./components/PublicPages/ResetPasswordPage";
import { LoginSelectionPage } from "./components/PublicPages/LoginSelectionPage";
import { MatchesPages } from "./components/User/MatchesPages";
import { MessagePage } from "./components/User/MessagePage";
import { CreateProfilePage } from "./components/User/CreateProfilePage";
import { Setting } from "./components/User/Setting";
import { VerificationPage } from "./components/User/VerificationPage";
import { RedFlagAlert } from "./components/User/RedFlagAlert";
import { AdminDashboard } from "./components/AdminPannel/AdminDashboard";
import { ListingManage } from "./components/AdminPannel/ListingManage";
import { VerificationPage as AdminVerificationPage } from "./components/AdminPannel/VerificationPage";
import { AnalyticsPage } from "./components/AdminPannel/AnalyticsPage";
import { AdminLoginPage } from "./components/AdminPannel/AdminLoginPage";
import { AdminSignupPage } from "./components/AdminPannel/AdminSignupPage";
import { AdminForgotPasswordPage } from "./components/AdminPannel/AdminForgotPasswordPage";
import { UserLoginPage } from "./components/User/UserLoginPage";
import { UserSignupPage } from "./components/User/UserSignupPage";
import { UserForgotPasswordPage } from "./components/User/UserForgotPasswordPage";
import { PropertyOwnerLoginPage } from "./components/PropertyOwner/PropertyOwnerLoginPage";
import { PropertyOwnerSignupPage } from "./components/PropertyOwner/PropertyOwnerSignupPage";
import { PropertyOwnerForgotPasswordPage } from "./components/PropertyOwner/PropertyOwnerForgotPasswordPage";
import { MapPage } from "./components/User/MapPage";


type Page =
  | "landing"
  | "login-selection"
  | "create-profile"
  | "reset-password"
  | "dashboard"
  | "analytics-report"
  | "matches"
  | "messages"
  | "map"
  | "setting"
  | "verification"
  | "red-flag-alert"
  | "admin-dashboard"
  | "listing-manage"
  | "verification-manage"
  | "admin-dashboard"
  | "listing-manage"
  | "verification-manage"
  | "admin-analytics"
  | "admin-login"
  | "admin-signup"
  | "admin-forgot-password"
  | "user-login"
  | "user-signup"
  | "user-forgot-password"
  | "property-owner-login"
  | "property-owner-signup"
  | "property-owner-forgot-password";






interface User {
  email: string;
  fullName: string;
}

interface Account {
  email: string;
  fullName: string;
  password: string;
}

console.log("APP VERSION CHECK: v2 - LISTING ROUTE ENABLED");

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

    if (selectedRole === 'admin') {
      setCurrentPage("admin-dashboard");
    } else {
      setCurrentPage("dashboard");
    }
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

  /* =========================
     ADMIN AUTH HANDLERS
  ========================== */
  const handleAdminLogin = (email: string, password: string) => {
    const account = accounts.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (!account) {
      alert("Invalid email or password");
      return;
    }

    setUser({ email: account.email, fullName: account.fullName });
    setCurrentPage("admin-dashboard");
  };

  const handleAdminSignup = (data: Account) => {
    setAccounts((prev) => [...prev, data]);
    alert("Admin account created successfully! Please login.");
    setCurrentPage("admin-login");
  };

  /* =========================
     PROPERTY OWNER AUTH HANDLERS
  ========================== */
  const handleOwnerLogin = (email: string, password: string) => {
    const account = accounts.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (!account) {
      alert("Invalid email or password");
      return;
    }

    setUser({ email: account.email, fullName: account.fullName });
    // Redirect to Dashboard for now (shared with User), or create new OwnerDashboard later
    setCurrentPage("dashboard");
  };

  const handleOwnerSignup = (data: Account) => {
    setAccounts((prev) => [...prev, data]);
    alert("Property Owner account created successfully! Please login.");
    setCurrentPage("property-owner-login");
  };

  return (
    <>
      {currentPage === "landing" && (
        <LandingPage
          onNavigateToLogin={() => setCurrentPage("login-selection")}
        />
      )}

      {currentPage === "login-selection" && (
        <LoginSelectionPage
          onBack={() => setCurrentPage("landing")}
          onSelectRole={(role: 'admin' | 'user' | 'property-owner') => {
            setSelectedRole(role);
            if (role === 'admin') {
              setCurrentPage("admin-login");
            } else if (role === 'user') {
              setCurrentPage("user-login");
            } else if (role === 'property-owner') {
              setCurrentPage("property-owner-login");
            } else {
              // Default fallback
              setCurrentPage("login-selection");
            }
          }}
        />
      )}

      {/* ADMIN AUTH ROUTES */}
      {currentPage === "admin-login" && (
        <AdminLoginPage
          onLoginSuccess={handleAdminLogin}
          onNavigateToSignup={() => setCurrentPage("admin-signup")}
          onNavigateToForgotPassword={() => setCurrentPage("admin-forgot-password")}
          onBack={() => setCurrentPage("landing")}
        />
      )}

      {currentPage === "admin-signup" && (
        <AdminSignupPage
          onNavigateToLogin={() => setCurrentPage("admin-login")}
          onSignupSuccess={handleAdminSignup}
          onBack={() => setCurrentPage("admin-login")}
        />
      )}

      {currentPage === "admin-forgot-password" && (
        <AdminForgotPasswordPage
          onSubmitEmail={(email) => console.log("Admin forgot password:", email)}
          onNavigateToLogin={() => setCurrentPage("admin-login")}
        />
      )}

      {/* USER AUTH ROUTES */}
      {currentPage === "user-login" && (
        <UserLoginPage
          onLoginSuccess={handleLoginSuccess}
          onNavigateToSignup={() => setCurrentPage("user-signup")}
          onNavigateToForgotPassword={() => setCurrentPage("user-forgot-password")}
          onBack={() => setCurrentPage("login-selection")}
        />
      )}

      {currentPage === "user-signup" && (
        <UserSignupPage
          onNavigateToLogin={() => setCurrentPage("user-login")}
          onSignupSuccess={handleSignupSuccess}
          onBack={() => setCurrentPage("user-login")}
        />
      )}

      {currentPage === "user-forgot-password" && (
        <UserForgotPasswordPage
          onSubmitEmail={handleForgotPassword}
          onNavigateToLogin={() => setCurrentPage("user-login")}
        />
      )}

      {/* PROPERTY OWNER AUTH ROUTES */}
      {currentPage === "property-owner-login" && (
        <PropertyOwnerLoginPage
          onLoginSuccess={handleOwnerLogin}
          onNavigateToSignup={() => setCurrentPage("property-owner-signup")}
          onNavigateToForgotPassword={() => setCurrentPage("property-owner-forgot-password")}
          onBack={() => setCurrentPage("login-selection")}
        />
      )}

      {currentPage === "property-owner-signup" && (
        <PropertyOwnerSignupPage
          onNavigateToLogin={() => setCurrentPage("property-owner-login")}
          onSignupSuccess={handleOwnerSignup}
          onBack={() => setCurrentPage("property-owner-login")}
        />
      )}

      {currentPage === "property-owner-forgot-password" && (
        <PropertyOwnerForgotPasswordPage
          onSubmitEmail={(email) => console.log("Owner forgot password:", email)}
          onNavigateToLogin={() => setCurrentPage("property-owner-login")}
        />
      )}

      {currentPage === "reset-password" && resetEmail && (
        <ResetPasswordPage
          email={resetEmail}
          onResetPassword={handleResetPassword}
          onNavigateToLogin={() => setCurrentPage("login-selection")}
        />
      )}


      {currentPage === "dashboard" && user && (
        <DashboardPage
          user={user}
          onLogout={handleLogout}
          onNavigateToAnalytics={() => setCurrentPage("analytics-report")}
          onNavigateToMatches={() => setCurrentPage("matches")}
          onNavigateToMessages={() => setCurrentPage("messages")}
          onNavigateToCreateProfile={() => setCurrentPage("create-profile")}
          onNavigateToSetting={() => setCurrentPage("setting")}
          onNavigateToRedFlagAlert={() => setCurrentPage("red-flag-alert")}
          onNavigateToMap={() => setCurrentPage("map")}
        />
      )}

      {currentPage === "create-profile" && user && (
        <CreateProfilePage
          user={user}
          onLogout={handleLogout}
          onNavigateToDashboard={() => setCurrentPage("dashboard")}
          onNavigateToMatches={() => setCurrentPage("matches")}
          onNavigateToMessages={() => setCurrentPage("messages")}
          onNavigateToSetting={() => setCurrentPage("setting")}
          onNavigateToRedFlagAlert={() => setCurrentPage("red-flag-alert")}
          onNavigateToMap={() => setCurrentPage("map")}
        />
      )}

      {currentPage === "analytics-report" && user && (
        <AnalyticsReportPage
          user={user}
          onLogout={handleLogout}
          onNavigateToDashboard={() => setCurrentPage("dashboard")}
          onNavigateToMessages={() => setCurrentPage("messages")}
          onNavigateToCreateProfile={() => setCurrentPage("create-profile")}
          onNavigateToSetting={() => setCurrentPage("setting")}
          onNavigateToRedFlagAlert={() => setCurrentPage("red-flag-alert")}
        />
      )}

      {currentPage === "matches" && user && (
        <MatchesPages
          user={user}
          onLogout={handleLogout}
          onNavigateToDashboard={() => setCurrentPage("dashboard")}
          onNavigateToMessages={() => setCurrentPage("messages")}
          onNavigateToCreateProfile={() => setCurrentPage("create-profile")}
          onNavigateToSetting={() => setCurrentPage("setting")}
          onNavigateToRedFlagAlert={() => setCurrentPage("red-flag-alert")}
          onNavigateToMap={() => setCurrentPage("map")}
        />
      )}

      {currentPage === "messages" && user && (
        <MessagePage
          user={user}
          onLogout={handleLogout}
          onNavigateToDashboard={() => setCurrentPage("dashboard")}
          onNavigateToMatches={() => setCurrentPage("matches")}
          onNavigateToAnalytics={() => setCurrentPage("analytics-report")}
          onNavigateToCreateProfile={() => setCurrentPage("create-profile")}
          onNavigateToSetting={() => setCurrentPage("setting")}
          onNavigateToRedFlagAlert={() => setCurrentPage("red-flag-alert")}
          onNavigateToMap={() => setCurrentPage("map")}
        />
      )}

      {currentPage === "setting" && user && (
        <Setting
          user={user}
          onLogout={handleLogout}
          onNavigateToDashboard={() => setCurrentPage("dashboard")}
          onNavigateToMatches={() => setCurrentPage("matches")}
          onNavigateToMessages={() => setCurrentPage("messages")}
          onNavigateToAnalytics={() => setCurrentPage("analytics-report")}
          onNavigateToCreateProfile={() => setCurrentPage("create-profile")}
          onNavigateToVerification={() => setCurrentPage("verification")}
          onNavigateToRedFlagAlert={() => setCurrentPage("red-flag-alert")}
          onNavigateToMap={() => setCurrentPage("map")}
        />
      )}

      {currentPage === "verification" && user && (
        <VerificationPage
          user={user}
          onLogout={handleLogout}
          onNavigateToDashboard={() => setCurrentPage("dashboard")}
          onNavigateToMatches={() => setCurrentPage("matches")}
          onNavigateToMessages={() => setCurrentPage("messages")}
          onNavigateToAnalytics={() => setCurrentPage("analytics-report")}
          onNavigateToCreateProfile={() => setCurrentPage("create-profile")}
          onNavigateToSetting={() => setCurrentPage("setting")}
          onNavigateToRedFlagAlert={() => setCurrentPage("red-flag-alert")}
        />
      )}

      {currentPage === "red-flag-alert" && user && (
        <RedFlagAlert
          user={user}
          onLogout={handleLogout}
          onNavigateToDashboard={() => setCurrentPage("dashboard")}
          onNavigateToMatches={() => setCurrentPage("matches")}
          onNavigateToMessages={() => setCurrentPage("messages")}
          onNavigateToAnalytics={() => setCurrentPage("analytics-report")}
          onNavigateToCreateProfile={() => setCurrentPage("create-profile")}
          onNavigateToSetting={() => setCurrentPage("setting")}
          onNavigateToMap={() => setCurrentPage("map")}
        />
      )}

      {currentPage === "map" && user && (
        <MapPage
          onLogout={handleLogout}
          onNavigateToDashboard={() => setCurrentPage("dashboard")}
          onNavigateToMatches={() => setCurrentPage("matches")}
          onNavigateToMessages={() => setCurrentPage("messages")}
          onNavigateToCreateProfile={() => setCurrentPage("create-profile")}
          onNavigateToSetting={() => setCurrentPage("setting")}
          onNavigateToRedFlagAlert={() => setCurrentPage("red-flag-alert")}
        />
      )}

      {currentPage === "admin-dashboard" && user && (
        <AdminDashboard
          user={user}
          onNavigateToUser={() => setCurrentPage("admin-dashboard")}
          onNavigateToListing={() => {
            // Force refresh
            setCurrentPage("listing-manage");
          }}
          onNavigateToVerification={() => setCurrentPage("verification-manage")}
          onNavigateToAnalytics={() => setCurrentPage("admin-analytics")}
          onNavigateToProfile={() => alert("Profile Coming Soon")}
          onNavigateToSetting={() => alert("Settings Coming Soon")}
          onLogout={handleLogout}
        />
      )}

      {currentPage === "listing-manage" && user && (
        <ListingManage
          onNavigateToUser={() => setCurrentPage("admin-dashboard")}
          onNavigateToListing={() => setCurrentPage("listing-manage")}
          onNavigateToVerification={() => setCurrentPage("verification-manage")}
          onNavigateToAnalytics={() => setCurrentPage("admin-analytics")}
          onNavigateToProfile={() => alert("Profile Coming Soon")}
          onNavigateToSetting={() => alert("Settings Coming Soon")}
          onLogout={handleLogout}
        />
      )}

      {currentPage === "verification-manage" && user && (
        <AdminVerificationPage
          onNavigateToUser={() => setCurrentPage("admin-dashboard")}
          onNavigateToListing={() => setCurrentPage("listing-manage")}
          onNavigateToVerification={() => setCurrentPage("verification-manage")}
          onNavigateToAnalytics={() => setCurrentPage("admin-analytics")}
          onNavigateToProfile={() => alert("Profile Coming Soon")}
          onNavigateToSetting={() => alert("Settings Coming Soon")}
          onLogout={handleLogout}
        />
      )}

      {currentPage === "admin-analytics" && user && (
        <AnalyticsPage
          onNavigateToUser={() => setCurrentPage("admin-dashboard")}
          onNavigateToListing={() => setCurrentPage("listing-manage")}
          onNavigateToVerification={() => setCurrentPage("verification-manage")}
          onNavigateToAnalytics={() => setCurrentPage("admin-analytics")}
          onNavigateToProfile={() => alert("Profile Coming Soon")}
          onNavigateToSetting={() => alert("Settings Coming Soon")}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}
