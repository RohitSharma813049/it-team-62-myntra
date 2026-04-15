import React from "react";
import { beautyData } from "../Data/BeautyData";

const BeautyPage = () => {
  return (
    <div className="p-4 pb-20">

      {/* HEADER */}
      <h2 className="text-xl font-bold mb-4">
        💄 Beauty Products
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">

        {beautyData.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg overflow-hidden bg-white shadow-sm cursor-pointer active:scale-95 transition"
          >

            {/* IMAGE */}
            <div className="h-32 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* INFO */}
            <div className="p-2">
              <p className="text-sm font-semibold truncate">
                {item.name}
              </p>

              {/* OPTIONAL PRICE */}
              {item.price && (
                <p className="text-xs text-gray-500">
                  ₹{item.price}
                </p>
              )}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default BeautyPage;