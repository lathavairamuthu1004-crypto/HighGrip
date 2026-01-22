import React, { useState, useEffect } from "react";
import "./hero.css";

const slides = [
  {
    id: "01",
    tag: "MEDICAL GRADE STABILITY",
    title: "MAXIMUM",
    highlight: "TRACTION",
    desc: "Engineered with revolutionary non-slip technology for high-intensity athletes and patient recovery stages.",
    img: "/assets/grounded.png",
  },
  {
    id: "02",
    tag: "PEDIATRIC SAFETY TECH",
    title: "SENSORY",
    highlight: "COMFORT",
    desc: "The gold standard in pediatric stability. Maximum traction for crawling and early development stages.",
    img: "/assets/kneeprotect.png",
  },
  {
    id: "03",
    tag: "ELITE PERFORMANCE",
    title: "DYNAMIC",
    highlight: "POWER",
    desc: "Our signature compression-knit design with 360° silicone node technology for all-day confidence.",
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
    <section className="unified-hero">
      {/* Ghost text background fills the gap between text and image */}
      <div className="bg-watermark">{slide.highlight}</div>

      <div className="hero-grid" key={index}>
        
        {/* Left Side: Typography */}
        <div className="text-canvas">
          <div className="stagger-container">
            <span className="premium-tag">{slide.tag}</span>
            
            <h1 className="hero-title">
              <span className="block-text">{slide.title}</span>
              <span className="outline-text">{slide.highlight}</span>
            </h1>
            
            <p className="hero-description">{slide.desc}</p>
            
            <div className="hero-footer">
              <button className="cta-primary">Explore Collection</button>
              
              <div className="step-indicator">
                <span className="active-idx">0{index + 1}</span>
                <div className="progress-line">
                  <div className="progress-fill"></div>
                </div>
                <span className="total-idx">0{slides.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Medical/Sport Hexagon Mask */}
        <div className="visual-canvas">
          <div className="medical-shaper">
            <div className="image-mask">
               <img src={slide.img} alt={slide.title} className="hero-main-img" />
            </div>
          </div>
          
          <div className="side-dots">
            {slides.map((_, i) => (
              <div 
                key={i} 
                className={`dot-item ${i === index ? "active" : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;