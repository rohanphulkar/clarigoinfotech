import React from "react";
import Navbar from "./layout/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  AddProduct,
  Dashboard,
  Login,
  ProductDetails,
  Register,
  UpdateProduct,
} from "./pages";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoutes";

const App = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto ">
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
        </Route>
        {/* Redirect to root route instead of 404 page if path not found */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
