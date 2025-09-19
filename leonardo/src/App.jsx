import { useState } from "react";
import "./App.css";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/repeats/Header";
import Footer from "./components/repeats/Footer";
import Shop from "./pages/Shop";
import ProductCheckout from "./pages/ProductCheckout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CheckoutShell from "./pages/CheckoutShell";
import Wishlist from "./pages/Wishlist";
import Configuration from "./pages/Configuration";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/checkout" element={<ProductCheckout />} />
        <Route path="/checkout2" element={<CheckoutShell />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/gallery" element={<Wishlist />} />
        <Route path="/configuration" element={<Configuration />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
