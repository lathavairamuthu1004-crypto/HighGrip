import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
} from "lucide-react";
import "./Contact.css";
import Header from '../components/Header';
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSendMessage = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (!message.trim()) {
      alert("Please write a message");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: user.name,
          userEmail: user.email,
          message: message.trim(),
        }),
      });

      if (res.ok) {
        alert("Message sent successfully!");
        setMessage("");
      } else {
        alert("Failed to send message");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Error sending message");
    }
  };
  return (
    <div className="contact-page">
<Header />

      {/* Pink Banner */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p className="breadcrumb">
        <span onClick={() => navigate("/home")} className="home-link">
            Home
        </span>
        &nbsp;• Contact
        </p>

      </section>

      {/* CONTACT INFO SECTION */}
      <div className="contact-container">

        {/* LEFT GRID */}
        <div className="contact-info">

          <div className="info-card">
            <MapPin />
            <div>
              <h4>Address:</h4>
              <p>
                <strong>Highgrip</strong><br />
                Lakshmi Textile, Shed no 9,<br />
                SIDCO colony, Madurai main road,<br />
                Theni, Tamil Nadu, 625531
              </p>
            </div>
          </div>

          <div className="info-card">
            <Phone />
            <div>
              <h4>Call Us:</h4>
              <p>+91 86068 17667</p>
            </div>
          </div>

          <div className="info-card">
            <Mail />
            <div>
              <h4>Email:</h4>
              <p>info@highgripsox.com</p>
            </div>
          </div>

          <div className="info-card">
            <span className="globe">🌍</span>
            <div>
              <h4>Social:</h4>
              <div className="social-icons">
                <Facebook />
                <Instagram />
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT BLUE CARD */}
        <div className="contact-cta">
          <h2>Got questions or need help choosing the right grip?</h2>
          <p>We’d love to hear from you!</p>
          <button>Call Us</button>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="contact-footer">
        <div className="footer-cols">

          <div>
            <h3>HIGHGRIP</h3>
            <p>
              Lakshmi Textile, Shed no 9,<br />
              SIDCO colony, Madurai main road,<br />
              Theni, Tamil Nadu, 625531<br/>
            </p>
            
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Our Products</li>
              <li>FAQ</li>
              <li>Contact Us</li>
            </ul>
          </div>

          <div>
            <h4>Products</h4>
            <ul>
              <li>Yoga Socks</li>
              <li>Compression Sleeves</li>
              <li>Thigh High Socks</li>
              <li>Medical Stockings</li>
              <li>Trampoline Socks</li>
              <li>Ankle Grip Socks</li>
              <li>Crawling Knee Pads</li>
            </ul>
          </div>

          <div>
            <h4>Get in Touch</h4>
            <p>If you have any enquiries, please do not hesitate to contact us.</p>
          </div>

        </div>

        <p className="copyright">
          Copyright © 2025 by Highgripsox. All Rights Reserved.
        </p>
      </footer>

      {showLoginModal && (
        <div className="login-modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 420, width: '90%', background: '#fff0f6', border: '2px solid #ff8fb1', borderRadius: 12, padding: 20, textAlign: 'center' }}>
            <h3 style={{ marginTop: 0, color: '#d63384' }}>Please login to send a message</h3>
            <p style={{ color: '#6b7280' }}>You need to be signed in to contact us.</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 16 }}>
              <button onClick={() => { setShowLoginModal(false); navigate('/auth'); }} style={{ background: '#ff66a3', color: 'white', border: 'none', padding: '10px 14px', borderRadius: 8 }}>Login</button>
              <button onClick={() => setShowLoginModal(false)} style={{ background: 'transparent', border: '1px solid #ff8fb1', color: '#d63384', padding: '10px 14px', borderRadius: 8 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Contact;
