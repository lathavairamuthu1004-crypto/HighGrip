
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
      <Header cartCount={3} onSearch={setSearchTerm} />
      <Hero />
      <FlashSaleBar />

      <div className="home-container container">


        {/* Main Content */}
        <main className="main-content">

          {/* Featured Collections / Categories Layout */}
          {!searchTerm && !selectedCategories.length && (
            <div className="featured-categories-section">
              <div className="category-collection-grid">
                {products.map(p => (
                  <CategoryCard key={p._id} product={p} />
                ))}
              </div>
            </div>
          )}


        </main>
      </div>
    </div>
  );
};

export default HomePage;
