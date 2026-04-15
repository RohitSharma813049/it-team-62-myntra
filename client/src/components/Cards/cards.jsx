import { useNavigate } from "react-router-dom";

const Card = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={(e) => {
        if (e.target.tagName === "BUTTON") return;
        navigate(`/product/${item.id}`);
      }}
      className="w-full bg-white rounded-lg shadow-sm hover:shadow-md transition 
                 p-2 md:p-3 cursor-pointer"
    >
      {/* IMAGE */}
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-[160px] md:h-[220px] object-cover rounded"
      />

      {/* DETAILS */}
      <div className="mt-2 space-y-1">
        <h3 className="font-semibold text-sm md:text-base truncate">
          {item.brand}
        </h3>

        <p className="text-xs md:text-sm text-gray-500 truncate">
          {item.name}
        </p>

        <div className="flex gap-1 md:gap-2 text-xs md:text-sm">
          <span className="font-bold">₹{item.price}</span>

          <span className="line-through text-gray-400">
            ₹{item.originalPrice}
          </span>

          <span className="text-pink-600">
            {item.discount}% OFF
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;