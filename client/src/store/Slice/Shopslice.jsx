import { createSlice } from "@reduxjs/toolkit";

/* ---------------- SAFE LOAD ---------------- */
const load = (key) => {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

/* ---------------- INITIAL STATE ---------------- */
const initialState = {
  cart: load("cart"),
  wishlist: load("wishlist"),
  orders: load("orders"),
};

/* ---------------- SLICE ---------------- */
const shopSlice = createSlice({
  name: "shop",
  initialState,

  reducers: {
    /* ---------------- CART ---------------- */
    addToCart: (state, action) => {
      const item = action.payload;

      const exists = state.cart.find((p) => p.id === item.id);

      if (exists) {
        exists.qty += 1;
      } else {
        state.cart.push({
          ...item,
          qty: 1, // 🔥 always start safe
        });
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    decreaseQty: (state, action) => {
      const item = state.cart.find((p) => p.id === action.payload);

      if (!item) return;

      item.qty -= 1;

      if (item.qty <= 0) {
        state.cart = state.cart.filter(
          (p) => p.id !== action.payload
        );
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.id !== action.payload
      );

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    /* ---------------- WISHLIST ---------------- */
    toggleWishlist: (state, action) => {
      const item = action.payload;

      const exists = state.wishlist.find((p) => p.id === item.id);

      if (exists) {
        state.wishlist = state.wishlist.filter(
          (p) => p.id !== item.id
        );
      } else {
        state.wishlist.push(item);
      }

      localStorage.setItem(
        "wishlist",
        JSON.stringify(state.wishlist)
      );
    },

    /* ---------------- ORDERS ---------------- */
    placeOrder: (state) => {
      if (!state.cart.length) return;

      const newOrder = {
        id: Date.now(),
        items: structuredClone
          ? structuredClone(state.cart)
          : JSON.parse(JSON.stringify(state.cart)),
        date: new Date().toLocaleString(),
        status: "Placed",
      };

      state.orders.unshift(newOrder);

      state.cart = [];

      localStorage.setItem("orders", JSON.stringify(state.orders));
      localStorage.setItem("cart", JSON.stringify([]));
    },
  },
});

/* ---------------- EXPORTS ---------------- */
export const {
  addToCart,
  decreaseQty,
  removeFromCart,
  toggleWishlist,
  placeOrder,
} = shopSlice.actions;

export default shopSlice.reducer;