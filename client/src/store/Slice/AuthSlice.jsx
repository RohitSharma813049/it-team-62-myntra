import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,

  step: 1,
  input: "",
  generatedOtp: "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // INPUT HANDLE
    setInput: (state, action) => {
      state.input = action.payload;
    },

    // GENERATE OTP
    generateOtp: (state) => {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      state.generatedOtp = otp;
      state.step = 2;

      alert("Fake OTP: " + otp);
    },

    // VERIFY OTP + LOGIN/SIGNUP
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
        alert("Login Successful ✅");
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

        alert("Account Created 🎉");
      }

      // SAVE SESSION
      state.user = loggedUser;
      state.token = "fake-jwt-token";

      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.setItem("token", "fake-jwt-token");

      state.step = 1;
      state.input = "";
    },

    // LOGOUT
    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    // 💖 ADD TO WISHLIST (GLOBAL)
    addToWishlist: (state, action) => {
      if (!state.user) return;

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

      state.user.wishlist = state.user.wishlist.filter(
        (item) => item.id !== action.payload
      );

      localStorage.setItem("user", JSON.stringify(state.user));
    },

    // 🛒 ADD TO CART (GLOBAL)
    addToCart: (state, action) => {
      if (!state.user) return;

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

      state.user.cart = state.user.cart.filter(
        (item) => item.id !== action.payload
      );

      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});

export const {
  setInput,
  generateOtp,
  verifyOtp,
  logout,
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
} = AuthSlice.actions;

export default AuthSlice.reducer;