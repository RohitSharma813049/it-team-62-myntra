import React from "react";

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl p-3 animate-pulse shadow-sm">
      
      {/* IMAGE */}
      <div className="w-full h-[220px] bg-gray-200 rounded-lg"></div>

      {/* TEXT */}
      <div className="mt-3 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>

        {/* PRICE */}
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>

        {/* RATING */}
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;