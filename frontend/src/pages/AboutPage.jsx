import React, { useEffect } from 'react';
import Header from '../components/Header';
import './AboutPage.css';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page-wrapper">
      <Header />
      
      {/* 1. Pink Hero Banner */}
      <section className="pink-hero">
        <h1>About Us</h1>
        
      </section>

      {/* 2. Intro Section with Large Image */}
      <section className="section-container">
        <div className="intro-header">
          <div className="intro-title">
            <h2>Step with Confidence</h2>
            <p className="subtitle">The ultimate Grip Socks experience</p>
          </div>
          <div className="intro-text">
            <p>At Highgrip, we craft non-skid socks that combine functional traction with everyday comfort and durability. Designed with precision and purpose, our collections support active lifestyles and recovery—without compromising style.</p>
          </div>
        </div>
        
        <div className="full-width-image-wrapper">
          <img src="/sockss.png" alt="Highgrip Socks" />
        </div>
      </section>

      {/* 3. Light Blue Icon Bar */}
      <section className="icon-bar">
        <div className="container icon-grid">
          <div className="icon-item">
            <div className="icon-svg">🛋️</div>
            <h3>All-Day Comfort</h3>
            <p>Experience unmatched comfort that lasts from morning till night</p>
          </div>
          <div className="icon-item">
            <div className="icon-svg">🦶</div>
            <h3>Safe Grip Technology</h3>
            <p>Our advanced anti-skid and ankle-grip technology ensures a secure fit</p>
          </div>
          <div className="icon-item">
            <div className="icon-svg">🏅</div>
            <h3>Best Quality</h3>
            <p>Crafted with precision and care, our socks are made from the finest materials</p>
          </div>
          <div className="icon-item">
            <div className="icon-svg">🔄</div>
            <h3>Lasting performance</h3>
            <p>Built to go the distance, our socks maintain their fit, feel, and function over time.</p>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Section */}
      <section className="section-container why-choose">
        <h2 className="center-title">Why Choose Highgrip?</h2>
        <p className="center-desc">Because your safety and comfort shouldn't be compromised. Highgrip socks are designed to give you unbeatable traction, all-day comfort, and versatile style—no matter where life takes you.</p>
        
        <div className="split-grid">
          <div className="benefits-column">
            <div className="benefit-box">
              <h3>Non-Skid Grip Technology</h3>
              <p>Say goodbye to slips and falls. Our specially designed rubber grips provide excellent traction on smooth floors—perfect for home, hospital, or studio use.</p>
            </div>
            <div className="benefit-box">
              <h3>Style + Safety Combined</h3>
              <p>From ankle cuts to thigh-highs, we offer a range of designs that don't compromise on aesthetics—because safety can look good too.</p>
            </div>
            <div className="benefit-box">
              <h3>Trusted for Medical & Active Use</h3>
              <p>Recommended for seniors, patients, athletes, and everyday wear—Highgrip socks support your lifestyle with reliable performance.</p>
            </div>
            <div className="benefit-box">
              <h3>Versatile for Everyone</h3>
              <p>Whether you're practicing yoga, recovering in a hospital, chasing toddlers, or bouncing at a trampoline park—there's a Highgrip sock for you.</p>
            </div>
          </div>
          <div className="image-column">
            <img src="/yoga.png" alt="Yoga Lifestyle" className="rounded-img" />
          </div>
        </div>
      </section>

      {/* 5. Pink Testimonial Box */}
      <section className="section-container testimonial-outer">
        <div className="testimonial-pink-box">
          <div className="stars">★★★★★</div>
          <p className="testimonial-text">
            "As a fitness trainer, grip and stability are everything—especially during high-intensity workouts. Highgrip socks give me the traction I need without sacrificing comfort. They've become a must-have in my training gear."
          </p>
          <p className="author">Happy Customer</p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;