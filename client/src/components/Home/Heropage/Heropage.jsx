import React, { useState, useEffect } from "react";

/* Other banners (can stay in assets) */
import banner2 from "../../../assets/banner2.jpg";
import banner3 from "../../../assets/banner3.jpg";

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      img: "/images/banner1.jpg", // 🔥 LCP image from public
      title: "U.S. POLO ASSN.",
      subtitle: "Up to 50% Off",
    },
    {
      id: 2,
      img: banner2,
      title: "Summer Collection",
      subtitle: "Flat 40% Off",
    },
    {
      id: 3,
      img: banner3,
      title: "New Arrivals",
      subtitle: "Shop Now",
    },
  ];

  const [current, setCurrent] = useState(0);

  /* ✅ Smooth auto-slide */
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full overflow-hidden group">

      {/* ✅ FIXED HEIGHT (prevents CLS) */}
      <div className="relative w-full aspect-[16/6]">

        {/* 🔥 FINAL LCP OPTIMIZED IMAGE */}
        <img
          src={slides[current].img}
          alt={slides[current].title}
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width="1200"
          height="450"
        />

        {/* ✅ Overlay (safe, no LCP issue) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />

        {/* ✅ Text */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 text-white max-w-md z-10">
          <h2 className="text-2xl md:text-4xl font-bold">
            {slides[current].title}
          </h2>
          <p className="mt-2 text-sm md:text-lg">
            {slides[current].subtitle}
          </p>
          <button className="mt-4 px-5 py-2 bg-pink-500 hover:bg-pink-600 rounded font-semibold">
            Shop Now
          </button>
        </div>
      </div>

      {/* ✅ Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
      >
        ›
      </button>

      {/* ✅ Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full cursor-pointer transition-all ${
              current === index ? "w-6 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;