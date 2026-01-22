import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaFingerprint, FaSnowflake, FaGlobe } from 'react-icons/fa';
import Header from '../components/Header';
import './AboutPage.css';

const AboutPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="innovative-about">
      <Header />
      
      <section className="hero-split">
        <div className="hero-left">
          <div className="reveal-box">
            <span className="tagline">The Highgrip Ethos</span>
            <h1 className="split-h1">SAFETY, <br/><span className="outline">REDEFINED.</span></h1>
            <p className="hero-para">
              We don't just make socks. We engineer stability for the modern mover. 
              A worldwide fusion of performance tech and aesthetic luxury.
            </p>
            <div className="btn-group">
              <button className="cta-main" onClick={() => navigate('/home')}>
                Shop Collection <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-img-stack">
            <img src="/sockss.png" alt="Highgrip Product" className="img-main" />
            <div className="accent-square"></div>
          </div>
        </div>
      </section>

      <div className="brand-marquee">
        <div className="marquee-content">
          <span>HIGH-TRACTION</span>
          <span>•</span>
          <span>PREMIUM COTTON</span>
          <span>•</span>
          <span>ALL-DAY COMFORT</span>
          <span>•</span>
          <span>BEST QUALITY</span>
          <span>•</span>
          <span>LASTING PERFORMANCE</span>
          <span>•</span>
          <span>PREMIUM COTTON</span>
        </div>
      </div>

      <section className="vision-container">
        <div className="vision-layout">
          <div className="vision-card">
            <div className="card-inner">
              <FaFingerprint className="v-icon" />
              <h3>The Grip Lock</h3>
              <p>Our signature silicone pattern is inspired by biometric textures, ensuring zero-slip performance on every surface.</p>
            </div>
          </div>
          <div className="vision-card offset">
            <div className="card-inner">
              <FaSnowflake className="v-icon" />
              <h3>Thermal Breathability</h3>
              <p>Woven with aerated fibers to keep your feet at the perfect temperature, whether in a studio or at home.</p>
            </div>
          </div>
          <div className="vision-card">
            <div className="card-inner">
              <FaGlobe className="v-icon" />
              <h3>Universal Fit</h3>
              <p>Designed for the global anatomy. Stretching comfort that maintains its architectural integrity wash after wash.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="depth-section">
        <div className="depth-content">
          <div className="depth-text">
            <h2 className="depth-title">WHY MOVE WITH US?</h2>
            <p className="depth-intro">
              Because your safety and comfort shouldn’t be compromised. Highgrip socks are designed to give 
              you unbeatable traction, all-day comfort, and versatile style—no matter where life takes you.
            </p>
            
            <div className="depth-row">
              <div className="depth-col">
                <span className="num">01</span>
                <h4>Non-Skid Tech</h4>
                <p>Say goodbye to slips. Our rubber grips provide excellent traction on smooth floors—perfect for home or studio.</p>
              </div>
              <div className="depth-col">
                <span className="num">02</span>
                <h4>Style + Safety</h4>
                <p>From ankle cuts to thigh-highs, we offer a range of designs that don’t compromise on aesthetics.</p>
              </div>
              <div className="depth-col">
                <span className="num">03</span>
                <h4>Trusted Use</h4>
                <p>Recommended for seniors, patients, and athletes. Reliable performance for every lifestyle.</p>
              </div>
              <div className="depth-col">
                <span className="num">04</span>
                <h4>Versatile Flow</h4>
                <p>From yoga and chasing toddlers to hospital recovery or trampoline parks—there’s a Highgrip for you.</p>
              </div>
            </div>
          </div>
          
          <div className="depth-image-box">
            <img src="/highgrip.png" alt="Yoga Performance" className="depth-img" />
            
          </div>
        </div>
      </section>

      <section className="closing-statement">
        <div className="statement-inner">
          <p className="quote-text">"Movement is a right, stability is a necessity."</p>
          <span className="brand-signature">— HIGHGRIP COLLECTIVE</span>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;