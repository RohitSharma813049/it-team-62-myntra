import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/Slice/AuthSlice";

const Layoutsdashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menu = [
    { name: "Orders", path: "/account/orders" },
    { name: "Wishlist", path: "/account/wishlist" },
    { name: "Coupons", path: "/account/coupons" },
    { name: "Saved Cards", path: "/account/cards" },
    { name: "Saved UPI", path: "/account/vpa" },
    { name: "Addresses", path: "/account/address" },
    { name: "Profile", path: "/account/profile" },
    { name: "Cart", path: "/account/cart" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex">

      {/* ================= SIDEBAR ================= */}
      <div className="hidden md:block w-[260px] bg-white p-4 border-r">

        <h2 className="font-semibold text-lg mb-4">
          My Account
        </h2>

        <div className="space-y-2 text-gray-600 text-sm">

          <p
            onClick={() => navigate("/account")}
            className="cursor-pointer font-medium text-pink-600"
          >
            Overview
          </p>

          {menu.map((item) => (
            <p
              key={item.path}
              onClick={() => navigate(item.path)}
              className="cursor-pointer hover:text-black"
            >
              {item.name}
            </p>
          ))}
        </div>

        <button
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
          className="mt-6 bg-red-500 text-white w-full py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 p-4 md:p-6">

        {/* TOP BAR */}
        <div className="bg-white p-4 mb-4 flex justify-between items-center shadow-sm rounded">
          <h2 className="font-semibold">Account Dashboard</h2>

          <button
            onClick={() => navigate("/account/profile")}
            className="border px-3 py-1 text-sm rounded hover:bg-gray-100"
          >
            Edit Profile
          </button>
        </div>

        {/* ROUTE CONTENT */}
        <Outlet />

      </div>
    </div>
  );
};

export default Layoutsdashboard;