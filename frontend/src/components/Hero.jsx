import React, { useEffect, useState, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import "./hero.css";

const slides = [
  {
    id: "01",
    title: "Stay Grounded. ",
    highlight: "Move Freely",
    desc: "Engineered with revolutionary non-slip technology, Highgrip keeps you firmly in place during every movement.",
    img: "/assets/grounded.png",
    bgWord: "GRIP"
  },
  {
    id: "02",
    title: "Baby Comfort.",
    highlight: "Safe Steps",
    desc: "Maximum protection for crawling stages. Safety meets style for your little ones' first adventures.",
    img: "/assets/kneeprotect.png",
    bgWord: "SAFE"
  },
  {
    id: "03", // Unique ID ensures the 3rd slide triggers
    title: "Ankle Grip.",
    highlight: "Daily Power",
    desc: "The signature range: where performance and daily comfort meet seamlessly in a classic design.",
    img: "/assets/anklegrip.png",
    bgWord: "ELITE"
  }
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <section className="professional-hero">
      <div className="hero-grid container">
        {/* Left Content */}
        <div className="hero-content">
          <div className="hero-badge">New Arrivals 2026</div>
          <h1 className="hero-main-title">
            Discover Your <br />
            <span className="highlight-text">Premium Collection</span>
          </h1>
          <p className="hero-subline">
            Explore premium products with exclusive deals and fast delivery.
            Quality guaranteed for your daily lifestyle.
          </p>
          <div className="hero-button-group">
            <button className="hero-btn-primary">
              Shop Now <FaArrowRight />
            </button>
            <button className="hero-btn-secondary">
              View Deals
            </button>
          </div>
        </div>

        {/* Right Visual */}
        <div className="hero-visual">
          <div className="organic-shape">
            <img src="/assets/grounded.png" alt="Featured Product" className="main-hero-img" />

            {/* Floating Info Card */}
            <div className="floating-info-card">
              <div className="info-content">
                <strong>Quality Guaranteed</strong>
                <p>100% Premium</p>
              </div>
              <button className="mini-shop-btn">Shop</button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Pagination (Simplified for now) */}
      <div className="hero-simple-pagination">
        <span className="dot active"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </section>
  );
};

export default Hero;