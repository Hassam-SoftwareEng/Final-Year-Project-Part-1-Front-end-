import React, { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { LandingPage } from "./components/PublicPages/Landingpage";
import DashboardPage from "./components/User/DashboardPage";
import { AnalyticsReportPage } from "./components/User/AnalyticsReportPage";
import { ResetPasswordPage } from "./components/PublicPages/ResetPasswordPage";
import { LoginSelectionPage } from "./components/PublicPages/LoginSelectionPage";
// import { MatchesPages } from "./components/User/MatchesPages";
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
// Property Owner(User) folder was deleted - imports commented out
// import { PropertyOwnerLoginPage } from "./components/Property Owner(User)/PropertyOwnerLoginPage";
// import { PropertyOwnerSignupPage } from "./components/Property Owner(User)/PropertyOwnerSignupPage";
// import { PropertyOwnerForgotPasswordPage } from "./components/Property Owner(User)/PropertyOwnerForgotPasswordPage";
// import PropertyOwnerHomePage from "./components/Property Owner(User)/HomePage";

// New Property Owner imports
import PropertyOwnerDashboard from "./components/Property Owner/Dashboard";
import { PostListingPage as PropertyOwnerPostListingPage } from "./components/Property Owner/PostListingPage";
import { PropertyOwnerLoginPage } from "./components/Property Owner/LoginPage";
import { PropertyOwnerSignupPage } from "./components/Property Owner/SignupPage";

// ... existing imports ...


import { MapPage } from "./components/User/MapPage";
import { ListingPage } from "./components/User/ListingPage";
import { NotificationPage } from "./components/User/NotificationPage";
import ViewProfile from "./components/User/ViewProfile";

// Property Owner(User) imports - folder deleted, commented out
// import { AnalyticsReportPage as PropertyOwnerAnalyticsReportPage } from "./components/Property Owner(User)/AnalyticsReportPage";
// import { MessagePage as PropertyOwnerMessagePage } from "./components/Property Owner(User)/MessagePage";
// import { CreateProfilePage as PropertyOwnerCreateProfilePage } from "./components/Property Owner(User)/CreateProfilePage";
// import { Setting as PropertyOwnerSetting } from "./components/Property Owner(User)/Setting";
// import { RedFlagAlert as PropertyOwnerRedFlagAlert } from "./components/Property Owner(User)/RedFlagAlert";
// import { MapPage as PropertyOwnerMapPage } from "./components/Property Owner(User)/MapPage";
// import { ListingPage as PropertyOwnerListingPage } from "./components/Property Owner(User)/ListingPage";
// import { NotificationPage as PropertyOwnerNotificationPage } from "./components/Property Owner(User)/NotificationPage";
// import PropertyOwnerViewProfile from "./components/Property Owner(User)/ViewProfile";
// import PropertyOwnerNewMatchCrt from "./components/Property Owner(User)/NewMatchCrt";

import NewMatchCrt from "./components/User/NewMatchCrt";

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
  const handleOwnerLogin = (email: string, _password: string) => {
    // Prototype: Skip validation, directly login
    setUser({ email: email || 'owner@example.com', fullName: 'Property Owner' });
    handleNavigation("/property-owner-dashboard");
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
            onSignupSuccess={(data) => handleOwnerSignup(data)}
          />
        } />
        {/* TODO: Create Forgot Password page
        <Route path="/property-owner-forgot-password" element={...} />
        */}

        {/* Property Owner Dashboard - Using new Dashboard component */}
        <Route path="/property-owner-dashboard" element={
          <ProtectedRoute>
            <PropertyOwnerDashboard
              user={user!}
              onLogout={handleLogout}
              onNavigateToPostListing={() => navigate('/property-owner-post-listing')}
              onNavigateToListing={() => navigate('/property-owner-post-listing')}
              onNavigateToNotification={() => alert('Notifications Coming Soon')}
              onNavigateToSetting={() => alert('Settings Coming Soon')}
              onNavigateToUserDashboard={() => navigate('/dashboard')}
            />
          </ProtectedRoute>
        } />

        {/* Property Owner Pages - TODO: Create these in Property Owner folder */}
        {/* Routes temporarily disabled - components deleted
        <Route path="/property-owner-analytics" element={...} />
        <Route path="/property-owner-messages" element={...} />
        <Route path="/property-owner-create-profile" element={...} />
        <Route path="/property-owner-setting" element={...} />
        <Route path="/property-owner-red-flag-alert" element={...} />
        <Route path="/property-owner-map" element={...} />
        <Route path="/property-owner-listing" element={...} />
        <Route path="/property-owner-notification" element={...} />
        <Route path="/property-owner-view-profile" element={...} />
        <Route path="/property-owner-new-matches" element={...} />
        */}

        <Route path="/property-owner-post-listing" element={
          <ProtectedRoute>
            <PropertyOwnerPostListingPage
              onLogout={handleLogout}
              onNavigateToDashboard={() => navigate('/property-owner-dashboard')}
              onNavigateToListing={() => navigate('/property-owner-post-listing')}
              onNavigateToNotification={() => alert('Notifications Coming Soon')}
              onNavigateToMap={() => alert('Map Coming Soon')}
              onNavigateToSetting={() => alert('Settings Coming Soon')}
              onNavigateToRedFlagAlert={() => alert('Red Flag Coming Soon')}
            />
          </ProtectedRoute>
        } />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage
              user={user!}
              onLogout={handleLogout}
              onNavigateToAnalytics={() => navigate('/analytics-report')}
              onNavigateToMatches={() => navigate('/matches')}
              onNavigateToNewMatches={() => navigate('/new-matches')}
              onNavigateToMessages={() => navigate('/messages')}
              onNavigateToCreateProfile={() => navigate('/create-profile')}
              onNavigateToSetting={() => navigate('/setting')}
              onNavigateToRedFlagAlert={() => navigate('/red-flag-alert')}
              onNavigateToMap={() => navigate('/map')}
              onNavigateToListing={() => navigate('/listing')}
              onNavigateToNotification={() => navigate('/notification')}
              onNavigateToPropertyOwnerDashboard={() => navigate('/property-owner-dashboard')}
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
              onNavigateToSetting={() => navigate('/setting')}
              onNavigateToMap={() => navigate('/map')}
              onNavigateToRedFlagAlert={() => navigate('/red-flag-alert')}
              onNavigateToListing={() => navigate('/listing')}
              onNavigateToNotification={() => navigate('/notification')}
            />
          </ProtectedRoute>
        } />
        {/* <Route path="/matches" element={
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
        } /> */}
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
        <Route path="/new-matches" element={
          <ProtectedRoute>
            <NewMatchCrt
              onLogout={handleLogout}
              onNavigateToDashboard={() => navigate('/dashboard')}
              onNavigateToListing={() => navigate('/listing')}
              onNavigateToNotification={() => navigate('/notification')}
              onNavigateToMap={() => navigate('/map')}
              onNavigateToSetting={() => navigate('/setting')}
              onNavigateToRedFlagAlert={() => navigate('/red-flag-alert')}
            />
          </ProtectedRoute>
        } />
        <Route path="/view-profile" element={
          <ProtectedRoute>
            <ViewProfile
              onLogout={handleLogout}
              onNavigateToDashboard={() => navigate('/dashboard')}
              onNavigateToListing={() => navigate('/listing')}
              onNavigateToNotification={() => navigate('/notification')}
              onNavigateToMap={() => navigate('/map')}
              onNavigateToSetting={() => navigate('/setting')}
              onNavigateToRedFlagAlert={() => navigate('/red-flag-alert')}
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
              onNavigateToMap={() => navigate('/map')}
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
              onNavigateToRedFlagAlert={() => navigate('/red-flag-alert')}
              onNavigateToNotification={() => navigate('/notification')}
            />
          </ProtectedRoute>
        } />
        <Route path="/map" element={
          <ProtectedRoute>
            <MapPage
              onLogout={handleLogout}
              onNavigateToDashboard={() => navigate('/dashboard')}
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
