import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { products } from "../Data/Products";
import {
  addToCart,
  toggleWishlist,
  placeOrder,
} from "../store/Slice/Shopslice";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const wishlist = useSelector(
    (state) => state.shop?.wishlist || []
  );

  const product = useMemo(() => {
    return products.find((p) => String(p.id) === String(id));
  }, [id]);

  const [added, setAdded] = useState(false);
  const [zoom, setZoom] = useState(null);

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  // 💰 FINAL PRICE
  const discountPrice = Math.round(
    product.price - (product.price * product.discount) / 100
  );

  const isWishlisted = wishlist.some((p) => p.id === product.id);

  // 🧠 CLEAN PRODUCT FOR CART
  const cartItem = {
    id: product.id,
    name: product.name,
    price: discountPrice,
    image: product.image,
  };

  return (
    <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-10">

      {/* IMAGE */}
      <img
        src={product.image}
        className="w-full h-[400px] object-cover rounded cursor-pointer"
        onClick={() => setZoom(product.image)}
      />

      {/* DETAILS */}
      <div>
        <h1 className="text-2xl font-bold">{product.brand}</h1>
        <p>{product.name}</p>

        <h2 className="text-xl font-bold mt-4">
          ₹{discountPrice}
        </h2>

        {/* BUTTONS */}
        <div className="mt-6 flex gap-4 flex-wrap">

          {/* ADD TO CART */}
          <button
            onClick={() => {
              dispatch(addToCart(cartItem));
              setAdded(true);
              setTimeout(() => setAdded(false), 1500);
            }}
            className="bg-pink-500 text-white px-5 py-2 rounded"
          >
            Add to Bag
          </button>

          {/* BUY NOW */}
          <button
            onClick={() => {
              dispatch(addToCart(cartItem));

              setTimeout(() => {
                dispatch(placeOrder());
              }, 50);
            }}
            className="bg-black text-white px-5 py-2 rounded"
          >
            Buy Now
          </button>

          {/* WISHLIST */}
          <button
            onClick={() => dispatch(toggleWishlist(cartItem))}
            className={`px-5 py-2 border rounded ${
              isWishlisted ? "bg-pink-500 text-white" : ""
            }`}
          >
            {isWishlisted ? "❤️ Wishlisted" : "🤍 Wishlist"}
          </button>

        </div>

        {added && (
          <p className="text-green-600 mt-3">Added to Bag ✔</p>
        )}
      </div>

      {/* ZOOM */}
      {zoom && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
          onClick={() => setZoom(null)}
        >
          <img src={zoom} className="max-w-[90%] max-h-[90%]" />
        </div>
      )}
    </div>
  );
};

export default ProductPage;