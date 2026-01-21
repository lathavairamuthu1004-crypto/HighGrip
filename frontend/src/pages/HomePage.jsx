
import Header from "../components/Header";
import FlashSaleBar from "../components/FlashSaleBar";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import { FaStar } from "react-icons/fa";
import "./HomePage.css";
import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [priceRange, setPriceRange] = useState(2000);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [minRating, setMinRating] = useState(0);


  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // Filter products based on selected categories (OR logic), search term, price, and rating
  const filteredProducts = products.filter(product => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const matchesSearch =
      (product.name || "").toLowerCase().includes(searchTerm.toLowerCase());

    const productPrice = Number(product.price);
    const matchesPrice = isNaN(productPrice) || productPrice <= priceRange;

    const matchesRating = (Number(product.averageRating) || 0) >= minRating;

    return matchesCategory && matchesSearch && matchesPrice && matchesRating;
  });

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to fetch products", err));

    fetch("http://localhost:5000/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Failed to fetch categories", err));
  }, []);

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange(2000);
    setMinRating(0);
    setSearchTerm("");
  };

  return (
    <div className="homepage">
      <Header onSearch={setSearchTerm} />
      <Hero />
      <FlashSaleBar />

      <div className="home-container container">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <div className="filter-group">
            <h3>Filters</h3>
            <div className="filter-section">
              <h4>Categories</h4>
              {categories.map((cat) => (
                <label key={cat._id} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.name)}
                    onChange={() => handleCategoryChange(cat.name)}
                  />
                  <span>{cat.name}</span>
                </label>
              ))}
            </div>

            <div className="filter-section">
              <h4>Price Range</h4>
              <input
                type="range"
                min="0"
                max="2000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="price-slider"
              />
              <div className="price-labels">
                <span>₹0</span>
                <span>₹{priceRange}</span>
                <span>₹2000</span>
              </div>
            </div>

            <div className="filter-section">
              <h4>Minimum Rating</h4>
              <div className="rating-filter">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="filter-checkbox">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === rating}
                      onChange={() => setMinRating(rating)}
                    />
                    <span className="stars-row">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={14}
                          color={i < rating ? "#fbbf24" : "#e5e7eb"}
                        />
                      ))}
                      <span className="up-text">& UP</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button className="clear-filter-btn" onClick={clearFilters}>
              Clear All Filters
            </button>
          </div>
        </aside>

        {/* Main Products Area */}
        <main className="main-content">
          <div className="content-header">
            <div className="header-info">
              <h2>All Products</h2>
              <span className="result-count">{filteredProducts.length} products found</span>
            </div>
            <div className="sort-box">
              <select defaultValue="featured">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="no-results">
              <p>No products match your current filters.</p>
              <button onClick={clearFilters}>Reset All Filters</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;
