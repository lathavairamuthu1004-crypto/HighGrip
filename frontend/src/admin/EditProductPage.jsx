import API_BASE_URL from '../apiConfig';
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./EditProductPage.css";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const location = useLocation();
  const isDiscountTab = new URLSearchParams(location.search).get("tab") === "discount";

  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    discountPercent: 0,
    discountStart: "",
    discountEnd: "",
  });
  useEffect(() => {
    fetch("${API_BASE_URL}/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Failed to fetch categories", err));
  }, []);
  
  useEffect(() => {
    fetch(`${API_BASE_URL}/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          ...data,
          discountStart: data.discountStart ? data.discountStart.slice(0, 16) : "",
          discountEnd: data.discountEnd ? data.discountEnd.slice(0, 16) : "",
        });
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send only required fields
    const payload = isDiscountTab
      ? {
          discountPercent: form.discountPercent,
          discountStart: form.discountStart,
          discountEnd: form.discountEnd,
        }
      : {
          name: form.name,
          category: form.category,
          price: form.price,
          description: form.description,
        };

    const res = await fetch(`${API_BASE_URL}/admin/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert(isDiscountTab ? "Discount updated" : "Product updated");
      navigate("/admin/remove-product");
    }
  };
  const discountedPrice =
  form.price && form.discountPercent
    ? (
        form.price -
        (form.price * form.discountPercent) / 100
      ).toFixed(2)
    : "";

  return (
    <div className="edit-container">
        <h1 className ="heading">{isDiscountTab ? "Manage Discount" : "Edit Product"}</h1>
        <button     className="back-btn"    onClick={() => navigate(-1)}> ← Back </button>

      

      <form className="edit-form" onSubmit={handleSubmit}>
      {!isDiscountTab && (
  <>
    <label>Product Name</label>
    <input
      name="name"
      value={form.name}
      onChange={handleChange}
      required
    />

    <label>Category</label>
    <select
      name="category"
      value={form.category}
      onChange={handleChange}
      required
    >
      <option value="">Select Category</option>
      {categories.map((cat) => (
        <option key={cat._id} value={cat.name}>
          {cat.name}
        </option>
      ))}
    </select>

    <label>Price</label>
    <input
      type="number"
      name="price"
      value={form.price}
      onChange={handleChange}
      required
    />

    <label>Description</label>
    <textarea
      name="description"
      value={form.description}
      onChange={handleChange}
    />
  </>
)}

{isDiscountTab && (
  <>
    {/* Original Price */}
    <label>Original Price</label>
    <input
      type="number"
      value={form.price}
      disabled
    />

    {/* Discount Percentage */}
    <label>Discount Percentage (%)</label>
    <input
      type="number"
      name="discountPercent"
      value={form.discountPercent}
      onChange={handleChange}
      min="0"
      max="100"
    />

    {/* Discounted Price */}
    <label>Discounted Price</label>
    <input
      type="number"
      value={discountedPrice}
      disabled
    />

    {/* Discount Start */}
    <label>Discount Start</label>
    <input
      type="datetime-local"
      name="discountStart"
      value={form.discountStart}
      onChange={handleChange}
    />

    {/* Discount End */}
    <label>Discount End</label>
    <input
      type="datetime-local"
      name="discountEnd"
      value={form.discountEnd}
      onChange={handleChange}
    />
  </>
)}


        <button type="submit" className="save-btn">Save</button>
      </form>
    </div>
  );
};

export default EditProductPage;


