import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist, addToCart } from "../../store/Slice/Shopslice";
import Card from "../Cards/cards";

const Wishlist = () => {
  const dispatch = useDispatch();

  const wishlist = useSelector(
    (state) => state.shop?.wishlist || []
  );

  if (!wishlist.length) {
    return (
      <div className="p-10 text-center text-gray-500">
        💔 Your Wishlist is Empty
      </div>
    );
  }

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">
        Your Wishlist ❤️
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {wishlist.map((item) => (
          <div key={item.id} className="relative">

            {/* YOUR CARD */}
            <Card item={item} />

            {/* ACTION BUTTONS OVER CARD */}
            <div className="flex gap-2 mt-2">

              <button
                onClick={() => dispatch(addToCart(item))}
                className="w-full bg-pink-500 text-white text-xs py-1 rounded"
              >
                Add to Bag
              </button>

              <button
                onClick={() => dispatch(toggleWishlist(item))}
                className="w-full border text-xs py-1 rounded"
              >
                Remove
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default Wishlist;