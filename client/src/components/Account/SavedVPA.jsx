import React, { useState } from "react";

const SavedVPA = () => {
  const [vpas, setVpas] = useState(["user@upi", "saloni@paytm"]);
  const [input, setInput] = useState("");

  // ➕ Add UPI ID
  const handleAdd = () => {
    if (!input.trim()) return;

    // avoid duplicates
    if (vpas.includes(input.trim())) {
      alert("UPI already exists!");
      return;
    }

    setVpas([...vpas, input.trim()]);
    setInput("");
  };

  // ❌ Delete UPI
  const handleDelete = (index) => {
    const updated = vpas.filter((_, i) => i !== index);
    setVpas(updated);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-4">Saved UPI IDs</h2>

      {/* Input Section */}
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
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* List */}
      {vpas.length === 0 ? (
        <p className="text-gray-500">No UPI IDs saved yet.</p>
      ) : (
        <div className="space-y-2">
          {vpas.map((vpa, index) => (
            <div
              key={index}
              className="flex justify-between items-center border p-2 rounded"
            >
              <span>{vpa}</span>

              <button
                onClick={() => handleDelete(index)}
                className="text-red-500"
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