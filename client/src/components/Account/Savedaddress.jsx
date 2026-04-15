import React, { useState, useEffect } from "react";

const SavedAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });

  // 🔥 Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("addresses")) || [];
    setAddresses(saved);
  }, []);

  // 💾 Save to localStorage
  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  };

  // ➕ Add / Update
  const handleAdd = () => {
    const { name, phone, address, pincode } = form;

    if (!name || !phone || !address || !pincode) {
      showMessage("Please fill all fields");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      showMessage("Enter valid 10-digit phone");
      return;
    }

    if (editingIndex !== null) {
      // ✏️ Update
      const updated = [...addresses];
      updated[editingIndex] = form;
      setAddresses(updated);
      setEditingIndex(null);
      showMessage("Address updated ✅");
    } else {
      // ➕ Add
      setAddresses([...addresses, form]);
      showMessage("Address added ✅");
    }

    setForm({ name: "", phone: "", address: "", pincode: "" });
  };

  // ❌ Delete
  const handleDelete = (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
    showMessage("Address deleted ❌");
  };

  // ✏️ Edit
  const handleEdit = (index) => {
    setForm(addresses[index]);
    setEditingIndex(index);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">

      {/* TITLE */}
      <h2 className="text-xl font-semibold mb-4">
        Saved Addresses
      </h2>

      {/* 🔥 MESSAGE */}
      {message && (
        <div className="mb-3 p-2 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}

      {/* FORM */}
      <div className="grid gap-2 mb-4">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Full Address"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          placeholder="Pincode"
          value={form.pincode}
          onChange={(e) =>
            setForm({ ...form, pincode: e.target.value })
          }
          className="border p-2 rounded"
        />

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingIndex !== null ? "Update Address" : "Add Address"}
        </button>
      </div>

      {/* LIST */}
      {addresses.length === 0 ? (
        <p className="text-gray-500">No addresses saved yet.</p>
      ) : (
        <div className="space-y-3">
          {addresses.map((addr, index) => (
            <div
              key={index}
              className="border p-3 rounded bg-white shadow-sm"
            >
              <p className="font-semibold">{addr.name}</p>
              <p>{addr.phone}</p>
              <p>{addr.address}</p>
              <p>{addr.pincode}</p>

              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedAddress;