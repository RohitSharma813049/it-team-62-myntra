import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  decreaseQty,
  removeFromCart,
} from "../../store/Slice/Shopslice";

// 🔥 Memoized item
const CartItem = React.memo(({ item, dispatch, showSuccess }) => {
  return (
    <div className="border p-4 rounded flex items-center gap-4 bg-white shadow-sm">
      
      {/* IMAGE */}
      <img
        src={item.image || "https://via.placeholder.com/64"}
        alt={item.name}
        loading="lazy"
        width="64"
        height="64"
        className="w-16 h-16 object-cover rounded"
      />

      {/* INFO */}
      <div className="flex-1">
        <p className="font-semibold">{item.name}</p>
        <p className="text-green-600 font-bold">₹{item.price}</p>

        {/* QTY */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => {
              dispatch(decreaseQty(item.id));
              showSuccess("Quantity decreased");
            }}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            -
          </button>

          <span>{item.qty}</span>

          <button
            onClick={() => {
              dispatch(addToCart(item));
              showSuccess("Quantity increased");
            }}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>

      {/* REMOVE */}
      <button
        onClick={() => {
          dispatch(removeFromCart(item.id));
          showSuccess("Item removed from cart");
        }}
        className="text-red-500 font-semibold hover:underline"
      >
        Remove
      </button>
    </div>
  );
});

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shop?.cart || []);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // ✅ Show success
  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setErrorMessage("");

    setTimeout(() => setSuccessMessage(""), 2000);
  };

  // ❌ Show error
  const showError = (msg) => {
    setErrorMessage(msg);
    setSuccessMessage("");

    setTimeout(() => setErrorMessage(""), 2000);
  };

  const total = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.qty || 1),
    0
  );

  // 🛒 EMPTY
  if (!cart.length) {
    return (
      <div className="p-10 text-center text-gray-500 text-lg">
        🛒 Your cart is empty
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {/* 🔥 MESSAGES */}
      {successMessage && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700 border border-green-300">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-300">
          {errorMessage}
        </div>
      )}

      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {/* ITEMS */}
      <div className="space-y-4">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            dispatch={dispatch}
            showSuccess={showSuccess}
          />
        ))}
      </div>

      {/* TOTAL */}
      <div className="sticky bottom-0 bg-white mt-6 border-t pt-4 flex justify-between items-center font-bold text-lg shadow-md p-4">
        <span>Total: ₹{total}</span>

        <button
          onClick={() => {
            if (!cart.length) {
              showError("Cart is empty!");
            } else {
              showSuccess("Proceeding to checkout...");
            }
          }}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;