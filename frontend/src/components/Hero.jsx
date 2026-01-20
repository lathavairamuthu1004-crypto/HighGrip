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
    <section className="editorial-hero">
      {/* The Dynamic Color Background for wordings */}
      <div className="hero-color-base"></div>
      
      <div className="hero-inner" key={slide.id}>
        {/* Large Aesthetic Watermark */}
        <div className="hero-watermark">{slide.bgWord}</div>

        <div className="hero-main-grid">
          {/* 1. Wordings Section (Pink Background via CSS) */}
          <div className="hero-text-container">
            <div className="text-content">
              
              <h1 className="hero-title">
                {slide.title} <br />
                <span className="title-outline">{slide.highlight}</span>
              </h1>
              <p className="hero-description">{slide.desc}</p>
              
              <button className="hero-cta-button">
                Shop Collection 
              </button>
            </div>
          </div>

          {/* 2. Visual Section (White Background via CSS) */}
          <div className="hero-visual-container">
            <div className="image-wrapper">
              <img src={slide.img} alt={slide.title} className="product-image" />
              
              {/* Floating Info Badge */}
              
            </div>
          </div>
        </div>

        {/* Minimalist Navigation */}
        <div className="hero-pagination">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`pagination-line ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;