import React, { useState } from 'react';
import { useCart } from "../context/CartContext";
import { ChevronLeft, Lock, FileText } from 'lucide-react';
import { useNavigate, useLocation } from "react-router-dom";
import OrderReceipt from '../components/OrderReceipt';
import './Checkout.css';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  // Identify if this is a single item "Buy Now" or the full "Cart"
  const buyNowItem = location.state?.buyNowItem;
  const itemsToPurchase = buyNowItem ? [buyNowItem] : cart;

  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [showReceipt, setShowReceipt] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: ''
  });

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const shippingCosts = { standard: 0, express: 9.99, overnight: 24.99 };
  const subtotal = itemsToPurchase.reduce((acc, item) => acc + (Number(item.price) * Number(item.qty)), 0);
  const shippingCost = shippingCosts[selectedShipping];
  const tax = subtotal * 0.08;
  const total = subtotal + tax + shippingCost;

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please login to place an order");
      navigate("/login");
      return;
    }

    if (!shippingInfo.firstName || !shippingInfo.address || !shippingInfo.phone) {
      alert("Please fill in required shipping information");
      return;
    }

    try {
      const orderPromises = itemsToPurchase.map(item =>
        fetch("http://localhost:5000/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productName: item.name,
            productId: item._id || item.id,
            quantity: item.qty,
            price: Number(item.price) * Number(item.qty),
            userEmail: user.email,
            userName: user.name,
            phone: shippingInfo.phone,
            shippingAddress: shippingInfo,
            shippingMethod: selectedShipping,
            paymentMethod: selectedPayment,
            shippingCost: shippingCost / itemsToPurchase.length,
            tax: item.qty * (item.price * 0.08),
            totalAmount: (item.price * item.qty) + (item.qty * (item.price * 0.08)) + (shippingCost / itemsToPurchase.length),
            variation: item.variation || item.size || "Standard"
          })
        })
      );

      const responses = await Promise.all(orderPromises);
      const allSuccessful = responses.every(res => res.ok);

      if (allSuccessful) {
        console.log("Order Successful. Checking if cart should be cleared...");
        console.log("Is Buy Now?", !!buyNowItem);

        // ✅ REINFORCED CART CLEARING LOGIC
        if (!buyNowItem) {
          console.log("Triggering clearCart()...");
          clearCart(); // This calls the function in your CartContext
        }

        navigate('/order-success', { state: { purchasedItems: itemsToPurchase } });
      } else {
        alert("Server error occurred while saving orders.");
      }
    } catch (error) {
      console.error("Order process crashed:", error);
      alert("Failed to place order. Connection error.");
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="back-to-cart" onClick={() => navigate(-1)}>
          <ChevronLeft size={18} /> Back
        </div>

        <h1 className="checkout-title">Secure Checkout</h1>

        <div className="checkout-grid">
          <div className="checkout-main">
            {/* Step 1: Shipping */}
            <section className="checkout-card">
              <div className="step-header">
                <span className="step-num">1</span>
                <h3>Shipping Information</h3>
              </div>
              <div className="input-grid">
                <div className="field">
                  <label>First Name</label>
                  <input type="text" name="firstName" value={shippingInfo.firstName} onChange={handleShippingChange} required />
                </div>
                <div className="field">
                  <label>Last Name</label>
                  <input type="text" name="lastName" value={shippingInfo.lastName} onChange={handleShippingChange} />
                </div>
                <div className="field full">
                  <label>Email Address</label>
                  <input type="email" name="email" value={shippingInfo.email} onChange={handleShippingChange} required />
                </div>
                <div className="field full">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" value={shippingInfo.phone} onChange={handleShippingChange} required />
                </div>
                <div className="field full">
                  <label>Street Address</label>
                  <input type="text" name="address" value={shippingInfo.address} onChange={handleShippingChange} required />
                </div>
              </div>
            </section>

            {/* Step 2: Method */}
            <section className="checkout-card">
              <div className="step-header">
                <span className="step-num">2</span>
                <h3>Shipping Method</h3>
              </div>
              <div className="method-selection-container">
                {['standard', 'express', 'overnight'].map((m) => (
                  <label key={m} className={`method-option ${selectedShipping === m ? 'active' : ''}`}>
                    <input type="radio" name="shipping" onChange={() => setSelectedShipping(m)} checked={selectedShipping === m} />
                    <span className="custom-radio"></span>
                    <div className="method-details">
                      <span className="method-title">{m.charAt(0).toUpperCase() + m.slice(1)} Shipping</span>
                    </div>
                    <span className="method-price">{m === 'standard' ? 'FREE' : `₹${shippingCosts[m]}`}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Step 3: Payment */}
            {/* Step 3: Payment */}
<section className="checkout-card">
  <div className="step-header">
    <span className="step-num">3</span>
    <h3>Payment Method</h3>
  </div>

  <div className="payment-selection-container">

    {/* Card */}
    <label className={`method-option ${selectedPayment === 'card' ? 'active' : ''}`}>
      <input
        type="radio"
        name="payment"
        checked={selectedPayment === 'card'}
        onChange={() => setSelectedPayment('card')}
      />
      <span className="custom-radio"></span>
      <div className="method-details">
        <span className="method-title">Credit / Debit Card</span>
      </div>
      <div className="card-icons">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
      </div>
    </label>

    {/* Google Pay */}
    <label className={`method-option ${selectedPayment === 'gpay' ? 'active' : ''}`}>
      <input
        type="radio"
        name="payment"
        checked={selectedPayment === 'gpay'}
        onChange={() => setSelectedPayment('gpay')}
      />
      <span className="custom-radio"></span>
      <div className="method-details">
        <span className="method-title">Google Pay (UPI)</span>
      </div>
      <div className="card-icons">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg"
          alt="GPay"
          style={{ height: '16px' }}
        />
      </div>
    </label>

    {/* Apple Pay */}
    <label className={`method-option ${selectedPayment === 'apple' ? 'active' : ''}`}>
      <input
        type="radio"
        name="payment"
        checked={selectedPayment === 'apple'}
        onChange={() => setSelectedPayment('apple')}
      />
      <span className="custom-radio"></span>
      <div className="method-details">
        <span className="method-title">Apple Pay</span>
      </div>
      <div className="card-icons">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg"
          alt="Apple Pay"
          style={{ height: '18px' }}
        />
      </div>
    </label>

    {/* PayPal */}
    <label className={`method-option ${selectedPayment === 'paypal' ? 'active' : ''}`}>
      <input
        type="radio"
        name="payment"
        checked={selectedPayment === 'paypal'}
        onChange={() => setSelectedPayment('paypal')}
      />
      <span className="custom-radio"></span>
      <div className="method-details">
        <span className="method-title">PayPal</span>
      </div>
    </label>

    {/* Cash on Delivery */}
    <label className={`method-option ${selectedPayment === 'cod' ? 'active' : ''}`}>
      <input
        type="radio"
        name="payment"
        checked={selectedPayment === 'cod'}
        onChange={() => setSelectedPayment('cod')}
      />
      <span className="custom-radio"></span>
      <div className="method-details">
        <span className="method-title">Cash on Delivery (COD)</span>
        <p className="method-desc" style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0' }}>
          Pay when you receive the package
        </p>
      </div>
    </label>

  </div>
</section>

          </div>

          <aside className="checkout-sidebar">
            <div className="summary-card">
              <h3>Order Summary</h3>
              <div className="itemized-list">
                {itemsToPurchase.map((item, idx) => (
                  <div key={item._id || item.id || idx} className="summary-product">
                    <img src={item.image?.startsWith("/") ? `http://localhost:5000${item.image}` : item.image} alt={item.name} />
                    <div className="sp-details">
                      <p className="sp-name">{item.name}</p>
                      <p className="sp-qty">Qty: {item.qty} | {item.variation || item.size}</p>
                      <p className="sp-price">₹{(item.price * item.qty).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="summary-totals">
                <div className="total-row"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
                <div className="total-row"><span>Shipping</span><span>{shippingCost === 0 ? "FREE" : `₹${shippingCost.toFixed(2)}`}</span></div>
                <div className="total-row"><span>Tax (8%)</span><span>₹{tax.toFixed(2)}</span></div>
                <hr />
                <div className="total-row final"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
              </div>
              <div className="checkout-actions">
                <button className="place-order-btn" onClick={handlePlaceOrder}>
                  <Lock size={16} /> Confirm Order
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {showReceipt && (
        <OrderReceipt
          order={{ shippingAddress: shippingInfo, shippingMethod: selectedShipping, paymentMethod: selectedPayment, subtotal, shippingCost, tax, totalAmount: total }}
          items={itemsToPurchase}
          onClose={() => setShowReceipt(false)}
        />
      )}
    </div>
  );
};

export default Checkout;