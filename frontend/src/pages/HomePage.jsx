import React from "react";
import "./HomePage.css";
import "../components/Header";

export default function Home() {
  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <h1>
            SAFETY,<br />
            REDEFINED.
          </h1>
          <p>
            Experience the next generation of grip technology.
            Engineered for athletes, designed for life.
          </p>
          <button className="primary-btn">Shop Collection</button>

          <div className="hero-stats">
            <div>
              <h3>10K+</h3>
              <span>Happy Athletes</span>
            </div>
            <div>
              <h3>99.8%</h3>
              <span>Satisfaction Rate</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <img src="/images/hero.png" alt="Hero Shoe" />
          <div className="iso-badge">
            Medical Grade <br />
            <strong>ISO CERTIFIED</strong>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="collection">
        <h2>EXPLORE COLLECTION</h2>
        <p>Seven innovative categories designed for maximum performance</p>

        <div className="collection-grid">
          <div className="big-card">
            <img src="/images/yoga.png" alt="Yoga Socks" />
            <span>Yoga Socks</span>
          </div>
          <div className="small-card">
            <img src="/images/compression.png" alt="Compression Socks" />
            <span>Compression</span>
          </div>
          <div className="small-card">
            <img src="/images/thigh.png" alt="Thigh High Socks" />
            <span>Thigh High</span>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="products">
        {[
          { img: "p1.png", score: "97/100", price: "$44.99", title: "Medical Recovery Socks" },
          { img: "p2.png", score: "94/100", price: "$27.99", title: "Trampoline Fitness Socks" },
          { img: "p3.png", score: "90/100", price: "$19.99", title: "Classic Grip Socks" },
        ].map((item, i) => (
          <div className="product-card" key={i}>
            <span className="score">{item.score}</span>
            <img src={`/images/${item.img}`} alt={item.title} />
            <h4>{item.title}</h4>
            <h3>{item.price}</h3>
            <p>Premium grip technology with medical-grade silicone.</p>
            <button>View Details</button>
          </div>
        ))}
      </section>

      {/* GRIP TECH */}
      <section className="grip">
        <h2>GRIP-TECH™</h2>
        <p>Revolutionary grip engineered for peak performance</p>

        <div className="grip-content">
          <img src="/images/chip.png" alt="Grip Chip" />
          <div>
            <div className="grip-box">
              <h4>Medical Grade Silicone</h4>
              <p>FDA-approved compound ensures superior traction.</p>
            </div>
            <div className="grip-box">
              <h4>Grip Lock Pattern</h4>
              <p>Hexagonal pattern delivers 3× more grip.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="proof">
        <h2>PROFESSIONAL PROOF</h2>
        <div className="proof-grid">
          <div className="proof-card">“Transformed my training completely.”</div>
          <div className="proof-card">“Doctor recommended – excellent quality.”</div>
          <div className="proof-card">“Perfect for yoga and workouts.”</div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div>
          <h2>500+</h2>
          <span>Athletes</span>
        </div>
        <div>
          <h2>50K+</h2>
          <span>Sold</span>
        </div>
        <div>
          <h2>4.9★</h2>
          <span>Rating</span>
        </div>
        <div>
          <h2>98%</h2>
          <span>Recommend</span>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <h3>HIGHGRIP</h3>
        <p>Redefining safety through innovative grip technology.</p>
      </footer>

    </div>
  );
}
