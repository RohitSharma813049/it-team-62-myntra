import React from "react";
import { useSelector } from "react-redux";

// 🎨 Status color helper
const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "text-green-600";
    case "Pending":
      return "text-yellow-600";
    case "Cancelled":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

// 🔥 Memoized item
const OrderItem = React.memo(({ item }) => {
  return (
    <div className="flex gap-4 items-center border-t pt-3 mt-3">
      <img
        src={item.image || "https://via.placeholder.com/60"}
        alt={item.name}
        loading="lazy"
        width="60"
        height="60"
        className="w-14 h-14 object-cover rounded"
      />

      <div>
        <p className="font-semibold">{item.name}</p>
        <p className="text-sm text-gray-500">Qty: {item.qty}</p>
        <p className="text-green-600 font-semibold">₹{item.price}</p>
      </div>
    </div>
  );
});

const Orders = () => {
  const orders = useSelector((state) => state.shop?.orders || []);

  if (!orders.length) {
    return (
      <div className="p-10 text-center text-gray-500 text-lg">
        📦 No Orders Yet
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {/* HEADER */}
      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>

      <div className="space-y-6">

        {orders.map((order) => {
          const total = order.items?.reduce(
            (acc, item) => acc + item.price * item.qty,
            0
          );

          return (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >

              {/* ORDER HEADER */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">
                    Order ID: #{order.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.date || "12 Apr 2026"}
                  </p>
                </div>

                <span
                  className={`font-semibold ${getStatusColor(
                    order.status || "Delivered"
                  )}`}
                >
                  {order.status || "Delivered"}
                </span>
              </div>

              {/* ITEMS */}
              {order.items?.map((item) => (
                <OrderItem key={item.id} item={item} />
              ))}

              {/* FOOTER */}
              <div className="flex justify-between items-center mt-4 border-t pt-3">

                <span className="font-bold">
                  Total: ₹{total}
                </span>

                {/* ACTIONS */}
                <div className="flex gap-3">
                  <button className="text-blue-600 text-sm hover:underline">
                    Track Order
                  </button>

                  {order.status !== "Cancelled" && (
                    <button className="text-red-500 text-sm hover:underline">
                      Cancel
                    </button>
                  )}
                </div>

              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
};

export default Orders;