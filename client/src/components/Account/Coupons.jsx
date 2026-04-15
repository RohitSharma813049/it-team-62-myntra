import React, { useState } from "react";

const Coupons = () => {
  const [copiedId, setCopiedId] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [message, setMessage] = useState("");

  const coupons = [
    {
      id: 1,
      code: "SAVE10",
      discount: "10% OFF",
      desc: "On minimum purchase of ₹999",
      type: "percent",
      value: 10,
      min: 999,
      color: "bg-pink-500",
    },
    {
      id: 2,
      code: "FLAT200",
      discount: "₹200 OFF",
      desc: "On orders above ₹1499",
      type: "flat",
      value: 200,
      min: 1499,
      color: "bg-green-500",
    },
    {
      id: 3,
      code: "WELCOME50",
      discount: "₹50 OFF",
      desc: "First order only",
      type: "flat",
      value: 50,
      min: 0,
      color: "bg-blue-500",
    },
  ];

  // 🧠 Example cart total (replace with Redux later)
  const cartTotal = 1200;

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  };

  const copyCode = async (code, id) => {
    await navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 🔥 APPLY COUPON
  const applyCoupon = (coupon) => {
    if (cartTotal < coupon.min) {
      showMessage(`Minimum ₹${coupon.min} required`);
      return;
    }

    setAppliedCoupon(coupon);
    showMessage(`${coupon.code} applied successfully 🎉`);
  };

  // 💰 CALCULATE DISCOUNT
  const getDiscount = () => {
    if (!appliedCoupon) return 0;

    if (appliedCoupon.type === "percent") {
      return (cartTotal * appliedCoupon.value) / 100;
    }

    return appliedCoupon.value;
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* HEADER */}
      <h2 className="text-2xl font-bold mb-4">
        🎁 Your Coupons
      </h2>

      {/* 🔥 MESSAGE */}
      {message && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700 border">
          {message}
        </div>
      )}

      {/* 💰 SUMMARY */}
      <div className="mb-6 p-4 border rounded bg-gray-50">
        <p>Cart Total: ₹{cartTotal}</p>
        <p>Discount: ₹{getDiscount()}</p>
        <p className="font-bold">
          Final Price: ₹{cartTotal - getDiscount()}
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-4">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className={`border rounded-lg p-4 shadow-sm transition bg-white ${
              appliedCoupon?.id === coupon.id
                ? "ring-2 ring-green-500"
                : ""
            }`}
          >

            {/* BADGE */}
            <div
              className={`${coupon.color} text-white text-sm px-3 py-1 rounded inline-block`}
            >
              {coupon.discount}
            </div>

            {/* CODE */}
            <h3 className="mt-3 text-lg font-bold">
              {coupon.code}
            </h3>

            {/* DESC */}
            <p className="text-gray-500 text-sm mt-1">
              {coupon.desc}
            </p>

            {/* BUTTONS */}
            <div className="flex gap-2 mt-4">

              {/* COPY */}
              <button
                onClick={() => copyCode(coupon.code, coupon.id)}
                className={`flex-1 py-2 rounded ${
                  copiedId === coupon.id
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {copiedId === coupon.id ? "Copied" : "Copy"}
              </button>

              {/* APPLY */}
              <button
                onClick={() => applyCoupon(coupon)}
                className="flex-1 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                {appliedCoupon?.id === coupon.id
                  ? "Applied"
                  : "Apply"}
              </button>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Coupons;