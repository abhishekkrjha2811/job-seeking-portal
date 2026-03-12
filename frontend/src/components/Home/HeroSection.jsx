import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus, FaArrowRight, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import '../../css/HeroSection.css';

const HeroSection = () => {
  const statistics = [
    {
      id: 1,
      number: "1,23,441",
      label: "Live Jobs",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      number: "91,220",
      label: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      number: "2,34,200",
      label: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      number: "1,03,761",
      label: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  const trustedCompanies = [
    "Google", "Microsoft", "Apple", "Amazon", "Meta"
  ];

  return (
    <section className="hero-section">
      {/* Floating Background Elements */}
      <div className="hero-floating-element">💼</div>
      <div className="hero-floating-element">🚀</div>
      <div className="hero-floating-element">📊</div>
      <div className="hero-floating-element">🎯</div>

      <div className="hero-content">
        <div className="hero-main">
          <div className="hero-text">
            <p className="hero-subtitle">Professional Career Platform</p>
            <h1 className="hero-title">
              Find Your Dream Career
              <br />
              With Top Employers
            </h1>
            <p className="hero-description">
              Connect with leading companies and discover opportunities that match your skills, 
              experience, and career aspirations. Join thousands of professionals who have 
              found their perfect role through our platform.
            </p>
            
            <div className="hero-actions">
              <Link to="/jobs" className="hero-btn hero-btn-primary">
                <span>Explore Jobs</span>
                <FaArrowRight />
              </Link>
              <Link to="/register" className="hero-btn hero-btn-secondary">
                <FaPlay />
                <span>How it Works</span>
              </Link>
            </div>
          </div>
          
          <div className="hero-image">
            <img src="/heroS.jpg" alt="Professional career opportunities" />
          </div>
        </div>

        {/* Statistics Section */}
        <div className="hero-stats">
          {statistics.map((stat) => (
            <div className="hero-stat-card" key={stat.id}>
              <div className="hero-stat-icon">{stat.icon}</div>
              <div className="hero-stat-number">{stat.number}</div>
              <div className="hero-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="hero-trust">
          <p className="hero-trust-text">Trusted by professionals at</p>
          <div className="hero-trust-logos">
            {trustedCompanies.map((company, index) => (
              <div key={index} className="hero-trust-logo">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;