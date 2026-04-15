import React, { useState, useEffect } from "react";

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      title: "U.S. POLO ASSN.",
      subtitle: "Up to 50% Off",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      title: "Summer Collection",
      subtitle: "Flat 40% Off",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
      title: "New Arrivals",
      subtitle: "Shop Now",
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden cursor-pointer">

      {/* SLIDES */}
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-[350px] md:h-[450px] relative">
            
            <img
              src={slide.img}
              alt="slide"
              className="w-full h-full object-cover"
            />

            {/* TEXT OVERLAY */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 text-right">
              <h2 className="text-2xl md:text-4xl font-bold">
                {slide.title}
              </h2>
              <p className="text-lg mt-2">{slide.subtitle}</p>
              <button className="mt-4 px-4 py-2 bg-black text-white rounded">
                Shop Now
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* DOTS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              current === index ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;