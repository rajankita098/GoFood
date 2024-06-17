import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Cart from "./screens/Cart";
import Navbar from "./components/Navbar";
import { CartProvider } from "./components/ContextReducer";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const clientId = '998791037081-3or9rnoc64ngc80940nidqup68almopi.apps.googleusercontent.com'; // Replace with your actual Google Client ID

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
