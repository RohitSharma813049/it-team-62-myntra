import React, { useRef, useCallback, useEffect } from "react";
import Card from "../../Cards/cards";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductSlider = ({ data, title, category }) => {
  const scrollRef = useRef();
  const navigate = useNavigate();

  const scroll = useCallback((dir) => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      const end =
        el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;

      if (end) el.scrollTo({ left: 0, behavior: "smooth" });
      else el.scrollBy({ left: 300, behavior: "smooth" });
    }, 4000);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="relative py-6">

      {/* HEADER */}
      <div className="flex justify-between px-4 mb-3">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>

      {/* LEFT BTN */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 bg-white p-2 rounded-full shadow"
      >
        <FaChevronLeft />
      </button>

      {/* SLIDER */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-4 no-scrollbar"
      >
        {data.map((item) => (
          <div key={item.id} className="min-w-[200px]">
            <Card item={item} />
          </div>
        ))}
      </div>

      {/* RIGHT BTN */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 bg-white p-2 rounded-full shadow"
      >
        <FaChevronRight />
      </button>

    </div>
  );
};

export default ProductSlider;