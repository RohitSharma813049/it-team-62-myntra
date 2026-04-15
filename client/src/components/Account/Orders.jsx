import React from "react";
import { useSelector } from "react-redux";

const Orders = () => {
  const cart = useSelector((state) => state.shop?.orders || []);

  if (!cart.length) {
    return (
      <div className="p-10 text-center text-gray-500">
        🛒 Cart is Empty
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart Items</h2>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded-lg flex gap-4 items-center"
          >
            <img
              src={item.image}
              className="w-14 h-14 object-cover rounded"
              alt=""
            />

            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">
                Qty: {item.qty}
              </p>
              <p className="text-green-600 font-semibold">
                ₹{item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;