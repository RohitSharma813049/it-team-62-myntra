import React from "react";

const offersData = [
  {
    id: 1,
    name: "Men Printed T-Shirt",
    price: 499,
    originalPrice: 999,
    discount: 50,
    image: "https://picsum.photos/300?random=11",
  },
  {
    id: 2,
    name: "Women Casual Dress",
    price: 799,
    originalPrice: 1499,
    discount: 47,
    image: "https://picsum.photos/300?random=12",
  },
  {
    id: 3,
    name: "Sports Shoes",
    price: 899,
    originalPrice: 1999,
    discount: 55,
    image: "https://picsum.photos/300?random=13",
  },
  {
    id: 4,
    name: "Denim Jeans",
    price: 699,
    originalPrice: 1299,
    discount: 46,
    image: "https://picsum.photos/300?random=14",
  },
  {
    id: 5,
    name: "Casual Shirt",
    price: 599,
    originalPrice: 1199,
    discount: 50,
    image: "https://picsum.photos/300?random=15",
  },
];

const OffersPage = () => {
  return (
    <div className="p-4 pb-20 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <h2 className="text-xl font-bold mb-4">
        🔥 Under ₹999 Deals
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-3">
        {offersData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-36 object-cover"
            />

            {/* DETAILS */}
            <div className="p-2 space-y-1">
              <p className="text-sm font-semibold truncate">
                {item.name}
              </p>

              {/* PRICE */}
              <div className="flex gap-2 text-sm items-center">
                <span className="font-bold text-black">
                  ₹{item.price}
                </span>

                <span className="line-through text-gray-400 text-xs">
                  ₹{item.originalPrice}
                </span>

                <span className="text-pink-500 text-xs font-semibold">
                  {item.discount}% OFF
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersPage;