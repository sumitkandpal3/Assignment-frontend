import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AdminPanel from "./components/AdminPanel";
import ProductDetail from "./components/ProductDetail";
import Dashboard from "./components/Admin/Dashboard";
import AdminLayout from "./components/Admin/AdminLayout";
import Layout from "./components/Layout";
import AllProducts from "./components/Admin/AllProducts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/admin/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="product/create" element={<AdminPanel />} />
          <Route path="products/all" element={<AllProducts />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
