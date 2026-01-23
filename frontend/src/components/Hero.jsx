import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Hero.css";

// Assets
import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import hero3 from "../assets/hero3.png";

const slides = [
  {
    id: "01",
    tag: "PRO PERFORMANCE",
    title: "Enjoy the Ultimate",
    highlight: "Studio Experience",
    desc: "Redefining balance and stability with medical-grade biometric traction technology.",
    img: hero1,
  },
  {
    id: "02",
    tag: "PEDIATRIC SAFETY",
    title: "Safe Adventures for",
    highlight: "Little Feet",
    desc: "The world's most trusted non-slip technology for growing explorers.",
    img: hero2,
  },
  {
    id: "03",
    tag: "STABILITY+",
    title: "Confident Steps with",
    highlight: "Medical Precision",
    desc: "Engineered for rehabilitation and daily safety in every movement.",
    img: hero3,
  }
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  const handleNext = () => setIndex((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const scrollToShop = () => {
    const shopSection = document.getElementById("shop-section");
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="full-hero-carousel">
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`hero-slide ${i === index ? "active" : ""}`}
          style={{ backgroundImage: `url(${s.img})` }}
        >
          <div className="hero-overlay">
            <div className="hero-content container">
              <span className="hero-badge">{s.tag}</span>
              <h1 className="hero-title">
                {s.title} <br />
                <span className="hero-highlight">{s.highlight}</span>
              </h1>
              <p className="hero-desc">{s.desc}</p>
              <button className="shop-btn" onClick={scrollToShop}>
                SHOP COLLECTION
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <div className="carousel-nav">
        <button className="nav-arrow prev" onClick={handlePrev}><FaChevronLeft /></button>
        <button className="nav-arrow next" onClick={handleNext}><FaChevronRight /></button>
      </div>

      <div className="carousel-dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Hero;
