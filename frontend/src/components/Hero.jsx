import React, { useState, useEffect } from "react";
import "./hero.css";

const slides = [
  {
    id: "001",
    tag: "Performance Engineering",
    title: "ULTIMATE",
    highlight: "STABILITY",
    desc: "Engineered for high-intensity movement with medical-grade silicone traction.",
    img: "/assets/grounded.png", // Replace with your actual path
  },
  {
    id: "002",
    tag: "Pediatric Innovation",
    title: "GENTLE",
    highlight: "PROTECTION",
    desc: "The safest grip technology for the world's smallest explorers.",
    img: "/assets/kneeprotect.png",
  },
  {
    id: "003",
    tag: "Luxury Aesthetics",
    title: "DYNAMIC",
    highlight: "FLOW",
    desc: "360-degree node distribution meets premium compression knit fabric.",
    img: "/assets/anklegrip.png",
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
    <div className="hero-page-wrapper">
      {/* 1. SEPARATED HEADER SPACER */}
      <div className="header-offset"></div>

      <section className="modern-hero-section">
        <div className="hero-container" key={index}>
          
          {/* 2. THE CONTENT CARD (Glassmorphism) */}
          <div className="content-card">
            <div className="brand-overlay"></div>
            <div className="card-inner">
              <span className="modern-tag">{slide.tag}</span>
              <h1 className="modern-title">
                {slide.title} <br />
                <span className="weight-900">{slide.highlight}</span>
              </h1>
              <p className="modern-desc">{slide.desc}</p>
              <button className="modern-cta">SHOP COLLECTIONS</button>

              {/* 3. INTEGRATED THUMBNAILS (Reflecting the Canva Style) */}
              <div className="modern-thumbnails">
                {slides.map((s, i) => (
                  <div 
                    key={s.id} 
                    className={`thumb-node ${i === index ? "active" : ""}`}
                    onClick={() => setIndex(i)}
                  >
                    <img src={s.img} alt="nav" />
                    <span className="thumb-label">{s.id}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. THE PRODUCT STAGE (Realistic Depth) */}
          <div className="visual-stage">
            <div className="stage-bg"></div>
            <div className="image-wrapper">
              <img src={slide.img} alt={slide.title} className="hero-product-img" />
              <div className="realistic-shadow"></div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Hero;