// components/Home/CategoriesSection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Men", query: "men" },
  { name: "Women", query: "women" },
  { name: "Kids", query: "kids" },
  { name: "Beauty", query: "beauty" },
  { name: "Shoes", query: "shoes" },
  { name: "Accessories", query: "accessories" },
];

const CategoriesSection = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4">
      <h2 className="text-lg font-bold mb-3">Top Categories</h2>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() =>
              navigate(`/search?query=${cat.query}`)
            }
            className="bg-white border rounded-lg p-3 text-center cursor-pointer active:scale-95 transition"
          >
            <p className="text-sm font-medium">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;