import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
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

  // ESC to close zoom
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setZoom(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (!product) {
    return (
      <div className="p-10 text-center">
        Product not found
      </div>
    );
  }

  const discountPrice = Math.round(
    product.price - (product.price * product.discount) / 100
  );

  const isWishlisted = wishlist.some(
    (p) => p.id === product.id
  );

  const cartItem = {
    id: product.id,
    name: product.name,
    price: discountPrice,
    image: product.image,
  };

  const rating =
    typeof product.rating === "number"
      ? product.rating
      : 4.2;

  const description =
    typeof product.description === "string"
      ? product.description
      : "Premium quality fabric with modern design.";

  const reviews = Array.isArray(product.reviews)
    ? product.reviews
    : [
        {
          name: "Aman Verma",
          rating: 5,
          comment: "Amazing quality! Totally worth the price.",
        },
        {
          name: "Sneha Gupta",
          rating: 4,
          comment: "Good product but delivery was a bit late.",
        },
      ];

  // ⭐ STAR UI (better than repeat)
  const renderStars = (val) => {
    const full = Math.floor(val);
    const empty = 5 - full;

    return (
      <>
        {"⭐".repeat(full)}
        {"☆".repeat(empty)}
      </>
    );
  };

  return (
    <>
      <Helmet>
        <title>{product.name}</title>
        <meta name="description" content={description} />
      </Helmet>

      <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[300px] md:h-[400px] object-cover rounded cursor-pointer"
          onClick={() => setZoom(product.image)}
        />

        {/* DETAILS */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            {product.brand}
          </h1>

          <p className="text-gray-600">
            {product.name}
          </p>

          {/* PRICE */}
          <h2 className="text-xl font-bold mt-4">
            ₹{discountPrice}
            <span className="text-gray-500 line-through ml-2 text-sm">
              ₹{product.price}
            </span>
          </h2>

          {/* RATING */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-yellow-500">
              {renderStars(rating)}
            </span>
            <span className="text-gray-600 text-sm">
              ({rating})
            </span>
          </div>

          {/* DESCRIPTION */}
          <p className="mt-4 text-gray-700">
            {description}
          </p>

          {/* BUTTONS */}
          <div className="mt-6 flex gap-3 flex-wrap">

            <button
              onClick={() => {
                dispatch(addToCart(cartItem));
                setAdded(true);
                setTimeout(() => setAdded(false), 1500);
              }}
              className="bg-pink-500 text-white px-4 py-2 rounded text-sm"
            >
              Add to Bag
            </button>

            <button
              onClick={() => {
                dispatch(addToCart(cartItem));
                dispatch(placeOrder());
              }}
              className="bg-black text-white px-4 py-2 rounded text-sm"
            >
              Buy Now
            </button>

            <button
              onClick={() =>
                dispatch(toggleWishlist(cartItem))
              }
              className={`px-4 py-2 border rounded text-sm ${
                isWishlisted
                  ? "bg-pink-500 text-white"
                  : ""
              }`}
            >
              {isWishlisted
                ? "❤️ Wishlisted"
                : "🤍 Wishlist"}
            </button>
          </div>

          {added && (
            <p className="text-green-600 mt-3 text-sm">
              Added to Bag ✔
            </p>
          )}
        </div>

        {/* REVIEWS */}
        <div className="md:col-span-2 mt-8">
          <h2 className="text-lg font-bold mb-4">
            Customer Reviews
          </h2>

          {reviews.map((rev, index) => (
            <div key={index} className="border-b py-3">
              <p className="font-semibold">
                {rev.name}
              </p>
              <div className="text-yellow-500 text-sm">
                {renderStars(rev.rating)}
              </div>
              <p className="text-gray-600 text-sm">
                {rev.comment}
              </p>
            </div>
          ))}
        </div>

        {/* ZOOM */}
        {zoom && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center"
            onClick={() => setZoom(null)}
          >
            <img
              src={zoom}
              alt="zoom"
              className="max-w-[90%] max-h-[90%]"
            />
          </div>
        )}

      </div>
    </>
  );
};

export default ProductPage;