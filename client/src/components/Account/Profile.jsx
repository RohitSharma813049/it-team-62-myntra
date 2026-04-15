import React, { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || "User");
  const [email, setEmail] = useState(user?.emailOrPhone || "");

  const [address, setAddress] = useState(
    user?.address?.[0] || {
      house: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
    }
  );

  if (!user) {
    return (
      <div className="p-10 text-center text-gray-500">
        Please login to view profile
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* TITLE */}
      <h2 className="text-2xl font-bold">
        👤 My Profile
      </h2>

      {/* PROFILE CARD */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">

        {/* NAME */}
        <div>
          <label className="text-sm text-gray-500">Name</label>
          {editMode ? (
            <input
              className="border p-2 rounded w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <p className="font-semibold">{name}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm text-gray-500">Email / Phone</label>
          {editMode ? (
            <input
              className="border p-2 rounded w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <p className="font-semibold">{email}</p>
          )}
        </div>

        {/* 🚚 ADDRESS SECTION */}
        <div className="border-t pt-4">
          <h3 className="font-bold mb-2">🏠 Address</h3>

          <div className="grid md:grid-cols-2 gap-3">

            <input
              placeholder="House No"
              className="border p-2 rounded"
              value={address.house}
              onChange={(e) =>
                setAddress({ ...address, house: e.target.value })
              }
              disabled={!editMode}
            />

            <input
              placeholder="Street"
              className="border p-2 rounded"
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
              disabled={!editMode}
            />

            <input
              placeholder="City"
              className="border p-2 rounded"
              value={address.city}
              onChange={(e) =>
                setAddress({ ...address, city: e.target.value })
              }
              disabled={!editMode}
            />

            <input
              placeholder="State"
              className="border p-2 rounded"
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
              disabled={!editMode}
            />

            <input
              placeholder="Pincode"
              className="border p-2 rounded md:col-span-2"
              value={address.pincode}
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
              disabled={!editMode}
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 pt-4">

          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setEditMode(false);

                  // ⚡ save to localStorage (simple version)
                  const updatedUser = {
                    ...user,
                    name,
                    emailOrPhone: email,
                    address: [address],
                  };

                  localStorage.setItem(
                    "user",
                    JSON.stringify(updatedUser)
                  );
                }}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setEditMode(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;