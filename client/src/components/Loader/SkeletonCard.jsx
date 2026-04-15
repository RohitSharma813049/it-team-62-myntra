import React from "react";

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-lg p-2 md:p-3 shadow-sm">

      {/* IMAGE */}
      <div className="relative overflow-hidden rounded">
        <div className="w-full h-[160px] md:h-[220px] bg-gray-200" />

        {/* 🔥 SHIMMER */}
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r 
          from-transparent via-white/60 to-transparent" />
      </div>

      {/* TEXT */}
      <div className="mt-3 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-3/4 relative overflow-hidden">
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>

        <div className="h-3 bg-gray-200 rounded w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>

        {/* PRICE */}
        <div className="h-3 bg-gray-200 rounded w-1/3 relative overflow-hidden">
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;