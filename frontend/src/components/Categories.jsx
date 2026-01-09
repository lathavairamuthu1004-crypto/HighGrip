import { useEffect, useState } from "react";

export default function Categories() {
  const { categories } = require("../data/categories");

  return (
    <div className="categories">
      {/* Static header – keep this */}
      <span>☰ All Categories</span>

      {/* Dynamic categories from local data */}
      {categories.map((cat) => (
        <span key={cat.id}>
          {cat.icon} {cat.name}
        </span>
      ))}
    </div>
  );
}
