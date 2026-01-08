import '../../styles/User/DashboardPage.css';

interface DashboardPageProps {
  user: {
    email: string;
    fullName: string;
  };
  onLogout: () => void;
  onNavigateToAnalytics: () => void;
  onNavigateToMatches: () => void;
  onNavigateToMessages: () => void;
  onNavigateToCreateProfile: () => void;
  onNavigateToSetting: () => void;
  onNavigateToRedFlagAlert: () => void;
  onNavigateToMap: () => void;
  onNavigateToListing: () => void;
}

export default function DashboardPage({ user, onLogout, onNavigateToAnalytics, onNavigateToMatches, onNavigateToMessages, onNavigateToCreateProfile, onNavigateToSetting, onNavigateToRedFlagAlert, onNavigateToMap, onNavigateToListing }: DashboardPageProps) {
  return (
    <div className="dashboard-container">
      {/* Top Navbar */}
      <nav className="dashboard-navbar">
        <div className="nav-left">
          <div className="logo-section">

            <span className="logo-text">RoomEase</span>
          </div>
        </div>

        <div className="nav-center">
          <a href="#" className="nav-link">
            Home
          </a>
          <a
            href="#"
            className="nav-link"
            onClick={(e) => { e.preventDefault(); onNavigateToCreateProfile(); }}
          >
            Create Profile
          </a>
          <a href="#" className="nav-link" onClick={onNavigateToMatches}>
            Match
          </a>
          <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToMap(); }}>
            Map
          </a>
          <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToListing(); }}>
            Listing
          </a>
          <a href="#" className="nav-link" onClick={onNavigateToMessages}>
            Message
          </a>
          <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToRedFlagAlert(); }}>
            Red Flag Alert
          </a>
        </div>

        <div className="nav-right">
          <a href="#" className="nav-link" style={{ marginRight: '20px' }} onClick={(e) => { e.preventDefault(); onNavigateToSetting(); }}>
            Setting
          </a>
          {/* Logout Button */}
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="dashboard-hero">
          {/* Header */}
          <header className="header">
            <div className="header-left">
              <h1 className="header-title">Welcome {user.fullName}</h1>
              <p className="header-subtitle">Find Your Suitable Roommate</p>
            </div>


          </header>

          {/* Stats Cards */}
          <div className="stats-grid">
            {/* Blue Card - Compatibility */}
            <div className="stat-card shadow border-0 stat-card-pastel-blue">
              <div className="stat-card-body">
                <div className="stat-header">
                  <span className="stat-label">Compatibility Score</span>
                </div>
                <div className="stat-value">88% Average</div>
                <div className="stat-subtext">+2 this month</div>
              </div>
              <div className="stat-card-footer-link" onClick={onNavigateToAnalytics} style={{ cursor: 'pointer' }}>
                <span>See details</span>
                <span>›</span>
              </div>
            </div>

            {/* Purple Card - New Matches */}
            <div className="stat-card shadow border-0 stat-card-pastel-purple">
              <div className="stat-card-body">
                <div className="stat-header">
                  <span className="stat-label">New Matches</span>
                </div>
                <div className="stat-value">3</div>
                <div className="stat-subtext">in last 7 days</div>
              </div>
              <div className="stat-card-footer-link">
                <span>See details</span>
                <span>›</span>
              </div>
            </div>

            {/* Pink Card - Listings */}
            <div className="stat-card shadow border-0 stat-card-pastel-pink">
              <div className="stat-card-body">
                <div className="stat-header">
                  <span className="stat-label">Available Listing</span>
                </div>
                <div className="stat-value">2</div>
                <div className="stat-subtext">in your area</div>
              </div>
              <div className="stat-card-footer-link">
                <span>See details</span>
                <span>›</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Matches */}
        <div className="section shadow border-0">
          <div className="section-header">
            <h2 className="section-title">Recent Matches</h2>
            <button className="view-all-btn" onClick={onNavigateToMatches}>View All</button>
          </div>

          <div className="table-container">
            <table className="activities-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Budget</th>
                  <th>Compatibility</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ali Khan</td>
                  <td>PKR 50,000</td>
                  <td><span className="compatibility-badge">92%</span></td>
                </tr>
                <tr>
                  <td>Ahmed</td>
                  <td>PKR 45,000</td>
                  <td><span className="compatibility-badge">72%</span></td>
                </tr>
                <tr>
                  <td>Bilal Raza</td>
                  <td>PKR 60,000</td>
                  <td><span className="compatibility-badge">90%</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Featured Listing - Secondary Parallax Section */}
        <div className="dashboard-hero secondary-hero">
          <div className="section-header">
            <h2 className="section-title text-white">Featured Listing</h2>
            <p className="section-subtitle text-white-70">
              Check out the most popular properties
            </p>
          </div>

          <div className="classes-grid">
            <div className="class-card">
              <img
                src="assets/images/premium_photo-1684175656320-5c3f701c082c (appartemnt).avif"
                alt="Apartment"
                className="listing-image"
              />
              <div className="listing-info">
                <div className="listing-name">Apartment</div>
                <div className="listing-budget">PKR 120,000/month</div>
                <div className="listing-status">Available Now</div>
              </div>
            </div>

            <div className="class-card">
              <img
                src="assets/images/photo-1515263487990-61b07816b324 (flat).avif"
                alt="Modern Studio"
                className="listing-image"
              />
              <div className="listing-info">
                <div className="listing-name">DHA flats</div>
                <div className="listing-budget">PKR 80,000/month</div>
                <div className="listing-status">Available Now</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}