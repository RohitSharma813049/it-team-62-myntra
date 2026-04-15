import React from "react";

const Coupons = () => {
  const coupons = [
    {
      id: 1,
      code: "SAVE10",
      discount: "10% OFF",
      desc: "On minimum purchase of ₹999",
      color: "bg-pink-500",
    },
    {
      id: 2,
      code: "FLAT200",
      discount: "₹200 OFF",
      desc: "On orders above ₹1499",
      color: "bg-green-500",
    },
    {
      id: 3,
      code: "WELCOME50",
      discount: "₹50 OFF",
      desc: "First order only",
      color: "bg-blue-500",
    },
  ];

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`${code} copied!`);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* HEADER */}
      <h2 className="text-2xl font-bold mb-6">
        🎁 Your Coupons
      </h2>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-4">

        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >

            {/* BADGE */}
            <div
              className={`${coupon.color} text-white text-sm px-3 py-1 rounded inline-block`}
            >
              {coupon.discount}
            </div>

            {/* CODE */}
            <h3 className="mt-3 text-lg font-bold tracking-wide">
              {coupon.code}
            </h3>

            {/* DESC */}
            <p className="text-gray-500 text-sm mt-1">
              {coupon.desc}
            </p>

            {/* BUTTON */}
            <button
              onClick={() => copyCode(coupon.code)}
              className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Copy Code
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Coupons;