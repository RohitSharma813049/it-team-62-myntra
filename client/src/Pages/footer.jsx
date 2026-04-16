import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  const [open, setOpen] = useState(null);

  const toggle = (name) => {
    setOpen((prev) => (prev === name ? null : name));
  };

  const Section = ({ title, name, children }) => (
    <div className="border-b md:border-none py-3 md:py-0">

      {/* HEADER */}
      <button
        onClick={() => toggle(name)}
        className="w-full flex justify-between items-center text-left"
        aria-expanded={open === name}
      >
        <h3 className="font-semibold text-sm tracking-wide">
          {title}
        </h3>

        <span className="md:hidden text-lg">
          {open === name ? <FiMinus /> : <FiPlus />}
        </span>
      </button>

      {/* CONTENT */}
      <div
        className={`text-sm text-gray-600 mt-2 transition-all duration-300 ${
          open === name ? "block" : "hidden md:block"
        }`}
      >
        {children}
      </div>
    </div>
  );

  return (
    <footer className="bg-gray-100 text-gray-700 pt-10 border-t">

      <div className="max-w-[1200px] mx-auto px-4 py-10">

        {/* GRID */}
        <div className="md:grid md:grid-cols-4 gap-10">

          {/* ONLINE SHOPPING */}
          <Section title="ONLINE SHOPPING" name="shop">
            <ul className="space-y-1">
              <li><Link to="/men" className="hover:text-black">Men</Link></li>
              <li><Link to="/women" className="hover:text-black">Women</Link></li>
              <li><Link to="/kids" className="hover:text-black">Kids</Link></li>
              <li><Link to="/home" className="hover:text-black">Home</Link></li>
              <li><Link to="/beauty" className="hover:text-black">Beauty</Link></li>
              <li><Link to="/genz" className="hover:text-black">Genz</Link></li>
              <li><Link to="/gift-cards" className="hover:text-black">Gift Cards</Link></li>
              <li><Link to="/insider" className="hover:text-black">Myntra Insider</Link></li>
            </ul>
          </Section>

          {/* USEFUL LINKS */}
          <Section title="USEFUL LINKS" name="links">
            <ul className="space-y-1">
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/sitemap">Site Map</Link></li>
              <li><Link to="/corporate">Corporate Information</Link></li>
              <li><Link to="/whitehat">Whitehat</Link></li>
              <li><Link to="/cleartrip">Cleartrip</Link></li>
              <li><Link to="/global">Myntra Global</Link></li>
            </ul>
          </Section>

          {/* CUSTOMER POLICIES */}
          <Section title="CUSTOMER POLICIES" name="policy">
            <ul className="space-y-1">
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/terms">T&C</Link></li>
              <li><Link to="/terms-of-use">Terms Of Use</Link></li>
              <li><Link to="/track-orders">Track Orders</Link></li>
              <li><Link to="/shipping">Shipping</Link></li>
              <li><Link to="/cancellation">Cancellation</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/grievance">Grievance Redressal</Link></li>
            </ul>
          </Section>

          {/* APP + SOCIAL */}
          <div>
            <h3 className="font-semibold text-sm mb-2">
              EXPERIENCE MYNTRA APP
            </h3>

            <div className="flex gap-2">
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noreferrer"
                className="bg-black text-white px-3 py-1 text-xs rounded"
              >
                Play Store
              </a>
              <a
                href="https://apple.com/app-store"
                target="_blank"
                rel="noreferrer"
                className="bg-black text-white px-3 py-1 text-xs rounded"
              >
                App Store
              </a>
            </div>

            <h3 className="font-semibold text-sm mt-4 mb-2">
              KEEP IN TOUCH
            </h3>

            <div className="flex gap-3 text-sm">
              <a href="#" className="hover:text-black">Instagram</a>
              <a href="#" className="hover:text-black">Facebook</a>
              <a href="#" className="hover:text-black">Twitter</a>
            </div>
          </div>

        </div>

        {/* GUARANTEE */}
 <div className="mt-8 border-t pt-6">
  <ul className="text-sm text-gray-600 space-y-3">

    {/* ITEM 1 */}
    <li className="flex items-start gap-3">
      <span className="text-green-600 text-base font-bold mt-[2px]">
        ✔
      </span>
      <p>
        <span className="font-semibold text-gray-800">
          100% ORIGINAL
        </span>{" "}
        guarantee for all products
      </p>
    </li>

    {/* ITEM 2 */}
    <li className="flex items-start gap-3">
      <span className="text-green-600 text-base font-bold mt-[2px]">
        ✔
      </span>
      <p>
        <span className="font-semibold text-gray-800">
          Return within 14 days
        </span>{" "}
        of receiving your order
      </p>
    </li>

  </ul>
</div>

        {/* POPULAR SEARCHES */}
        <div className="mt-8 text-xs text-gray-600 leading-relaxed border-t pt-6">
          <span className="font-semibold">POPULAR SEARCHES: </span>
          Makeup Dresses T-Shirts Sandals Headphones Bags Sport Shoes Watches
          Kurtis Saree Lehenga Goggles Shoes Adidas Jewellery
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t text-xs text-gray-500 py-6 text-center px-4">
        © 2026 www.myntra.com. All rights reserved. A Flipkart company
      </div>

    </footer>
  );
};

export default Footer;