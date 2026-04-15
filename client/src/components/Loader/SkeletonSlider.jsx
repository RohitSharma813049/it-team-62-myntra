import React from "react";

const SkeletonSlider = ({ count = 6 }) => {
  return (
    <div className="px-4 py-6">
      
      {/* Title */}
      <div className="h-5 w-40 bg-gray-200 rounded mb-4 animate-pulse"></div>

      {/* Slider */}
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="
              min-w-[50%]
              sm:min-w-[33.33%]
              md:min-w-[25%]
              bg-white p-3 rounded-lg animate-pulse
            "
          >
            <div className="w-full h-[200px] bg-gray-200 rounded mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonSlider;