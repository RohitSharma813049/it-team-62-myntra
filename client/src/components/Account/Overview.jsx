import { useNavigate } from "react-router-dom";

const Overview = () => {
  const navigate = useNavigate();

  const cards = [
    { title: "Orders", path: "orders" },
    { title: "Wishlist", path: "wishlist" },
    { title: "Coupons", path: "coupons" },
    { title: "Saved Cards", path: "cards" },
    { title: "Saved UPI", path: "vpa" },
    { title: "Addresses", path: "address" },
    { title: "Profile Details", path: "profile" },
  ];

  return (
    <>
      {/* PROFILE */}
      <div className="bg-gray-200 p-6 flex justify-between mb-6">
        <h2 className="font-semibold">Welcome User</h2>
        <button className="border px-3">EDIT PROFILE</button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((c, i) => (
          <div
            key={i}
            onClick={() => navigate(`/account/${c.path}`)}
            className="bg-white border p-6 text-center cursor-pointer hover:shadow"
          >
            <h3 className="font-semibold">{c.title}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Overview;