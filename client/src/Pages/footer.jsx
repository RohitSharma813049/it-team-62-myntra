import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const Footer = () => {
  const [open, setOpen] = useState(null);

  const toggle = (name) => {
    setOpen(open === name ? null : name);
  };

  const Section = ({ title, name, children }) => (
    <div className="border-b md:border-none py-3 md:py-0">

      {/* HEADER */}
      <div
        onClick={() => window.innerWidth < 768 && toggle(name)}
        className="flex justify-between items-center cursor-pointer md:cursor-default"
      >
        <h3 className="font-semibold text-sm tracking-wide">{title}</h3>

        {/* ICON */}
        <span className="md:hidden text-lg">
          {open === name ? <FiMinus /> : <FiPlus />}
        </span>
      </div>

      {/* CONTENT */}
      <div
        className={`text-sm text-gray-600 mt-2 space-y-1 transition-all duration-300 ${
          open === name ? "block" : "hidden md:block"
        }`}
      >
        {children}
      </div>
    </div>
  );

  return (
    <footer className="bg-gray-100 text-gray-700 mt-10">

      <div className="max-w-[1200px] mx-auto px-4 py-10">

        {/* GRID */}
        <div className="md:grid md:grid-cols-4 gap-10">

          <Section title="ONLINE SHOPPING" name="shop">
            <p className="hover:text-black cursor-pointer">Men</p>
            <p className="hover:text-black cursor-pointer">Women</p>
            <p className="hover:text-black cursor-pointer">Kids</p>
            <p className="hover:text-black cursor-pointer">Home</p>
            <p className="hover:text-black cursor-pointer">Beauty</p>
            <p className="hover:text-black cursor-pointer">Genz</p>
            <p className="hover:text-black cursor-pointer">Gift Cards</p>
            <p className="hover:text-black cursor-pointer">Myntra Insider</p>
          </Section>

          <Section title="USEFUL LINKS" name="links">
            <p>Blog</p><p>Careers</p><p>Site Map</p>
            <p>Corporate Information</p><p>Whitehat</p>
            <p>Cleartrip</p><p>Myntra Global</p>
          </Section>

          <Section title="CUSTOMER POLICIES" name="policy">
            <p>Contact Us</p><p>FAQ</p><p>T&C</p>
            <p>Terms Of Use</p><p>Track Orders</p>
            <p>Shipping</p><p>Cancellation</p>
            <p>Privacy Policy</p><p>Grievance Redressal</p>
          </Section>

          {/* APP + SOCIAL */}
          <div>
            <h3 className="font-semibold text-sm mb-2">EXPERIENCE MYNTRA APP</h3>
            <div className="flex gap-2">
              <div className="bg-black text-white px-3 py-1 text-xs rounded">
                Play Store
              </div>
              <div className="bg-black text-white px-3 py-1 text-xs rounded">
                App Store
              </div>
            </div>

            <h3 className="font-semibold text-sm mt-4 mb-2">KEEP IN TOUCH</h3>
            <p className="text-sm text-gray-600">
              Instagram • Facebook • Twitter
            </p>
          </div>

        </div>

        {/* GUARANTEE */}
        <div className="mt-8 text-sm text-gray-600 space-y-2 border-t pt-6">
          <p>✔ 100% ORIGINAL guarantee for all products</p>
          <p>✔ Return within 14 days of receiving your order</p>
        </div>

        {/* POPULAR SEARCHES */}
        <div className="mt-8 text-xs text-gray-600 leading-relaxed border-t pt-6">
          <span className="font-semibold">POPULAR SEARCHES: </span>
          Makeup Dresses T-Shirts Sandals Headphones Bags Sport Shoes
          Watches Kurtis Saree Lehenga Goggles Shoes Adidas Jewellery
        </div>

        {/* DESCRIPTION */}
        <div className="mt-10 text-xs text-gray-600 space-y-4 leading-relaxed border-t pt-6">

          <h3 className="font-semibold text-gray-800">
            ONLINE SHOPPING MADE EASY AT MYNTRA
          </h3>
          <p>
            Experience the best of online shopping for men, women and kids in India.
          </p>

          <h3 className="font-semibold text-gray-800">
            BEST ONLINE SHOPPING SITE IN INDIA
          </h3>
          <p>
            Myntra offers fashion and functionality for all categories.
          </p>

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