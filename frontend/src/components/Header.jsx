import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaHeart, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const Header = ({ onSearch }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const user = JSON.parse(localStorage.getItem("user"));
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Failed to fetch categories", err));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchValue);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="main-header">
      {/* 1. Top Bar */}
      <div className="top-utility-bar">
        <div className="container utility-flex">
          <div className="utility-left">
            <span>📍 Deliver to: <strong>New York 10001</strong></span>
          </div>
          <div className="utility-right">
            <Link to="/customer-service">Customer Service</Link>
            <Link to="/track-order">Track Order</Link>
            <Link to="/download-app">Download App</Link>
          </div>
        </div>
      </div>

      {/* 2. Middle Bar */}
      <div className="middle-header-bar">
        <div className="container middle-flex">
          <Link to="/home" className="logo-container">
            <img src="/logoo.png" alt="M&M Secret" className="brand-logo-img" />
          </Link>

          <form className="search-container" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search for products..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="header-search-input"
            />
            <button type="submit" className="header-search-btn">
              <FaSearch />
            </button>
          </form>

          <div className="header-actions">
            <Link to={user ? "/profile" : "/auth"} className="action-item">
              <FaUser />
              <span>{user ? user.name.split(" ")[0] : "Account"}</span>
            </Link>
            <Link to="/wishlist" className="action-item">
              <div className="icon-badge">
                <FaHeart />
                {wishlist.length > 0 && <span className="badge-count">{wishlist.length}</span>}
              </div>
              <span>Wishlist</span>
            </Link>
            <Link to="/cart" className="action-item">
              <div className="icon-badge">
                <FaShoppingCart />
                {cart.length > 0 && (
                  <span className="badge-count">{cart.reduce((sum, i) => sum + i.qty, 0)}</span>
                )}
              </div>
              <span>Cart</span>
            </Link>
            {user && (
              <button onClick={handleLogout} className="header-logout-btn">
                <FaTimes /> Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Navigation Bar */}
      <div className="navigation-bar">
        <div className="container nav-flex">
          <div className="all-categories-dropdown">
            <FaBars />
            <span>All Categories</span>
            <span className="dropdown-caret">▼</span>
          </div>
          <div className="nav-categories">
            {categories.slice(0, 5).map((cat, idx) => {
              const icons = ["💧", "🧼", "✨", "🌿", "🍵"];
              return (
                <Link key={cat._id} to={`/category/${cat.name}`} className="nav-cat-item">
                  <span className="cat-icon">{icons[idx] || "⭐"}</span>
                  {cat.name}
                </Link>
              );
            })}
            <div className="nav-divider"></div>
            <Link to="/about" className="nav-cat-item">About</Link>
            <Link to="/customer-service" className="nav-cat-item">FAQ</Link>
            <Link to="/contact" className="nav-cat-item">Contact Us</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;