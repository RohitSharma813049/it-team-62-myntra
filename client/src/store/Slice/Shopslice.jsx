import { createSlice } from "@reduxjs/toolkit";

const load = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

const initialState = {
  cart: load("cart"),
  wishlist: load("wishlist"),
  orders: load("orders"),
};

const shopSlice = createSlice({
  name: "shop",
  initialState,

  reducers: {
    // 🛒 ADD TO CART
    addToCart: (state, action) => {
      const item = action.payload;

      const exists = state.cart.find((p) => p.id === item.id);

      if (exists) {
        exists.qty += 1;
      } else {
        state.cart.push({
          ...item,
          qty: item.qty || 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    // ➖ DECREASE QTY
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

    // ❌ REMOVE FROM CART (FIXED POSITION)
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.id !== action.payload
      );

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    // 💖 WISHLIST
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

    // 💳 PLACE ORDER
    placeOrder: (state) => {
      if (state.cart.length === 0) return;

      const newOrder = {
        id: Date.now(),
        items: JSON.parse(JSON.stringify(state.cart)),
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

export const {
  addToCart,
  decreaseQty,
  removeFromCart,
  toggleWishlist,
  placeOrder,
} = shopSlice.actions;

export default shopSlice.reducer;