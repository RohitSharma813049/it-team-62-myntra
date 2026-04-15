import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "./Pages/Layout";
import Layoutsdashboard from "./Pages/Layoutsdashboard";
import ProductPage from "./Pages/Productpage";

import Coupons from "./components/Account/Coupons";
import SavedVPA from "./components/Account/SavedVPA";
import SavedCards from "./components/Account/SavedCards";
import SavedAddress from "./components/Account/Savedaddress";
import Cart from "./components/Account/Carts";
import SearchPage from "./Pages/SearchPage";
import BeautyPage from "./Pages/Beautypage"
import OffersPage from "./Pages/Offerpage"

// Lazy imports
const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./components/Authpage/Authpage"));

const Overview = lazy(() => import("./components/Account/Overview"));
const Orders = lazy(() => import("./components/Account/Orders"));
const Wishlist = lazy(() => import("./components/Account/Wishlist"));
const Profile = lazy(() => import("./components/Account/Profile"));

const Loader = () => <div>Loading...</div>;

// 🔒 Private Route
const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/login" replace />;
};

// 🔓 Public Route
const PublicRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user ? <Navigate to="/" replace /> : children;
};

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>

        {/* 🏠 HOME (ONLY HERE NAVBAR EXISTS) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/offers" element={<OffersPage />} />
         <Route path="/beauty" element={<BeautyPage />} />

          <Route path="/search" element={<SearchPage />} />
         {/* 📦 PRODUCT (NO NAVBAR) */}
        <Route path="/product/:id" element={<ProductPage />} />

        {/* 🔐 LOGIN (NO NAVBAR) */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* 👤 DASHBOARD (NO NAVBAR) */}
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Layoutsdashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="orders" element={<Orders />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="profile" element={<Profile />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="vpa" element={<SavedVPA />} />
          <Route path="cards" element={<SavedCards />} />
          <Route path="address" element={<SavedAddress />} />
          <Route path="cart" element={<Cart/>}/>
        </Route>

        </Route>

       

        {/* ❌ 404 */}
        <Route path="*" element={<h1>404 Not Found</h1>} />

      </Routes>
    </Suspense>
  );
}

export default App;