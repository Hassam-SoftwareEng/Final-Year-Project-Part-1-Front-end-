import { useEffect } from 'react';
import { Home } from "lucide-react";
import AOS from 'aos';
import '../../styles/PublicPagesCss/LandingPage.css';

interface LandingPageProps {
  onNavigateToLogin: () => void;
  onNavigateToSignup?: () => void;
}


export function LandingPage({
  onNavigateToLogin,
  onNavigateToSignup,
}: LandingPageProps) {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  return (
    <div className="landing-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-brand">
          <Home size={28} strokeWidth={2.5} className="text-teal" />
          <span>RoomEase</span>
        </div>

      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title" data-aos="fade-up">Find Your Perfect Roommate</h1>
            <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="100">
              Swipe to Connect with your compatible roomie.
            </p>
            <div className="hero-cta-group" data-aos="fade-up" data-aos-delay="200">
              <button
                className="nav-btn nav-btn-signup"
                onClick={onNavigateToLogin}
                style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}
              >
                Get Started
              </button>
            </div>
          </div>
        </section>

        {/* Discover Section */}
        <section className="discover-section">
          <div className="discover-container">
            <div className="discover-text" data-aos="fade-right">
              <h2 className="discover-heading">Discover and<br />Connect with<br />Potential<br />Roommates</h2>
              <p className="discover-description">
                RoomEase offers a seamless way to find people who match your lifestyle and preferences. Say goodbye to awkward interviews and endless searching. Our intelligent matching system does the hard work for you, so you can focus on connecting with individuals who could be your ideal roommate.
              </p>
            </div>
            <div className="discover-image-wrapper" data-aos="zoom-in">
              <img
                src="/assets/images/pexels-rotwe1n-ordinyuki-392997481-35133662.jpg"
                alt="Group of friends"
                className="discover-image"
              />
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="key-features-section">
          <h2 className="key-features-title" data-aos="fade-up">Key Features Designed for Easier Roommate Finding</h2>

          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
              <div className="mb-4 rounded-4 overflow-hidden" style={{ height: '250px' }}>
                <img src="/assets/images/Messaging.jpg" alt="Secure Messaging" className="img-fluid w-100 h-100 object-fit-cover feature-img" />
              </div>
              <h3 className="h4 fw-bold mb-3">Secure In-App Messaging</h3>
              <p className="text-muted">Connect and chat directly with potential roommates within the app to get to know them better.</p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
              <div className="mb-4 rounded-4 overflow-hidden" style={{ height: '250px' }}>
                <img src="/assets/images/feature_matching.png" alt="Detailed Preference Matching" className="img-fluid w-100 h-100 object-fit-cover feature-img" />
              </div>
              <h3 className="h4 fw-bold mb-3">Detailed Preference Matching</h3>
              <p className="text-muted">Tell us about your lifestyle, habits, and preferences, and we'll find roommates who align with your criteria.</p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
              <div className="mb-4 rounded-4 overflow-hidden" style={{ height: '250px' }}>
                <img src="/assets/images/feature_swipe.png" alt="Intuitive Swipe Interface" className="img-fluid w-100 h-100 object-fit-cover feature-img" />
              </div>
              <h3 className="h4 fw-bold mb-3">Intuitive Swipe Interface</h3>
              <p className="text-muted">Browse potential roommates effortlessly. Swipe right to express interest or left to move on.</p>
            </div>
          </div>
        </section>

        {/* How to Get Started Section */}
        <section className="key-features-section bg-white" style={{ paddingTop: '0' }}>
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold display-5">How to Get Started?</h2>
          </div>
          <div className="features-grid">
            <div className="match-card h-100 p-4 text-white text-center rounded-4" data-aos="fade-up" data-aos-delay="100" style={{ backgroundColor: '#008C9E' }}>
              <h3 className="h4 fw-bold mb-3">Create a Profile</h3>
              <p className="mb-0 opacity-75">Start by building your personalized profile. Share your lifestyle, interests, and living preferences.</p>
            </div>
            <div className="match-card h-100 p-4 text-white text-center rounded-4" data-aos="fade-up" data-aos-delay="200" style={{ backgroundColor: '#008C9E' }}>
              <h3 className="h4 fw-bold mb-3">Set your preferences</h3>
              <p className="mb-0 opacity-75">Customize your search with specific preferences like budget, location, and living habits.</p>
            </div>
            <div className="match-card h-100 p-4 text-white text-center rounded-4" data-aos="fade-up" data-aos-delay="300" style={{ backgroundColor: '#008C9E' }}>
              <h3 className="h4 fw-bold mb-3">Swipe and Match</h3>
              <p className="mb-0 opacity-75">Browse through potential roommates with ease! Swipe through profiles and connect.</p>
            </div>
          </div>
        </section>

      </main>
    </div>

  );
}