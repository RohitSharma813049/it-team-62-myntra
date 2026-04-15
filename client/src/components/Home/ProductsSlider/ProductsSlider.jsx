import React, { useRef, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../Cards/cards";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductSlider = ({ data = [], title, category }) => {
  const scrollRef = useRef();
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  const scroll = useCallback((dir) => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isHovering) return;

    const interval = setInterval(() => {
      const end =
        el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;

      if (end) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 320, behavior: "smooth" });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [data, isHovering]);

  return (
    <div className="relative py-6 group">

      {/* HEADER */}
      <div className="flex justify-between items-center px-4 mb-4">

        <h2 className="text-xl md:text-2xl font-bold">
          {title}
        </h2>

        {/* 🔥 VIEW ALL BUTTON */}
        {category && (
          <button
            onClick={() =>
              navigate(`/search?query=${category}`)
            }
            className="text-sm text-pink-600 font-medium hover:underline"
          >
            View All →
          </button>
        )}

      </div>

      {/* LEFT BUTTON */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 
                   bg-white p-2 rounded-full shadow-md 
                   opacity-0 group-hover:opacity-100 transition z-10"
      >
        <FaChevronLeft />
      </button>

      {/* SLIDER */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="flex gap-4 overflow-x-auto px-4 no-scrollbar 
                   scroll-smooth snap-x snap-mandatory"
      >
        {data.map((item) => (
          <div
            key={item.id}
            className="min-w-[180px] md:min-w-[220px] snap-start"
          >
            <Card item={item} />
          </div>
        ))}
      </div>

      {/* RIGHT BUTTON */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 
                   bg-white p-2 rounded-full shadow-md 
                   opacity-0 group-hover:opacity-100 transition z-10"
      >
        <FaChevronRight />
      </button>

    </div>
  );
};

export default ProductSlider;