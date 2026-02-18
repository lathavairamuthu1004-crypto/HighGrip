import React, { useState, useEffect } from "react";
import { FaQuoteRight, FaStar, FaHeartbeat, FaRunning, FaArrowRight } from 'react-icons/fa';
import Header from "../components/Header";
import SidebarFilters from "../components/SidebarFilters";
import Hero from "../components/Hero";
import CollectionGrid from "../components/CollectionGrid";
import ProductCard from "../components/ProductCard";
import API_BASE_URL from "../apiConfig";

import "./HomePage.css";

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    deals: [],
    delivery: [],
    maxPrice: 2000,
    minPrice: 0,
    minRating: 0,
    payOnDelivery: false
  });

  const reviews = [
    {
      id: 1,
      category: "Medical Trust",
      icon: <FaHeartbeat />,
      name: "Dr. Sarah Chen",
      role: "Physical Therapist",
      text: "The stability these socks provide for my elderly patients is unmatched. The biometric grip lock reduces slip risks significantly during recovery.",
      rating: 5
    },
    {
      id: 2,
      category: "Elite Sport",
      icon: <FaRunning />,
      name: "Marcus Thorne",
      role: "Pro Yoga Instructor",
      text: "Zero-slip performance even during the most intense transitions. The thermal breathability keeps my feet dry and grounded.",
      rating: 5
    },
    {
      id: 3,
      category: "Medical Trust",
      icon: <FaHeartbeat />,
      name: "James Wilson",
      role: "Post-Op Recovery",
      text: "After my knee surgery, these were a lifesaver. I felt secure walking on tiled floors at home without the fear of sliding.",
      rating: 5
    }
  ];

  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  useEffect(() => {
    let result = [...allProducts];
    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
      );
    }
    result = result.filter(p => p.price >= (filters.minPrice || 0) && p.price <= filters.maxPrice);
    if (filters.minRating > 0) {
      result = result.filter(p => (p.averageRating || 0) >= filters.minRating);
    }
    if (filters.deals.includes("republic")) {
      result = result.filter(p => p.discountPercent > 0 || p.tag === "Sale");
    }
    setFilteredProducts(result);
  }, [filters, searchTerm, allProducts]);

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="home">
      <Header onSearch={handleSearch} />
      <Hero />
      <CollectionGrid />

      {/* Main Shop Section */}
      <div id="shop-section" className="shop-layout container">
        <div className="mobile-filter-toggle">
          <button onClick={() => setShowMobileFilters(!showMobileFilters)}>
            {showMobileFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <SidebarFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          className={showMobileFilters ? "mobile-active" : ""}
        />

        <div className="shop-main">
          <section className="collection-compact">
            <p className="item-count">{filteredProducts.length} items found</p>
          </section>

          <section className="products-grid-container">
            {loading ? (
              <p>Loading products...</p>
            ) : filteredProducts.length === 0 ? (
              <div className="no-results">
                <h3>No products match your filters</h3>
              </div>
            ) : (
              <div className="products-view">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* --- MOTION REVIEW SECTION --- */}
      <section className="motion-review-section">
        <div className="bg-glow"></div>

        <div className="section-intro">
          <span className="premium-tag">Performance Validation</span>
          <h2 className="motion-title">Standard of <span className="italic-magenta">Excellence</span></h2>
        </div>

        <div className="motion-grid">
          {reviews.map((rev) => (
            <div className="parallax-card" key={rev.id}>
              <div className="card-inner-layer">
                <div className="card-top">
                  <div className="status-badge">
                    <span className="pulse-dot"></span>
                    {rev.category}
                  </div>
                  <div className="rev-icon-floating">{rev.icon}</div>
                </div>

                <div className="testimonial-text-box">
                  <FaQuoteRight className="quote-watermark" />
                  <p className="testimonial-para">"{rev.text}"</p>
                </div>

                <div className="card-footer-info">
                  <div className="user-details">
                    <h4 className="user-name-inter">{rev.name}</h4>
                    <p className="user-role-magenta">{rev.role}</p>
                  </div>
                  <div className="rating-stars-gold">
                    {[...Array(rev.rating)].map((_, i) => <FaStar key={i} />)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}

      <footer className="footer-site">
        <div className="footer-container">
          <div className="footer-column brand-col">
            <h4 className="footer-col-title">HIGHGRIP</h4>
            <p className="footer-address">
              Lakshmi Textile, Shed no 9,<br />
              SIDCO colony, Madurai main road,<br />
              Theni, Tamil Nadu, 625531
            </p>
          </div>

          <div className="footer-column">
            <h4 className="footer-col-title">QUICK LINKS</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/products">Our Products</a></li>
              <li><a href="/customer-service">FAQ</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-col-title">PRODUCTS</h4>
            <ul className="footer-links">
              <li><a href="/products/yoga">Yoga Socks</a></li>
              <li><a href="/products/compression">Compression Sleeves</a></li>
              <li><a href="/products/thigh-high">Thigh High Socks</a></li>
              <li><a href="/products/medical">Medical Stockings</a></li>
              <li><a href="/products/trampoline">Trampoline Socks</a></li>
              <li><a href="/products/ankle">Ankle Grip Socks</a></li>
              <li><a href="/products/knee-pads">Crawling Knee Pads</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-col-title">GET IN TOUCH</h4>
            <p className="footer-contact-text">
              If you have any enquiries, please do not hesitate to contact us.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyright © 2026 by Highgripsox. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

