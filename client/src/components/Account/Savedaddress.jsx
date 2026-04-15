import React, { useState } from "react";

const SavedAddress = () => {
  const [addresses, setAddresses] = useState([
    {
      name: "Saloni",
      phone: "9876543210",
      address: "Shiamgir, Delhi, India",
      pincode: "110001",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });

  // ➕ Add address
  const handleAdd = () => {
    const { name, phone, address, pincode } = form;

    if (!name || !phone || !address || !pincode) {
      alert("Please fill all fields");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Enter valid 10-digit phone number");
      return;
    }

    const newAddress = { ...form };
    setAddresses([...addresses, newAddress]);

    setForm({ name: "", phone: "", address: "", pincode: "" });
  };

  // ❌ Delete address
  const handleDelete = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>

      {/* Form */}
      <div className="grid grid-cols-1 gap-2 mb-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Full Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Pincode"
          value={form.pincode}
          onChange={(e) => setForm({ ...form, pincode: e.target.value })}
          className="border p-2 rounded"
        />

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Address
        </button>
      </div>

      {/* List */}
      {addresses.length === 0 ? (
        <p className="text-gray-500">No addresses saved yet.</p>
      ) : (
        <div className="space-y-3">
          {addresses.map((addr, index) => (
            <div key={index} className="border p-3 rounded">
              <p className="font-semibold">{addr.name}</p>
              <p>{addr.phone}</p>
              <p>{addr.address}</p>
              <p>{addr.pincode}</p>

              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 mt-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedAddress;