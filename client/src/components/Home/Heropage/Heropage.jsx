import React, { useState, useEffect } from "react";

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1200&q=70",
      title: "U.S. POLO ASSN.",
      subtitle: "Up to 50% Off",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=70",
      title: "Summer Collection",
      subtitle: "Flat 40% Off",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=70",
      title: "New Arrivals",
      subtitle: "Shop Now",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStart(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!start) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [start]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full overflow-hidden group">

      {/* SLIDES */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="min-w-full aspect-[16/6] relative">

            {/* IMAGE */}
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "low"}
              width="1200"
              height="450"
            />

            {/* 🔥 GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

            {/* TEXT */}
            <div className="absolute left-10 top-1/2 -translate-y-1/2 text-white max-w-md">
              <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                {slide.title}
              </h2>

              <p className="mt-2 text-sm md:text-lg opacity-90">
                {slide.subtitle}
              </p>

              <button className="mt-4 px-5 py-2 bg-pink-500 hover:bg-pink-600 rounded font-semibold transition">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 ARROWS */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 
                   p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 
                   p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
      >
        ›
      </button>

      {/* 🔥 DOTS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full cursor-pointer transition-all ${
              current === index
                ? "w-6 bg-white"
                : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>

    </div>
  );
};

export default HeroSlider;