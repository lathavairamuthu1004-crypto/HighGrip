import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import SidebarFilters from "../components/SidebarFilters";
import Hero from "../components/Hero"; // The new Hero
import CollectionGrid from "../components/CollectionGrid";
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

  // --- Logic remains untouched ---
  useEffect(() => {
    fetch("http://localhost:5000/products")
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

  return (
    <div className="home">
      <Header onSearch={handleSearch} />

      {/* Hero segregated here */}
      <Hero />

      {/* New Bento Collection Grid */}
      <CollectionGrid />

      {/* Main Shop Section with Sidebar - Grid logic untouched */}
      <div className="shop-layout container" style={{ display: 'flex', gap: '40px', padding: '40px 20px' }}>
        <SidebarFilters filters={filters} onFilterChange={handleFilterChange} />

        <div className="shop-main" style={{ flex: 1 }}>
          <section className="collection-compact" style={{ marginBottom: '40px' }}>
            <p style={{ color: '#64748b' }}>{filteredProducts.length} items found</p>
          </section>

          <section className="products-grid-container">
            {loading ? (
              <p>Loading products...</p>
            ) : filteredProducts.length === 0 ? (
              <div className="no-results" style={{ textAlign: 'center', padding: '100px 0' }}>
                <h3>No products match your filters</h3>
              </div>
            ) : (
              <div className="products-view" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '30px'
              }}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      <footer className="footer-modern" style={{ background: '#1a1a1a', color: 'white', padding: '60px', textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'Syncopate', letterSpacing: '10px' }}>HIGHGRIP</h3>
        <p>© 2026 Highgrip Safety Tech. All Rights Reserved.</p>
      </footer>
    </div>
  );
}