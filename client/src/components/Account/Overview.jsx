import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBox,
  FaHeart,
  FaTag,
  FaCreditCard,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";

const Overview = () => {
  const navigate = useNavigate();

  const cards = [
    { title: "Orders", path: "orders", icon: <FaBox /> },
    { title: "Wishlist", path: "wishlist", icon: <FaHeart /> },
    { title: "Coupons", path: "coupons", icon: <FaTag /> },
    { title: "Saved Cards", path: "cards", icon: <FaCreditCard /> },
    { title: "Saved UPI", path: "vpa", icon: <FaCreditCard /> },
    { title: "Addresses", path: "address", icon: <FaMapMarkerAlt /> },
    { title: "Profile", path: "profile", icon: <FaUser /> },
  ];

  return (
    <div className="p-4">

      {/* 🔥 PROFILE SECTION */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-lg flex justify-between items-center mb-6 shadow-sm">
        <div>
          <h2 className="font-semibold text-lg">
            Welcome, User 👋
          </h2>
          <p className="text-sm text-gray-600">
            Manage your account & orders
          </p>
        </div>

        <button className="border px-4 py-2 rounded hover:bg-black hover:text-white transition">
          Edit Profile
        </button>
      </div>

      {/* 🔥 GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((c, i) => (
          <div
            key={i}
            onClick={() => navigate(`/account/${c.path}`)}
            className="bg-white border rounded-lg p-6 text-center cursor-pointer 
                       hover:shadow-lg hover:-translate-y-1 transition duration-300"
          >
            <div className="text-2xl mb-2 flex justify-center text-gray-700">
              {c.icon}
            </div>

            <h3 className="font-semibold">{c.title}</h3>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Overview;