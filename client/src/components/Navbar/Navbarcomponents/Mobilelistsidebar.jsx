import React, { useEffect, useState } from "react";
import { categoriesData } from "../../../Data/Catogery";
import { PiListThin } from "react-icons/pi";
import { IoClose, IoChevronForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Mobilelistsidebar = () => {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const navigate = useNavigate();

  // 🔥 safer scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeSidebar = () => {
    setOpen(false);
    setActiveCategory(null);
  };

  const handleNavigate = (item) => {
    navigate(`/search?query=${encodeURIComponent(item)}`);
    closeSidebar();
  };

  return (
    <>
      {/* MENU ICON */}
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        <PiListThin className="text-2xl" />
      </div>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      />

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] bg-white z-50 shadow-lg transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg">
            {activeCategory?.name || "Menu"}
          </h2>

          <IoClose
            className="text-2xl cursor-pointer"
            onClick={closeSidebar}
          />
        </div>

        {/* MAIN CATEGORY LIST */}
        {!activeCategory && (
          <div className="p-4 space-y-4">
            {categoriesData.map((cat) => (
              <div
                key={cat.id}
                className="flex justify-between items-center cursor-pointer font-medium active:scale-95 transition"
                onClick={() => setActiveCategory(cat)}
              >
                {cat.name}
                <IoChevronForward />
              </div>
            ))}
          </div>
        )}

        {/* SUB CATEGORY ITEMS */}
        {activeCategory && (
          <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
            
            {/* BACK BUTTON */}
            <button
              className="text-pink-500 mb-4 text-sm active:scale-95 transition"
              onClick={() => setActiveCategory(null)}
            >
              ← Back
            </button>

            {activeCategory.sections?.map((section, i) => (
              <div key={i} className="mb-5">
                <h3 className="font-semibold mb-2">
                  {section.title}
                </h3>

                <div className="space-y-2">
                  {section.items?.map((item, j) => (
                    <div
                      key={j}
                      className="text-sm cursor-pointer hover:text-pink-500 active:scale-95 transition"
                      onClick={() => handleNavigate(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Mobilelistsidebar;