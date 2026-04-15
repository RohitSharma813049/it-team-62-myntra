import React, { useState, useEffect } from "react";

const SavedVPA = () => {
  const [vpas, setVpas] = useState([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  // 🔥 Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("vpas")) || [];
    setVpas(saved);
  }, []);

  // 💾 Save to localStorage
  useEffect(() => {
    localStorage.setItem("vpas", JSON.stringify(vpas));
  }, [vpas]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  };

  // ➕ Add UPI
  const handleAdd = () => {
    const trimmed = input.trim().toLowerCase();

    if (!trimmed) {
      showMessage("Enter UPI ID");
      return;
    }

    // ✅ Basic UPI validation
    if (!/^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/.test(trimmed)) {
      showMessage("Invalid UPI ID format");
      return;
    }

    if (vpas.includes(trimmed)) {
      showMessage("UPI already exists!");
      return;
    }

    setVpas([...vpas, trimmed]);
    setInput("");
    showMessage("UPI added successfully ✅");
  };

  // ❌ Delete
  const handleDelete = (index) => {
    const updated = vpas.filter((_, i) => i !== index);
    setVpas(updated);
    showMessage("UPI removed ❌");
  };

  return (
    <div className="max-w-md mx-auto p-4">

      {/* TITLE */}
      <h2 className="text-xl font-semibold mb-4">
        💸 Saved UPI IDs
      </h2>

      {/* 🔥 MESSAGE */}
      {message && (
        <div className="mb-3 p-2 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}

      {/* INPUT */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter UPI ID (e.g. name@upi)"
          className="flex-1 border p-2 rounded outline-none"
        />

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      {vpas.length === 0 ? (
        <p className="text-gray-500">No UPI IDs saved yet.</p>
      ) : (
        <div className="space-y-3">
          {vpas.map((vpa, index) => (
            <div
              key={index}
              className="flex justify-between items-center border p-3 rounded bg-white shadow-sm"
            >
              <span className="font-medium">{vpa}</span>

              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 text-sm hover:underline"
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

export default SavedVPA;