import { createSlice } from "@reduxjs/toolkit";

/* ---------------- SAFE USER HELPER ---------------- */
const safeUser = (user) => ({
  ...user,
  wishlist: user?.wishlist || [],
  cart: user?.cart || [],
  address: user?.address || [],
  orders: user?.orders || [],
});

/* ---------------- INITIAL STATE ---------------- */
const initialState = {
  user: JSON.parse(localStorage.getItem("user"))
    ? safeUser(JSON.parse(localStorage.getItem("user")))
    : null,

  token: localStorage.getItem("token") || null,

  step: 1,
  input: "",
  generatedOtp: "",
};

/* ---------------- SLICE ---------------- */
const AuthSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    /* ---------------- INPUT ---------------- */
    setInput: (state, action) => {
      state.input = action.payload;
    },

    /* ---------------- OTP GENERATE ---------------- */
    generateOtp: (state) => {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      state.generatedOtp = otp;
      state.step = 2;

      alert("Fake OTP: " + otp);
    },

    /* ---------------- VERIFY OTP ---------------- */
    verifyOtp: (state, action) => {
      if (action.payload !== state.generatedOtp) {
        alert("Wrong OTP");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const existingUser = users.find(
        (u) => u.emailOrPhone === state.input
      );

      let loggedUser;

      if (existingUser) {
        loggedUser = existingUser;
      } else {
        loggedUser = {
          id: Date.now(),
          name: "User",
          emailOrPhone: state.input,
          avatar: "",
          wishlist: [],
          cart: [],
          address: [],
          orders: [],
          createdAt: new Date().toISOString(),
        };

        users.push(loggedUser);
        localStorage.setItem("users", JSON.stringify(users));
      }

      state.user = safeUser(loggedUser);
      state.token = "fake-jwt-token";

      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", state.token);

      state.step = 1;
      state.input = "";
      state.generatedOtp = "";
    },

    /* ---------------- LOGOUT ---------------- */
    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    /* ---------------- UPDATE USER (🔥 FIX ADDED) ---------------- */
    updateUser: (state, action) => {
      if (!state.user) return;

      state.user = safeUser({
        ...state.user,
        ...action.payload,
      });

      localStorage.setItem("user", JSON.stringify(state.user));
    },

    /* ---------------- WISHLIST ---------------- */
    addToWishlist: (state, action) => {
      if (!state.user) return;

      state.user = safeUser(state.user);

      const exists = state.user.wishlist.find(
        (item) => item.id === action.payload.id
      );

      if (!exists) {
        state.user.wishlist.push(action.payload);
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },

    removeFromWishlist: (state, action) => {
      if (!state.user) return;

      state.user = safeUser(state.user);

      state.user.wishlist = state.user.wishlist.filter(
        (item) => item.id !== action.payload
      );

      localStorage.setItem("user", JSON.stringify(state.user));
    },

    /* ---------------- CART ---------------- */
    addToCart: (state, action) => {
      if (!state.user) return;

      state.user = safeUser(state.user);

      const exists = state.user.cart.find(
        (item) => item.id === action.payload.id
      );

      if (exists) {
        state.user.cart = state.user.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        state.user.cart.push({ ...action.payload, qty: 1 });
      }

      localStorage.setItem("user", JSON.stringify(state.user));
    },

    removeFromCart: (state, action) => {
      if (!state.user) return;

      state.user = safeUser(state.user);

      state.user.cart = state.user.cart.filter(
        (item) => item.id !== action.payload
      );

      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});

/* ---------------- EXPORTS ---------------- */
export const {
  setInput,
  generateOtp,
  verifyOtp,
  logout,
  updateUser, // 🔥 IMPORTANT FIX
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
} = AuthSlice.actions;

export default AuthSlice.reducer;