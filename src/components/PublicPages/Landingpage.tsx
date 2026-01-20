import { useEffect, useState } from 'react';
import { Home, Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import AOS from 'aos';
import '../../styles/PublicPagesCss/LandingPage.css';

import { useNavigate } from 'react-router-dom';

interface LandingPageProps {
  // Add props if needed in future
}

export function LandingPage({ }: LandingPageProps) {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

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
                className="btn btn-primary"
                onClick={() => navigate('/login-selection')}
                style={{ fontSize: '1.1rem', padding: '0.8rem 2.5rem' }} // keeping slight inline override for hero size if needed, or remove padding to rely on class
              >
                Get Started
              </button>
            </div>
          </div>
        </section>



        {/* Intro / Values Section (New) */}
        <section className="intro-section">
          <div className="intro-content-wrapper">
            <div className="intro-header" data-aos="fade-right">
              <h2 className="intro-title">We Are Redefining Shared Living with AI</h2>
              <p className="intro-subtitle">
                RoomEase combines intelligent automation, verified data, and human-centered design to make roommate matching safe, efficient, and reliable.
              </p>
            </div>
            {/* Image Collage */}
            <div className="intro-images-collage" data-aos="fade-left">
              <div className="collage-col">
                <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" className="collage-img" alt="Co-living space" style={{ flex: 1 }} />
              </div>
              <div className="collage-col">
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" className="collage-img" alt="Happy roommates" style={{ flex: 0.6 }} />
                <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" className="collage-img" alt="Study area" style={{ flex: 0.4 }} />
              </div>
              <div className="collage-col">
                <img src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" className="collage-img" alt="Modern apartment" style={{ flex: 1 }} />
              </div>
            </div>
          </div>
          <div className="values-grid">
            <div className="value-item" data-aos="fade-up" data-aos-delay="0">
              <h3><span className="value-number">01.</span> AI Compatibility Engine</h3>
              <p className="value-text">
                Our system analyzes lifestyle habits, budget constraints, and personal preferences using intelligent algorithms to generate accurate compatibility scores for users.
              </p>
            </div>
            <div className="value-item" data-aos="fade-up" data-aos-delay="100">
              <h3><span className="value-number">02.</span> Trust & Safety First</h3>
              <p className="value-text">
                RoomEase integrates identity verification, red-flag detection, and community ratings to ensure safe and trustworthy interactions.
              </p>
            </div>
            <div className="value-item" data-aos="fade-up" data-aos-delay="200">
              <h3><span className="value-number">03.</span> Smart Web Platform</h3>
              <p className="value-text">
                Built using modern web technologies, RoomEase delivers a responsive, intuitive, and secure experience across all devices.
              </p>
            </div>
          </div>
        </section>

        {/* How to Get Started (How it Works) - Carousel Redesign */}
        <section className="carousel-section" style={{ paddingTop: '5rem', paddingBottom: '0' }}>
          <div className="how-it-works-carousel">

            {/* Navigation Arrows */}
            <button className="carousel-nav-btn carousel-prev" onClick={() => setActiveSlide((prev) => (prev === 0 ? 2 : prev - 1))}>
              <ChevronLeft size={64} strokeWidth={1} />
            </button>
            <button className="carousel-nav-btn carousel-next" onClick={() => setActiveSlide((prev) => (prev === 2 ? 0 : prev + 1))}>
              <ChevronRight size={64} strokeWidth={1} />
            </button>

            <div className="carousel-slides-container">
              {/* Slide 1 */}
              <div className={`carousel-slide ${activeSlide === 0 ? 'active' : ''}`}>
                <img
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Create Profile"
                  className="carousel-image"
                />
                <div className="carousel-overlay-card">
                  <h3 className="carousel-content-title">Create Your Detailed Profile</h3>
                  <div className="carousel-accent-line"></div>
                  <p className="carousel-description">
                    Start by building your personalized profile. Share your lifestyle, interests, and living preferences to find the perfect match.
                  </p>

                </div>
              </div>

              {/* Slide 2 */}
              <div className={`carousel-slide ${activeSlide === 1 ? 'active' : ''}`}>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Set Preferences"
                  className="carousel-image"
                />
                <div className="carousel-overlay-card">
                  <h3 className="carousel-content-title">Customize your search with specific preferences</h3>
                  <div className="carousel-accent-line"></div>
                  <p className="carousel-description">
                    Filter by budget, location, and living habits. Our algorithm respects your deal-breakers to ensure compatibility.
                  </p>

                </div>
              </div>

              {/* Slide 3 */}
              <div className={`carousel-slide ${activeSlide === 2 ? 'active' : ''}`}>
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Swipe and Match"
                  className="carousel-image"
                />
                <div className="carousel-overlay-card">
                  <h3 className="carousel-content-title">Browse through potential roommates with ease</h3>
                  <div className="carousel-accent-line"></div>
                  <p className="carousel-description">
                    Swipe right to connect or left to pass. Chat directly with your matches in a secure environment.
                  </p>

                </div>
              </div>
            </div>

            {/* Indicators */}
            <div className="carousel-indicators">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  className={`carousel-dot ${activeSlide === idx ? 'active' : ''}`}
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </section>



        {/* Match Preview Section */}
        <section className="match-preview-section">
          <div className="match-preview-container">
            <div className="discover-text" data-aos="fade-right">
              <h2 className="discover-heading">See Who You Match With</h2>
              <p className="discover-description">
                Get a sneak peek of your compatibility. Our detailed profiles show you everything you need to know before you connect.
              </p>
              <ul className="list-unstyled mt-4">
                <li className="d-flex align-items-center gap-2 mb-3"><Check className="text-teal" size={20} /> <span className="text-muted fw-bold">Lifestyle Compatibility</span></li>
                <li className="d-flex align-items-center gap-2 mb-3"><Check className="text-teal" size={20} /> <span className="text-muted fw-bold">Verified Profiles</span></li>
                <li className="d-flex align-items-center gap-2 mb-3"><Check className="text-teal" size={20} /> <span className="text-muted fw-bold">Shared Interests</span></li>
              </ul>
            </div>
            <div className="match-image-wrapper" data-aos="zoom-in">
              <div className="match-card-preview">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="bg-light rounded-circle" style={{ width: '60px', height: '60px' }}>
                    {/* Placeholder Avatar */}
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150" alt="Avatar" className="w-100 h-100 rounded-circle object-fit-cover" />
                  </div>
                  <div>
                    <h4 className="h5 fw-bold mb-0">James, 24</h4>
                    <p className="text-muted small mb-0">Student • Early Bird</p>
                  </div>
                </div>
                <div className="mb-3">
                  <span className="badge bg-light text-dark me-2 mb-2">Non-smoker</span>
                  <span className="badge bg-light text-dark me-2 mb-2">Pet friendly</span>
                  <span className="badge bg-light text-dark mb-2">Clean</span>
                </div>
                <p className="text-muted small">"Looking for a quiet roommate who enjoys movie nights and keeps the shared spaces tidy!"</p>
              </div>
            </div>
          </div>
        </section>

        {/* What Can We Do For You Section (New) */}
        <section className="what-we-do-section">
          <div className="what-we-do-container">
            <div className="what-we-do-text">
              <h2 className="what-we-do-title-complex">
                <span className="title-outline">WHAT</span>
                <div className="title-content-wrapper">
                  <div className="title-big-col">
                    <span className="title-solid">CAN</span>
                    <span className="title-solid">WE</span>
                  </div>
                  <div className="title-small-col">
                    <span className="title-small">DO FOR</span>
                    <span className="title-small">YOU?</span>
                  </div>
                </div>
              </h2>
            </div>

            <div className="cards-scroll-wrapper">
              {/* Card 1 (Lowest) - Secure Messaging */}
              <div className="feature-dark-card card-low" data-aos="fade-up" data-aos-delay="0">
                <div className="feature-dark-img-container">
                  <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Secure Messaging" className="feature-dark-img" />
                </div>
                <div className="feature-dark-content">
                  <h3 className="feature-dark-title">Secure<br />Messaging</h3>
                  <p className="feature-dark-desc">
                    Connect and chat directly with potential roommates within the app safely.
                  </p>
                </div>
              </div>

              {/* Card 2 (Middle) - Smart Matching */}
              <div className="feature-dark-card card-mid" data-aos="fade-up" data-aos-delay="100">
                <div className="feature-dark-img-container">
                  <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Smart Matching" className="feature-dark-img" />
                </div>
                <div className="feature-dark-content">
                  <h3 className="feature-dark-title">Smart<br />Matching</h3>
                  <p className="feature-dark-desc">
                    Our algorithm finds roommates who align with your lifestyle and habits.
                  </p>
                </div>
              </div>

              {/* Card 3 (Highest) - Easy Discovery */}
              <div className="feature-dark-card card-high" data-aos="fade-up" data-aos-delay="200">
                <div className="feature-dark-img-container">
                  <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Easy Discovery" className="feature-dark-img" />
                </div>
                <div className="feature-dark-content">
                  <h3 className="feature-dark-title">Easy<br />Discovery</h3>
                  <p className="feature-dark-desc">
                    Swipe right to connect or left to pass. Finding a roommate has never been fun.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="comparison-section">
          <div className="text-center" data-aos="fade-up">
            <h2 className="fw-bold display-5">Why Choose RoomEase?</h2>
            <p className="text-muted mt-3">See how we stack up against the old way of finding roommates.</p>
          </div>

          <div className="comparison-table-wrapper" data-aos="fade-up" data-aos-delay="100">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th style={{ width: '40%' }}>Feature</th>
                  <th style={{ width: '30%' }}>RoomEase</th>
                  <th style={{ width: '30%' }}>Others</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Verified Profiles</td>
                  <td><Check className="text-teal mx-auto" aria-label="Yes" /></td>
                  <td><X className="text-danger mx-auto" aria-label="No" /></td>
                </tr>
                <tr>
                  <td>Compatibility Matching Algorithm</td>
                  <td><Check className="text-teal mx-auto" /></td>
                  <td><X className="text-danger mx-auto" /></td>
                </tr>
                <tr>
                  <td>Secure In-App Chat</td>
                  <td><Check className="text-teal mx-auto" /></td>
                  <td><X className="text-danger mx-auto" /></td>
                </tr>
                <tr>
                  <td>Behavioral Tags</td>
                  <td><Check className="text-teal mx-auto" /></td>
                  <td><X className="text-danger mx-auto" /></td>
                </tr>
                <tr>
                  <td>Privacy Protection</td>
                  <td><Check className="text-teal mx-auto" /></td>
                  <td><X className="text-danger mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-banner" data-aos="zoom-in">
            <h2 className="cta-title">Ready to Find Your Roomie?</h2>
            <p className="cta-text">Join thousands of students who have found their perfect match with RoomEase.</p>
            <button className="btn btn-primary" style={{ backgroundColor: 'white', color: '#14919B', border: 'none' }} onClick={() => navigate('/login-selection')}>
              Join RoomEase Today
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} RoomEase. All rights reserved.</p>
        </div>
      </footer>
    </div>

  );
}