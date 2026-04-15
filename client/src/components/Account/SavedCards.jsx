import React, { useState } from "react";

const SavedCards = () => {
  const [cards, setCards] = useState([
    "**** **** **** 1234",
    "**** **** **** 5678",
  ]);

  const [input, setInput] = useState("");

  // ➕ Add card
  const handleAdd = () => {
    const trimmed = input.trim();

    if (!trimmed) return;

    // simple validation (basic card format check)
    if (!/^\d{12,16}$/.test(trimmed)) {
      alert("Enter valid 12–16 digit card number");
      return;
    }

    const masked = "**** **** **** " + trimmed.slice(-4);

    if (cards.includes(masked)) {
      alert("Card already saved!");
      return;
    }

    setCards([...cards, masked]);
    setInput("");
  };

  // ❌ Delete card
  const handleDelete = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-4">Saved Cards</h2>

      {/* Input */}
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
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* List */}
      {cards.length === 0 ? (
        <p className="text-gray-500">No cards saved yet.</p>
      ) : (
        <div className="space-y-2">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex justify-between items-center border p-2 rounded"
            >
              <span>{card}</span>

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

export default SavedCards;