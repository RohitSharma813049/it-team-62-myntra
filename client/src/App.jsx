import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import StructureLoader from "./components/Loader/SkalatenLoader";

//  Lazy EVERYTHING (except loader)
const Layout = lazy(() => import("./Pages/Layout"));
const Layoutsdashboard = lazy(() => import("./Pages/Layoutsdashboard"));
const AccountLayout = lazy(() => import("./Pages/AccountLayout"));

const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./components/Authpage/Authpage"));
const ProductPage = lazy(() => import("./Pages/Productpage"));
const SearchPage = lazy(() => import("./Pages/SearchPage"));
const BeautyPage = lazy(() => import("./Pages/Beautypage"));
const OffersPage = lazy(() => import("./Pages/Offerpage"));

const Overview = lazy(() => import("./components/Account/Overview"));
const Orders = lazy(() => import("./components/Account/Orders"));
const Wishlist = lazy(() => import("./components/Account/Wishlist"));
const Profile = lazy(() => import("./components/Account/Profile"));
const Coupons = lazy(() => import("./components/Account/Coupons"));
const SavedVPA = lazy(() => import("./components/Account/SavedVPA"));
const SavedCards = lazy(() => import("./components/Account/SavedCards"));
const SavedAddress = lazy(() => import("./components/Account/Savedaddress"));
const Cart = lazy(() => import("./components/Account/Carts"));

const Loader = () => <StructureLoader />;

//  Private Route
const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/login" replace />;
};

//  Public Route
const PublicRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user ? <Navigate to="/" replace /> : children;
};

function App() {
  return (
    <Routes>

      {/*  HOME */}
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <Layout />
          </Suspense>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          }
        />

        <Route
          path="offers"
          element={
            <Suspense fallback={<Loader />}>
              <OffersPage />
            </Suspense>
          }
        />

        <Route
          path="beauty"
          element={
            <Suspense fallback={<Loader />}>
              <BeautyPage />
            </Suspense>
          }
        />

        <Route
          path="search"
          element={
            <Suspense fallback={<Loader />}>
              <SearchPage />
            </Suspense>
          }
        />

        {/*  PRODUCT */}
        <Route
          path="product/:id"
          element={
            <Suspense fallback={<Loader />}>
              <ProductPage />
            </Suspense>
          }
        />

        {/*  LOGIN */}
        <Route element={<AccountLayout />}>
          <Route
            path="login"
            element={
              <PublicRoute>
                <Suspense fallback={<Loader />}>
                  <Login />
                </Suspense>
              </PublicRoute>
            }
          />
        </Route>

        {/*  DASHBOARD */}
        <Route
          path="account"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loader />}>
                <Layoutsdashboard />
              </Suspense>
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
          <Route path="cart" element={<Cart />} />
        </Route>

      </Route>

      {/* 404 */}
      <Route path="*" element={<h1>404 Not Found</h1>} />

    </Routes>
  );
}

export default App; 