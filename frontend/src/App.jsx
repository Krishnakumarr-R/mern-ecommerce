import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "./components/LoadingSpinner";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";

import { useUserStore } from "./stores/useUserStore";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

const App = () => {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;

    getCartItems();
  }, [getCartItems, user]);

  if (checkingAuth) return <LoadingSpinner />;
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/secret-dashboard"
          element={
            user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />
          }
        />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route
          path="/cart"
          element={user ? <CartPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/purchase-success"
          element={user ? <PurchaseSuccessPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/purchase-cancel"
          element={user ? <PurchaseCancelPage /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
