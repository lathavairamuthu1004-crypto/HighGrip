import React, { useState } from "react";
import { FaHeart, FaEye, FaShoppingCart, FaStar } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [showAdded, setShowAdded] = useState(false);
  const [showWishAdded, setShowWishAdded] = useState(false);

  const isWishlisted = wishlist.some(p => p._id === product._id);

  const handleAddToCart = () => {
    addToCart(product);
    setShowAdded(true);
    setTimeout(() => {
      setShowAdded(false);
      if (location.pathname === "/wishlist") navigate("/cart");
    }, 1500);
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
      setShowWishAdded(true);
      setTimeout(() => setShowWishAdded(false), 1500);
    }
  };
  const now = new Date();

const discountActive =
  product.discountPercent > 0 &&
  product.discountStart &&
  product.discountEnd &&
  now >= new Date(product.discountStart) &&
  now <= new Date(product.discountEnd);

const discountedPrice = discountActive
  ? Math.round(product.price - (product.price * product.discountPercent) / 100)
  : product.price;


  return (
    <div className="card">
      <div className="image-box">
        <button className={`wishlist-btn ${isWishlisted ? "liked" : ""}`} onClick={toggleWishlist} title="Add to wishlist">
          <FaHeart />
        </button>

        <button className="cart-overlay-btn" onClick={handleAddToCart} title="Add to cart">
          <FaShoppingCart />
        </button>

        <img src={`http://localhost:5000${product.image}`} alt={product.name} />

        {showAdded && <div className="added-toast">Product added to cart</div>}
        {showWishAdded && <div className="added-toast">Added to wishlist</div>}

        <div className="overlay-actions">
          <button className="quick-view-btn" onClick={() => navigate(`/product/${product._id}`)}>
            <FaEye /> Quick View
          </button>
        </div>
      </div>

      <div className="card-info">
        <h4>{product.name}</h4>
        <div className="rating-container" style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
          <div className="stars" style={{ color: '#fbbf24', display: 'flex' }}>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={14} color={i < Math.round(product.averageRating || 0) ? "#fbbf24" : "#e5e7eb"} />
            ))}
          </div>
          <span style={{ fontSize: '0.8rem', color: '#666' }}>({product.ratingCount || 0})</span>
        </div>
        <div className="price-box">
  {discountActive ? (
    <>
      <span className="original-price">₹{product.price}</span>
      <span className="discounted-price">₹{discountedPrice}</span>
    </>
  ) : (
    <span className="normal-price">₹{product.price} </span>
  )}
</div>
      </div>
    </div>
  );
};

export default ProductCard;