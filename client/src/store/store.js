import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/AuthSlice";
import shopReducer from "./Slice/Shopslice.jsx"

const store = configureStore({
    reducer: {
        
        auth: authReducer,
        shop: shopReducer,
        
    },
})

export default store;