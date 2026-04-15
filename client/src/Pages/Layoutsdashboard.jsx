import React from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
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

  const linkClass = ({ isActive }) =>
    `block cursor-pointer text-sm py-1 transition ${
      isActive ? "text-pink-600 font-semibold" : "text-gray-600 hover:text-black"
    }`;

  return (
    <div className="bg-gray-100 min-h-screen flex">

      {/* ================= SIDEBAR ================= */}
      <div className="hidden md:block w-[260px] bg-white p-4 border-r h-screen sticky top-0 overflow-y-auto">

        <h2 className="font-semibold text-lg mb-4">
          My Account
        </h2>

        <div className="space-y-2">

          {/* OVERVIEW */}
          <NavLink
            to="/account"
            end
            className={linkClass}
          >
            Overview
          </NavLink>

          {/* MENU */}
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={linkClass}
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* LOGOUT */}
        <button
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded transition"
        >
          Logout
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 p-4 md:p-6">

        {/* TOP BAR */}
        <div className="bg-white p-4 mb-4 flex justify-between items-center shadow-sm rounded">

          <h2 className="font-semibold">
            Account Dashboard
          </h2>

          <button
            onClick={() => navigate("/account/profile")}
            className="border px-3 py-1 text-sm rounded hover:bg-gray-100 transition"
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