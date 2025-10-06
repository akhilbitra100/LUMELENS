import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import Home from "./pages/Home";
import Auction from "./pages/Auctions";
import Contact from "./pages/Contacts";
import About from "./pages/Abouts";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Portrait from "./pages/Portraits";
import Landscape from "./pages/Landscapes";
import Wildlife from "./pages/Wildlifes";
import Fashion from "./pages/Fashions";
import Street from "./pages/Streets";
import Sport from "./pages/Sports";
import Architectural from "./pages/Architecturals";
import Event from "./pages/Events";
import Macro from "./pages/Macros";
import Astro from "./pages/Astros";
import Bw from "./pages/Bws";
import Fine from "./pages/Fines";
import Profile from "./pages/Profiles";
import Search from './pages/Searchs';
import BuyerDashboard from "./pages/BuyerDashboards";
import SellerDashboard from "./pages/SellerDashboards";
import ProtectedRoute from "./compo/ProtectedRoute";
import Cart from "./pages/Carts";
import Success from "./pages/page/Success";
import Cancel from "./pages/page/Cancel";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auction" element={<Auction />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/portrait" element={<Portrait />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/landscape" element={<Landscape />} />
          <Route path="/wildlife" element={<Wildlife />} />
          <Route path="/fashion" element={<Fashion />} />
          <Route path="/street" element={<Street />} />
          <Route path="/sport" element={<Sport />} />
          <Route path="/architecture" element={<Architectural />} />
          <Route path="/event" element={<Event />} />
          <Route path="/macro" element={<Macro />} />
          <Route path="/astro" element={<Astro />} />
          <Route path="/bw" element={<Bw />} />
          <Route path="/fine" element={<Fine />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route
            path="/buyer-dashboard"
            element={
              <ProtectedRoute allowedRoles={["buyer"]}>
                <BuyerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller-dashboard"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <SellerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
