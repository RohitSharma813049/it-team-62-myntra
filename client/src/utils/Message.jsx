import React, { useState } from "react";

const MessageDemo = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // ✅ Success handler
  const handleSuccess = () => {
    setSuccessMessage("Item added successfully!");
    setErrorMessage("");

    // auto hide
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  };

  // ❌ Error handler
  const handleError = () => {
    setErrorMessage("Something went wrong!");
    setSuccessMessage("");

    // auto hide
    setTimeout(() => {
      setErrorMessage("");
    }, 2000);
  };

  return (
    <div className="p-6 max-w-md mx-auto">

      <h2 className="text-xl font-bold mb-4">
        Message Demo
      </h2>

      {/* ✅ SUCCESS MESSAGE */}
      {successMessage && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700 border border-green-300">
          {successMessage}
        </div>
      )}

      {/* ❌ ERROR MESSAGE */}
      {errorMessage && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-300">
          {errorMessage}
        </div>
      )}

      {/* BUTTONS */}
      <div className="flex gap-4">
        <button
          onClick={handleSuccess}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Show Success
        </button>

        <button
          onClick={handleError}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Show Error
        </button>
      </div>

    </div>
  );
};

export default MessageDemo;