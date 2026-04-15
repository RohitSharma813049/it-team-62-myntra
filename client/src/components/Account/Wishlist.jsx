import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist, addToCart } from "../../store/Slice/Shopslice";
import Card from "../Cards/cards";

const WishlistItem = React.memo(({ item, dispatch }) => {
  return (
    <div className="relative group">

      {/* CARD */}
      <Card item={item} />

      {/* 🔥 HOVER OVERLAY */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-3">

        <button
          onClick={() => dispatch(addToCart(item))}
          className="bg-white text-black py-2 text-sm rounded mb-2 hover:bg-gray-200"
        >
          Add to Bag
        </button>

        <button
          onClick={() => dispatch(toggleWishlist(item))}
          className="bg-red-500 text-white py-2 text-sm rounded hover:bg-red-600"
        >
          Remove
        </button>

      </div>

    </div>
  );
});

const Wishlist = () => {
  const dispatch = useDispatch();

  const wishlist = useSelector(
    (state) => state.shop?.wishlist || []
  );

  // 💔 EMPTY STATE
  if (!wishlist.length) {
    return (
      <div className="p-10 text-center">

        <h2 className="text-2xl font-bold mb-2">
          💔 Your Wishlist is Empty
        </h2>

        <p className="text-gray-500 mb-4">
          Save items you love ❤️
        </p>

        <button
          onClick={() => window.location.href = "/"}
          className="bg-black text-white px-6 py-2 rounded"
        >
          Continue Shopping
        </button>

      </div>
    );
  }

  return (
    <div className="p-6">

      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-6">
        Your Wishlist ❤️
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {wishlist.map((item) => (
          <WishlistItem
            key={item.id}
            item={item}
            dispatch={dispatch}
          />
        ))}
      </div>

    </div>
  );
};

export default Wishlist;