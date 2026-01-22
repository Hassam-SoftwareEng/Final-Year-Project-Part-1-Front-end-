import '../../styles/User/DashboardPage.css';
import { CheckCircle, Star, Heart, TrendingUp, Home, User, ArrowRight, Bell } from 'lucide-react';



interface DashboardPageProps {
  user: {
    email: string;
    fullName: string;
  };
  onLogout: () => void;
  onNavigateToAnalytics: () => void;
  onNavigateToMatches: () => void;
  onNavigateToNewMatches: () => void; // New prop
  onNavigateToMessages: () => void;
  onNavigateToCreateProfile: () => void;
  onNavigateToSetting: () => void;
  onNavigateToRedFlagAlert: () => void;
  onNavigateToMap: () => void;
  onNavigateToListing: () => void;
  onNavigateToNotification?: () => void;
}

export default function DashboardPage({ user, onLogout, onNavigateToAnalytics, onNavigateToNewMatches, onNavigateToListing, onNavigateToMessages, onNavigateToNotification, onNavigateToCreateProfile, onNavigateToSetting, onNavigateToRedFlagAlert, onNavigateToMap }: DashboardPageProps) {
  return (
    <div className="dashboard-container">
      {/* Top Navbar */}
      {/* Top Navbar (Bootstrap) */}
      {/* Top Navbar */}
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm sticky-top px-3">
        <div className="container-fluid">
          {/* Logo Section */}
          <a className="navbar-brand d-flex align-items-center gap-2" href="#" onClick={(e) => { e.preventDefault(); }}>
            <Home className="text-primary" size={24} style={{ color: '#14919B' }} />
            <span className="fw-bold" style={{ color: '#14919B', fontSize: '1.25rem' }}>RoomEase</span>
          </a>

          {/* Toggle Button for Mobile */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#dashboardNavbar" aria-controls="dashboardNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Content */}
          <div className="collapse navbar-collapse" id="dashboardNavbar">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
              <li className="nav-item">
                <a
                  className="nav-link fw-medium active"
                  aria-current="page"
                  href="#"
                  onClick={(e) => { e.preventDefault(); }}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link fw-medium"
                  href="#"
                  onClick={(e) => { e.preventDefault(); onNavigateToMap(); }}
                >
                  Map
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link fw-medium"
                  href="#"
                  onClick={(e) => { e.preventDefault(); onNavigateToListing(); }}
                >
                  Listing
                </a>
              </li>
              {onNavigateToRedFlagAlert && (
                <li className="nav-item">
                  <a className="nav-link fw-medium" href="#" onClick={(e) => { e.preventDefault(); onNavigateToRedFlagAlert(); }}>
                    Red Flag Alert
                  </a>
                </li>
              )}
            </ul>

            <div className="d-flex align-items-center gap-3">
              {onNavigateToSetting && (
                <a className="nav-link text-secondary fw-medium" href="#" onClick={(e) => { e.preventDefault(); onNavigateToSetting(); }}>Setting</a>
              )}
              {onNavigateToNotification && (
                <button
                  className="btn btn-link text-secondary p-0 border-0"
                  onClick={(e) => { e.preventDefault(); onNavigateToNotification(); }}
                >
                  {/* Warning: Bell might not be imported if I don't check imports. DashboardPage imports imports Home, User, CheckCircle... I need to check if Bell is imported. */}
                  {/* DashboardPage has: import { CheckCircle, Star, Heart, TrendingUp, Home, User, ArrowRight } from 'lucide-react'; */}
                  {/* I need to add Bell to imports or use text/icon replacement. I will add Bell to imports in next tool call or same one if possible. */}
                  {/* I'll use a generic icon or assume Bell is needed. Actually, I can update imports in same file. */}
                  <Bell size={20} />
                </button>
              )}
              <button className="btn-standard" onClick={onLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Layout */}
      <main className="main-content">

        <header className="dashboard-header">
          <div className="header-title-group">
            <h1>
              Welcome, {user.fullName.split(' ')[0]}
              <span className="verified-badge">
                <CheckCircle size={14} /> Verified
              </span>
            </h1>
            <p className="header-subtitle">Here's what's happening with your room search today.</p>
          </div>

          <button className="btn-prominent" onClick={onNavigateToCreateProfile}>
            Create Profile
          </button>
        </header>

        {/* Key Stats Overview (Grid) */}
        <div className="stats-overview-grid">
          {/* Card 1: Compatibility */}
          <div className="overview-card" onClick={onNavigateToAnalytics} style={{ cursor: 'pointer' }}>
            <div className="overview-content">
              <div className="label">Match Compatibility</div>
              <div className="value">88%</div>
              <div className="trend positive">
                <TrendingUp size={14} /> +2% this week
              </div>
            </div>
            <div className="overview-icon blue">
              <Star size={24} />
            </div>
          </div>

          {/* Card 2: New Matches */}
          <div className="overview-card" onClick={onNavigateToNewMatches} style={{ cursor: 'pointer' }}>
            <div className="overview-content">
              <div className="label">New Matches</div>
              <div className="value">3</div>
              <div className="trend" style={{ color: '#6B7280' }}>
                Last 7 days
              </div>
            </div>
            <div className="overview-icon purple">
              <User size={24} />
            </div>
          </div>

          {/* Card 3: Listings */}
          <div className="overview-card" onClick={onNavigateToListing} style={{ cursor: 'pointer' }}>
            <div className="overview-content">
              <div className="label">Feature Listing</div>
              <div className="value">12</div>
              <div className="trend positive">
                <ArrowRight size={14} /> AI Based
              </div>
            </div>
            <div className="overview-icon pink">
              <Home size={24} />
            </div>
          </div>
        </div>

        {/* Content Split: Matches Table + Messages */}
        <div className="content-grid">

          {/* Left: Recent Matches Data Grid */}
          <div className="dashboard-card" style={{ cursor: 'pointer' }} onClick={onNavigateToNewMatches}>
            <div className="card-header">
              <h3 className="card-title">Recent Matches</h3>
              <button
                className="btn-standard"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateToNewMatches();
                }}
              >
                View All
              </button>
            </div>
            <div className="table-responsive">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Profile</th>
                    <th>Budget</th>
                    <th>Match Score</th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="user-cell">
                        <img src="https://ui-avatars.com/api/?name=Ali+Khan&background=0D8ABC&color=fff&rounded=true" alt="Ali Khan" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                        Ali Khan
                      </div>
                    </td>
                    <td>PKR 50k</td>
                    <td><span className="compatibility-pill match-high">92% Match</span></td>

                  </tr>
                  <tr>
                    <td>
                      <div className="user-cell">
                        <img src="https://ui-avatars.com/api/?name=Bilal+Raza&background=7B1FA2&color=fff&rounded=true" alt="Bilal Raza" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                        Bilal Raza
                      </div>
                    </td>
                    <td>PKR 60k</td>
                    <td><span className="compatibility-pill match-high">90% Match</span></td>

                  </tr>
                  <tr>
                    <td>
                      <div className="user-cell">
                        <img src="https://ui-avatars.com/api/?name=Usman+Khan&background=F59E0B&color=fff&rounded=true" alt="Usman Khan" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                        Usman Khan
                      </div>
                    </td>
                    <td>PKR 45k</td>
                    <td><span className="compatibility-pill match-med">72% Match</span></td>

                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Recent Messages Widget */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3 className="card-title">Messages</h3>
              <button className="btn-standard" onClick={onNavigateToMessages}>Go to Chat</button>
            </div>
            <div className="message-list">
              <div className="message-item">
                <img src="https://ui-avatars.com/api/?name=Nathan+Hale&background=E0F2F1&color=00695C" alt="" className="msg-avatar" />
                <div className="msg-content">
                  <div className="msg-header">
                    <span className="msg-name">Nathan Hale</span>
                    <span className="msg-time">10:30 AM</span>
                  </div>
                  <div className="msg-preview">There you go :)</div>
                </div>
                <div className="unread-indicator"></div>
              </div>

              <div className="message-item">
                <img src="https://ui-avatars.com/api/?name=Dominic+Scott&background=F3E5F5&color=7B1FA2" alt="" className="msg-avatar" />
                <div className="msg-content">
                  <div className="msg-header">
                    <span className="msg-name">Dominic Scott</span>
                    <span className="msg-time">Yesterday</span>
                  </div>
                  <div className="msg-preview">Sounds good to me!</div>
                </div>
              </div>

              <div className="message-item">
                <img src="https://ui-avatars.com/api/?name=Xavier+Ross&background=FFF3E0&color=E65100" alt="" className="msg-avatar" />
                <div className="msg-content">
                  <div className="msg-header">
                    <span className="msg-name">Xavier Ross</span>
                    <span className="msg-time">2d ago</span>
                  </div>
                  <div className="msg-preview">Can we schedule a call?</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Saved Listings */}
        {/* Bottom: Saved Listings */}
        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3 px-1">
            <h3 className="fw-bold m-0" style={{ fontSize: '24px', color: '#111827' }}>
              Listings
            </h3>
            <button className="btn-standard" onClick={onNavigateToListing}>Browse More</button>
          </div>
          <div className="saved-listings-container" style={{ padding: '0' }}>
            <div className="listing-card-modern">
              <img src="/assets/images/premium_photo-1684175656320-5c3f701c082c (appartemnt).avif" className="listing-img" alt="Listing" />
              <div className="listing-details">
                <div className="listing-title">Modern Apartment in F-10</div>
                <div className="listing-price">PKR 45,000/mo</div>
              </div>
            </div>
            <div className="listing-card-modern">
              <img src="/assets/images/photo-1515263487990-61b07816b324 (flat).avif" className="listing-img" alt="Listing" />
              <div className="listing-details">
                <div className="listing-title">Cozy Studio DHA</div>
                <div className="listing-price">PKR 30,000/mo</div>
              </div>
            </div>
            <div className="listing-card-modern">
              <img src="/assets/images/Securemessaging.jpg" className="listing-img" alt="Listing" />
              <div className="listing-details">
                <div className="listing-title">Shared Room Blue Area</div>
                <div className="listing-price">PKR 15,000/mo</div>
              </div>
            </div>
          </div>
        </div>

      </main>
      <footer className="footer">
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} RoomEase. All rights reserved.</p>
        </div>
      </footer>
    </div >
  );
}