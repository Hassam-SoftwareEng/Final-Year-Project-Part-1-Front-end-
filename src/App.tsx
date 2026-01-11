import React, { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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
import { ListingPage } from "./components/User/ListingPage";
import { NotificationPage } from "./components/User/NotificationPage";

// Types
interface User {
  email: string;
  fullName: string;
}

interface Account {
  email: string;
  fullName: string;
  password: string;
}

const Preloader = () => (
  <div className="swm-loader-holder">
    <div className="swm-loader-inner">
      <div className="swm-circular-spin"></div>
    </div>
  </div>
);

export default function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [resetEmail, setResetEmail] = useState<string | null>(null);

  const handleNavigation = (path: string) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(path);
      setIsLoading(false);
    }, 1000); // 1 second loading simulation
  };

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
    handleNavigation("/dashboard");
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
    handleNavigation("/login-selection");
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
    handleNavigation("/reset-password");
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
    handleNavigation("/login-selection");
  };

  /* =========================
     LOGOUT
  ========================== */
  const handleLogout = () => {
    setUser(null);
    handleNavigation("/");
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
    handleNavigation("/admin-dashboard");
  };

  const handleAdminSignup = (data: Account) => {
    setAccounts((prev) => [...prev, data]);
    alert("Admin account created successfully! Please login.");
    handleNavigation("/admin-login");
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
    handleNavigation("/dashboard");
  };

  const handleOwnerSignup = (data: Account) => {
    setAccounts((prev) => [...prev, data]);
    alert("Property Owner account created successfully! Please login.");
    handleNavigation("/property-owner-login");
  };

  // Protected Route Wrapper
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  };

  return (
    <>
      {isLoading && <Preloader />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login-selection" element={<LoginSelectionPage />} />

        {/* User Auth */}
        <Route path="/user-login" element={
          <UserLoginPage
            onLoginSuccess={handleLoginSuccess}
          />
        } />
        <Route path="/user-signup" element={
          <UserSignupPage
            onSignupSuccess={handleSignupSuccess}
          />
        } />
        <Route path="/user-forgot-password" element={
          <UserForgotPasswordPage onSubmitEmail={handleForgotPassword} />
        } />
        <Route path="/reset-password" element={
          resetEmail ? (
            <ResetPasswordPage
              email={resetEmail}
              onResetPassword={handleResetPassword}
            />
          ) : <Navigate to="/login-selection" />
        } />

        {/* Admin Auth */}
        {/* Admin Auth */}
        <Route path="/admin-login" element={
          <AdminLoginPage
            onLoginSuccess={handleAdminLogin}
          />
        } />
        <Route path="/admin-signup" element={
          <AdminSignupPage
            onSignupSuccess={handleAdminSignup}
          />
        } />
        <Route path="/admin-forgot-password" element={
          <AdminForgotPasswordPage
            onSubmitEmail={(email) => console.log("Admin forgot password", email)}
          />
        } />

        {/* Property Owner Auth */}
        <Route path="/property-owner-login" element={
          <PropertyOwnerLoginPage
            onLoginSuccess={handleOwnerLogin}
          />
        } />
        <Route path="/property-owner-signup" element={
          <PropertyOwnerSignupPage
            onSignupSuccess={handleOwnerSignup}
          />
        } />
        <Route path="/property-owner-forgot-password" element={
          <PropertyOwnerForgotPasswordPage
            onSubmitEmail={(email) => console.log("Owner forgot password", email)}
          />
        } />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage
              user={user!}
              onLogout={handleLogout}
              onNavigateToAnalytics={() => navigate('/analytics-report')}
              onNavigateToMatches={() => navigate('/matches')}
              onNavigateToMessages={() => navigate('/messages')}
              onNavigateToCreateProfile={() => navigate('/create-profile')}
              onNavigateToSetting={() => navigate('/setting')}
              onNavigateToRedFlagAlert={() => navigate('/red-flag-alert')}
              onNavigateToMap={() => navigate('/map')}
              onNavigateToListing={() => navigate('/listing')}
              onNavigateToNotification={() => navigate('/notification')}
            />
          </ProtectedRoute>
        } />

        {/* Protected Sub-pages */}
        <Route path="/analytics-report" element={
          <ProtectedRoute>
            <AnalyticsReportPage
              user={user!}
              onLogout={handleLogout}
              onNavigateToDashboard={() => navigate('/dashboard')}
              onNavigateToMessages={() => navigate('/messages')}
              onNavigateToCreateProfile={() => navigate('/create-profile')}
              onNavigateToSetting={() => navigate('/setting')}
              onNavigateToRedFlagAlert={() => navigate('/red-flag-alert')}
              onNavigateToListing={() => navigate('/listing')}
              onNavigateToNotification={() => navigate('/notification')}
            />
          </ProtectedRoute>
        } />
        <Route path="/matches" element={
          <ProtectedRoute>
            <MatchesPages
              user={user!}
              onLogout={handleLogout}
              onNavigateToDashboard={() => navigate('/dashboard')}
              onNavigateToMessages={() => navigate('/messages')}
              onNavigateToCreateProfile={() => navigate('/create-profile')}
              onNavigateToSetting={() => navigate('/setting')}
              onNavigateToRedFlagAlert={() => navigate('/red-flag-alert')}
              onNavigateToMap={() => navigate('/map')}
              onNavigateToListing={() => navigate('/listing')}
              onNavigateToNotification={() => navigate('/notification')}
            />
          </ProtectedRoute>
        } />
        <Route path="/messages" element={
          <ProtectedRoute>
            <MessagePage
              user={user!}
              onLogout={handleLogout}
              onNavigateToDashboard={() => navigate('/dashboard')}
              onNavigateToMatches={() => navigate('/matches')}
              onNavigateToAnalytics={() => navigate('/analytics-report')}
              onNavigateToCreateProfile={() => navigate('/create-profile')}
              onNavigateToSetting={() => navigate('/setting')}
              onNavigateToRedFlagAlert={() => navigate('/red-flag-alert')}
              onNavigateToMap={() => navigate('/map')}
              onNavigateToListing={() => navigate('/listing')}
              onNavigateToNotification={() => navigate('/notification')}
            />
          </ProtectedRoute>
        } />
        <Route path="/create-profile" element={
          <ProtectedRoute>
            <CreateProfilePage
              user={user!}
              onLogout={handleLogout}
              onNavigateToDashboard={() => navigate('/dashboard')}
              onNavigateToMatches={() => navigate('/matches')}
              onNavigateToMessages={() => navigate('/messages')}
              onNavigateToSetting={() => navigate('/setting')}
              onNavigateToRedFlagAlert={() => navigate('/red-flag-alert')}
              onNavigateToMap={() => navigate('/map')}
              onNavigateToListing={() => navigate('/listing')}
              onNavigateToNotification={() => navigate('/notification')}
            />
          </ProtectedRoute>
        } />
        <Route path="/setting" element={
          <ProtectedRoute>
            <Setting
              user={user!}
              onLogout={handleLogout}
              onNavigateToDashboard={() => navigate('/dashboard')}
              onNavigateToMatches={() => navigate('/matches')}
              onNavigateToMessages={() => navigate('/messages')}
              onNavigateToAnalytics={() => navigate('/analytics-report')}
              onNavigateToCreateProfile={() => navigate('/create-profile')}
              onNavigateToVerification={() => navigate('/verification')}
              onNavigateToRedFlagAlert={() => navigate('/red-flag-alert')}
              onNavigateToMap={() => navigate('/map')}
              onNavigateToListing={() => navigate('/listing')}
              onNavigateToNotification={() => navigate('/notification')}
            />
          </ProtectedRoute>
        } />
        <Route path="/verification" element={
          <ProtectedRoute>
            <VerificationPage
              user={user!}
              onLogout={handleLogout}
              onNavigateToDashboard={() => navigate('/dashboard')}
              onNavigateToMatches={() => navigate('/matches')}
              onNavigateToMessages={() => navigate('/messages')}
              onNavigateToAnalytics={() => navigate('/analytics-report')}
              onNavigateToCreateProfile={() => navigate('/create-profile')}
              onNavigateToSetting={() => navigate('/setting')}
              onNavigateToRedFlagAlert={() => navigate('/red-flag-alert')}
              onNavigateToListing={() => navigate('/listing')}
              onNavigateToNotification={() => navigate('/notification')}
            />
          </ProtectedRoute>
        } />
        <Route path="/red-flag-alert" element={
          <ProtectedRoute>
            <RedFlagAlert
              user={user!}
              onLogout={handleLogout}
              onNavigateToDashboard={() => navigate('/dashboard')}
              onNavigateToMatches={() => navigate('/matches')}
              onNavigateToMessages={() => navigate('/messages')}
              onNavigateToAnalytics={() => navigate('/analytics-report')}
              onNavigateToCreateProfile={() => navigate('/create-profile')}
              onNavigateToSetting={() => navigate('/setting')}
              onNavigateToMap={() => navigate('/map')}
              onNavigateToListing={() => navigate('/listing')}
              onNavigateToNotification={() => navigate('/notification')}
            />
          </ProtectedRoute>
        } />
        <Route path="/map" element={
          <ProtectedRoute>
            <MapPage
              onLogout={handleLogout}
              onNavigateToDashboard={() => navigate('/dashboard')}
              onNavigateToMatches={() => navigate('/matches')}
              onNavigateToMessages={() => navigate('/messages')}
              onNavigateToCreateProfile={() => navigate('/create-profile')}
              onNavigateToSetting={() => navigate('/setting')}
              onNavigateToRedFlagAlert={() => navigate('/red-flag-alert')}
              onNavigateToListing={() => navigate('/listing')}
              onNavigateToNotification={() => navigate('/notification')}
            />
          </ProtectedRoute>
        } />
        <Route path="/listing" element={
          <ProtectedRoute>
            <ListingPage
              onLogout={handleLogout}
              onNavigateToDashboard={() => navigate('/dashboard')}
              onNavigateToMatches={() => navigate('/matches')}
              onNavigateToMessages={() => navigate('/messages')}
              onNavigateToCreateProfile={() => navigate('/create-profile')}
              onNavigateToSetting={() => navigate('/setting')}
              onNavigateToRedFlagAlert={() => navigate('/red-flag-alert')}
              onNavigateToMap={() => navigate('/map')}
              onNavigateToListing={() => navigate('/listing')}
              onNavigateToNotification={() => navigate('/notification')}
            />
          </ProtectedRoute>
        } />
        <Route path="/notification" element={
          <ProtectedRoute>
            <NotificationPage
              onLogout={handleLogout}
              onNavigateToDashboard={() => navigate('/dashboard')}
              onNavigateToMatches={() => navigate('/matches')}
              onNavigateToMessages={() => navigate('/messages')}
              onNavigateToCreateProfile={() => navigate('/create-profile')}
              onNavigateToSetting={() => navigate('/setting')}
              onNavigateToRedFlagAlert={() => navigate('/red-flag-alert')}
              onNavigateToMap={() => navigate('/map')}
              onNavigateToListing={() => navigate('/listing')}
              onNavigateToNotification={() => navigate('/notification')}
            />
          </ProtectedRoute>
        } />

        {/* Admin Protected Routes */}
        <Route path="/admin-dashboard" element={
          <ProtectedRoute>
            <AdminDashboard
              user={user!}
              onLogout={handleLogout}
              onNavigateToUser={() => navigate('/admin-dashboard')}
              onNavigateToListing={() => navigate('/listing-manage')}
              onNavigateToVerification={() => navigate('/verification-manage')}
              onNavigateToAnalytics={() => navigate('/admin-analytics')}
              onNavigateToProfile={() => alert("Profile Coming Soon")}
              onNavigateToSetting={() => alert("Settings Coming Soon")}
            />
          </ProtectedRoute>
        } />
        <Route path="/listing-manage" element={
          <ProtectedRoute>
            <ListingManage
              onLogout={handleLogout}
              onNavigateToUser={() => navigate('/admin-dashboard')}
              onNavigateToListing={() => navigate('/listing-manage')}
              onNavigateToVerification={() => navigate('/verification-manage')}
              onNavigateToAnalytics={() => navigate('/admin-analytics')}
              onNavigateToProfile={() => alert("Profile Coming Soon")}
              onNavigateToSetting={() => alert("Settings Coming Soon")}
            />
          </ProtectedRoute>
        } />
        <Route path="/verification-manage" element={
          <ProtectedRoute>
            <AdminVerificationPage
              onLogout={handleLogout}
              onNavigateToUser={() => navigate('/admin-dashboard')}
              onNavigateToListing={() => navigate('/listing-manage')}
              onNavigateToVerification={() => navigate('/verification-manage')}
              onNavigateToAnalytics={() => navigate('/admin-analytics')}
              onNavigateToProfile={() => alert("Profile Coming Soon")}
              onNavigateToSetting={() => alert("Settings Coming Soon")}
            />
          </ProtectedRoute>
        } />
        <Route path="/admin-analytics" element={
          <ProtectedRoute>
            <AnalyticsPage
              onLogout={handleLogout}
              onNavigateToUser={() => navigate('/admin-dashboard')}
              onNavigateToListing={() => navigate('/listing-manage')}
              onNavigateToVerification={() => navigate('/verification-manage')}
              onNavigateToAnalytics={() => navigate('/admin-analytics')}
              onNavigateToProfile={() => alert("Profile Coming Soon")}
              onNavigateToSetting={() => alert("Settings Coming Soon")}
            />
          </ProtectedRoute>
        } />

      </Routes>
    </>
  );
}
