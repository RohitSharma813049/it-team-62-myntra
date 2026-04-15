import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  decreaseQty,
  removeFromCart,
} from "../../store/Slice/Shopslice";

const Cart = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.shop?.cart || []);

  const total = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.qty || 1),
    0
  );

  if (!cart.length) {
    return (
      <div className="p-10 text-center text-gray-500">
        🛒 Your cart is empty
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded flex items-center gap-4"
          >
            {/* IMAGE */}
            <img
              src={item.image}
              className="w-16 h-16 object-cover rounded"
            />

            {/* INFO */}
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-green-600 font-bold">
                ₹{item.price}
              </p>

              {/* QTY */}
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() =>
                    dispatch(decreaseQty(item.id))
                  }
                  className="px-3 bg-gray-200 rounded"
                >
                  -
                </button>

                <span>{item.qty}</span>

                <button
                  onClick={() =>
                    dispatch(addToCart(item))
                  }
                  className="px-3 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>

            {/* REMOVE */}
            <button
              onClick={() =>
                dispatch(removeFromCart(item.id))
              }
              className="text-red-500 font-semibold"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="mt-6 border-t pt-4 flex justify-between font-bold text-lg">
        <span>Total:</span>
        <span>₹{total}</span>
      </div>
    </div>
  );
};

export default Cart;