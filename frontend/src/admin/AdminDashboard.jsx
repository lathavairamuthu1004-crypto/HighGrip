import API_BASE_URL from '../apiConfig';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  Percent,
  PlusCircle,
  Layers,
  Headphones,
  LogOut,
} from "lucide-react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    discounts: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!token || !user || !user.isAdmin) {
      navigate("/login");
      return;
    }
    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const [productsRes, ordersRes] = await Promise.all([
        fetch("${API_BASE_URL}/products"),
        fetch("${API_BASE_URL}/admin/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const products = await productsRes.json();
      const ordersData = await ordersRes.json();

      const activeDiscounts = products.filter(
        (p) =>
          p.discountPercent > 0 &&
          new Date(p.discountStart) <= new Date() &&
          new Date(p.discountEnd) >= new Date()
      );

      setStats({
        products: products.length,
        orders: ordersData.orders.length,
        discounts: activeDiscounts.length,
      });
    } catch (err) {
      console.error("Failed to load dashboard stats", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) {
    return <div className="admin-loading">Loading dashboard...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-card">
        <div className="admin-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
            <img src="/logoo.png" alt="Logo" style={{ height: 60, width: 'auto' }} />
            <h2 style={{ margin: 0, fontSize: '32px' }}>Admin Dashboard</h2>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card green">
            <Package />
            <h3>{stats.products}</h3>
            <p>Total Products</p>
          </div>

          <div className="stat-card blue">
            <ShoppingBag />
            <h3>{stats.orders}</h3>
            <p>Placed Orders</p>
          </div>

          <div className="stat-card purple">
            <Percent />
            <h3>{stats.discounts}</h3>
            <p>Active Discounts</p>
          </div>
        </div>

        <div className="admin-actions-grid">
          <button onClick={() => navigate("/admin/add-category")}>
            <Layers /> Add Category
          </button>

          <button onClick={() => navigate("/admin/add-product")}>
            <PlusCircle /> Add Product
          </button>

          <button onClick={() => navigate("/admin/remove-product")}>
            <Package /> Manage Products
          </button>

          <button onClick={() => navigate("/admin/orders")}>
            <ShoppingBag /> Orders
          </button>

          <button onClick={() => navigate("/admin/support")}>
            <Headphones /> Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


