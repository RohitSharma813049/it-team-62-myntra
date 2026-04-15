import React from "react";
import { beautyData } from "../Data/BeautyData";

const BeautyPage = () => {
  return (
    <div className="p-4 pb-20">
      <h2 className="text-xl font-bold mb-4">
        💄 Beauty Products
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {beautyData.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-2"
          >
            <img
              src={item.image}
              className="w-full h-32 object-cover rounded"
            />
            <p className="text-sm font-semibold mt-2">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeautyPage;