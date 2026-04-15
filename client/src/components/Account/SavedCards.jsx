import React, { useState, useEffect } from "react";

const SavedCards = () => {
  const [cards, setCards] = useState([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  // 🔥 Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cards")) || [];
    setCards(saved);
  }, []);

  // 💾 Save to localStorage
  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  };

  // ➕ Add card
  const handleAdd = () => {
    const trimmed = input.replace(/\s/g, "");

    if (!trimmed) {
      showMessage("Enter card number");
      return;
    }

    if (!/^\d{12,16}$/.test(trimmed)) {
      showMessage("Enter valid 12–16 digit card");
      return;
    }

    const masked = "**** **** **** " + trimmed.slice(-4);

    if (cards.includes(masked)) {
      showMessage("Card already saved!");
      return;
    }

    setCards([...cards, masked]);
    setInput("");
    showMessage("Card added successfully ✅");
  };

  // ❌ Delete
  const handleDelete = (index) => {
    const updated = cards.filter((_, i) => i !== index);
    setCards(updated);
    showMessage("Card removed ❌");
  };

  return (
    <div className="max-w-md mx-auto p-4">

      {/* TITLE */}
      <h2 className="text-xl font-semibold mb-4">
        💳 Saved Cards
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
          placeholder="Enter card number"
          className="flex-1 border p-2 rounded outline-none"
        />

        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      {cards.length === 0 ? (
        <p className="text-gray-500">No cards saved yet.</p>
      ) : (
        <div className="space-y-3">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex justify-between items-center border p-3 rounded bg-white shadow-sm"
            >
              <span className="tracking-widest font-medium">
                {card}
              </span>

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

export default SavedCards;