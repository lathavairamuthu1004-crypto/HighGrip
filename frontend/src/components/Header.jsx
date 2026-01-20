import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaHeart, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const Header = ({ onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const navigate = useNavigate();
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  // Effect to handle scroll styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className={`main-header ${scrolled ? "header-scrolled" : ""}`}>
      {/* 1. Global Announcement Bar */}
      <div className="top-bar">
        <p>FREE SHIPPING ON ALL ORDERS OVER $50 • NEW COLLECTION 2026</p>
      </div>

      <nav className="navbar container">
        {/* 2. Logo - Perfectly aligned with Hero text gutter */}
        <div className="nav-left">
          <Link to="/home" className="brand-logo">
            <img src="/logoo.png" alt="HighGrip Logo" />
          </Link>
        </div>

        {/* 3. Center: Clean Typography Links */}
        <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <li><Link to="/home" className="nav-item">Home</Link></li>
          <li><Link to="/about" className="nav-item">About</Link></li>
          <li className="dropdown">
            <Link to="/products" className="nav-item">Our Products</Link>
          </li>
          <li><Link to="/about" className="nav-item">FAQ</Link></li>
          <li><Link to="/contact" className="nav-item">Contact Us</Link></li>
        </ul>

        {/* 4. Right: High-End Icon Set */}
        <div className="nav-right">
          <div className={`search-wrapper ${isSearchOpen ? "open" : ""}`}>
            <input 
              type="text" 
              placeholder="Search our collection..." 
              onChange={(e) => onSearch && onSearch(e.target.value)}
            />
            <FaSearch className="nav-icon-svg" onClick={() => setIsSearchOpen(!isSearchOpen)} />
          </div>

          <Link to="/wishlist" className="nav-icon">
            <FaHeart />
            {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
          </Link>

          <Link to="/cart" className="nav-icon">
            <FaShoppingCart />
            {cart.length > 0 && (
              <span className="badge">{cart.reduce((sum, i) => sum + i.qty, 0)}</span>
            )}
          </Link>

          <div className="user-utility">
             <Link to="/profile" className="nav-icon"><FaUser /></Link>
             <button onClick={handleLogout} className="minimal-logout">Logout</button>
          </div>

          <div className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;