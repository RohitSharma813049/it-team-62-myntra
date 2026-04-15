import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/Slice/AuthSlice";
import { Link, useNavigate } from "react-router-dom";

const DesktopProfile = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const user = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => setIsProfileOpen(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsProfileOpen(true)}
      onMouseLeave={() => setIsProfileOpen(false)}
    >
      {/* ICON */}
      <div className="flex flex-col items-center cursor-pointer">
        <CiUser className="text-2xl" />
        <span className="hidden md:block text-sm">Profile</span>
      </div>

      {/* DROPDOWN */}
      {isProfileOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 top-12 w-64 bg-white shadow-xl rounded-lg p-4 z-50">

          {/* NOT LOGGED IN */}
          {!user && (
            <>
              <h3 className="font-semibold text-sm">Welcome</h3>
              <p className="text-xs text-gray-500 mb-3">
                To access account and manage orders
              </p>

              <Link to="/login" onClick={handleClick}>
                <button className="w-full border border-pink-500 text-pink-500 py-2 text-sm font-semibold rounded hover:bg-pink-50">
                  LOGIN / SIGNUP
                </button>
              </Link>

              <hr className="my-3" />

              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <Link to="/account/orders" onClick={handleClick}>
                    Orders
                  </Link>
                </li>
                <li>
                  <Link to="/account/wishlist" onClick={handleClick}>
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link to="/account/coupons" onClick={handleClick}>
                    Coupons
                  </Link>
                </li>
              </ul>
            </>
          )}

          {/* LOGGED IN */}
          {user && (
            <>
              <h3 className="font-semibold text-sm">
                Hello, {user?.input || "User"}
              </h3>

              <hr className="my-3" />

              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <Link to="/account/orders" onClick={handleClick}>
                    Orders
                  </Link>
                </li>
                <li>
                  <Link to="/account/wishlist" onClick={handleClick}>
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link to="/account/coupons" onClick={handleClick}>
                    Coupons
                  </Link>
                </li>
                <li>
                  <Link to="/account/cards" onClick={handleClick}>
                    Saved Cards
                  </Link>
                </li>
                <li>
                  <Link to="/account/vpa" onClick={handleClick}>
                    Saved VPA
                  </Link>
                </li>
                <li>
                  <Link to="/account/address" onClick={handleClick}>
                    Saved Addresses
                  </Link>
                </li>
              </ul>

              <hr className="my-3" />

              <button
                onClick={() => {
                  dispatch(logout());
                  navigate("/login"); // redirect after logout
                }}
                className="w-full text-left text-sm text-red-500 hover:underline"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DesktopProfile;