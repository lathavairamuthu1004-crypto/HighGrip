import API_BASE_URL from '../apiConfig';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]); // ✅ New state

  const adminEmail = "admin@gmail.com";
  const navigate = useNavigate();

  useEffect(() => {
    fetch("${API_BASE_URL}/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("category", form.category);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("email", adminEmail);
    formData.append("image", image); // 🔥 IMPORTANT

    // Append Gallery Images
    for (let i = 0; i < galleryImages.length; i++) {
      formData.append("galleryImages", galleryImages[i]);
    }

    const token = localStorage.getItem("token");

    const res = await fetch("${API_BASE_URL}/admin/product", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData,
    });

    if (res.ok) {
      alert("Product Added Successfully!");
      navigate(-1);
    } else {
      const data = await res.json();
      alert(data.message || "Failed to add product");
    }
  };

  return (
    <div className="add-product-page">

      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2>Add Product</h2>

      <div className="product-form">

        <input
          placeholder="Product name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <select
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c._id} value={c.name}>{c.name}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        {/* Image Upload */}
        <label className="upload-label">Upload Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {/* Gallery Images Upload */}
        <label className="upload-label">Upload Additional Images (Gallery)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setGalleryImages(e.target.files)}
        />

        <textarea
          placeholder="Description"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button onClick={handleSubmit}>Add Product</button>
      </div>
    </div>
  );
};

export default AddProduct;


