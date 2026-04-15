import { useNavigate } from "react-router-dom";

const Card = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={(e) => {
        if (e.target.closest("button")) return;
        navigate(`/product/${item.id}`);
      }}
      className="w-full bg-white rounded-lg shadow-sm hover:shadow-md 
                 transition duration-300 cursor-pointer overflow-hidden group"
    >
      {/* IMAGE WRAPPER */}
      <div className="relative">

        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-[160px] md:h-[220px] object-cover 
                     group-hover:scale-105 transition duration-300"
        />

        {/* 🔥 DISCOUNT BADGE */}
        {item.discount && (
          <span className="absolute top-2 left-2 bg-pink-500 text-white 
                           text-[10px] md:text-xs px-2 py-1 rounded">
            {item.discount}% OFF
          </span>
        )}

      </div>

      {/* DETAILS */}
      <div className="p-2 md:p-3 space-y-1">

        <h3 className="font-semibold text-sm md:text-base truncate">
          {item.brand}
        </h3>

        <p className="text-xs md:text-sm text-gray-500 truncate">
          {item.name}
        </p>

        <div className="flex items-center gap-2 text-xs md:text-sm">

          <span className="font-bold text-gray-900">
            ₹{item.price}
          </span>

          {item.originalPrice && (
            <span className="line-through text-gray-400">
              ₹{item.originalPrice}
            </span>
          )}

        </div>

      </div>
    </div>
  );
};

export default Card;