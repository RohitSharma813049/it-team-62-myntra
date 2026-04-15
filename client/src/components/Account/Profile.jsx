import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../store/Slice/AuthSlice";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  const defaultAddress = {
    house: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: defaultAddress,
  });

  /* 🔥 SYNC USER → FORM */
  useEffect(() => {
    if (!user) return;

    setFormData({
      name: user.name || "User",
      email: user.emailOrPhone || "",
      address: user.address?.[0] || defaultAddress,
    });
  }, [user]);

  if (!user) {
    return (
      <div className="p-10 text-center text-gray-500">
        Please login to view profile
      </div>
    );
  }

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      showMessage("Please fill required fields");
      return;
    }

    const updatedUser = {
      ...user,
      name: formData.name,
      emailOrPhone: formData.email,
      address: [formData.address],
    };

    dispatch(updateUser(updatedUser));
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setEditMode(false);
    showMessage("Profile updated successfully ✅");
  };

  const handleCancel = () => {
    setEditMode(false);

    setFormData({
      name: user?.name || "",
      email: user?.emailOrPhone || "",
      address: user?.address?.[0] || defaultAddress,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* TITLE */}
      <h2 className="text-2xl font-bold">👤 My Profile</h2>

      {/* MESSAGE */}
      {message && (
        <div className="p-3 rounded bg-green-100 text-green-700 border">
          {message}
        </div>
      )}

      {/* CARD */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">

        {/* NAME */}
        <div>
          <label className="text-sm text-gray-500">Name</label>

          {editMode ? (
            <input
              className="border p-2 rounded w-full"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          ) : (
            <p className="font-semibold">{formData.name}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm text-gray-500">Email / Phone</label>

          {editMode ? (
            <input
              className="border p-2 rounded w-full"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          ) : (
            <p className="font-semibold">{formData.email}</p>
          )}
        </div>

        {/* ADDRESS */}
        <div className="border-t pt-4">
          <h3 className="font-bold mb-2">🏠 Address</h3>

          <div className="grid md:grid-cols-2 gap-3">
            {Object.keys(defaultAddress).map((key) => (
              <input
                key={key}
                placeholder={key}
                className={`border p-2 rounded ${
                  key === "pincode" ? "md:col-span-2" : ""
                }`}
                value={formData.address?.[key] || ""}
                disabled={!editMode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: {
                      ...formData.address,
                      [key]: e.target.value,
                    },
                  })
                }
              />
            ))}
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
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={handleCancel}
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