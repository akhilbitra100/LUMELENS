import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ShoppingBag, Home, ArrowRight } from "lucide-react";
import { CartContext } from "../../context/CartContext";

export default function Success() {
  const navigate = useNavigate();
  const { setCart } = useContext(CartContext);

  useEffect(() => {
    setCart([]); // Clear the cart state
    localStorage.removeItem("cart"); // Clear local storage

    const timer = setTimeout(() => {
      navigate("/"); // Redirect to home page
    }, 5000); // Extended to 5 seconds to give users time to read

    return () => clearTimeout(timer);
  }, [navigate, setCart]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl text-center max-w-md w-full relative overflow-hidden">
        {/* Success decoration elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-indigo-500"></div>
        <div className="absolute -top-10 -right-10 h-20 w-20 bg-indigo-100 rounded-full opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 h-16 w-16 bg-green-100 rounded-full opacity-50"></div>
        
        {/* Success icon with pulse animation */}
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-25"></div>
          <div className="relative flex justify-center">
            <CheckCircle className="h-20 w-20 text-green-500" strokeWidth={1.5} />
          </div>
        </div>
        
        {/* Content */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-700">Thank You!</h1>
        <p className="text-xl mb-6 text-gray-700">
          Your order has been placed successfully.
        </p>
        <div className="bg-green-50 p-4 rounded-xl mb-6">
          <p className="text-lg text-gray-700 mb-2">
            We will send you a confirmation email with details about your order.
          </p>
          <div className="flex items-center justify-center text-green-700">
            <ShoppingBag className="h-5 w-5 mr-2" />
            <span className="font-medium">Order Confirmed</span>
          </div>
        </div>
        
        {/* Countdown element */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-8">
          <p className="text-gray-600">
            Redirecting to home page in a few seconds
          </p>
          <div className="flex items-center text-indigo-600">
            <div className="h-2 w-2 bg-indigo-600 rounded-full animate-pulse mr-1"></div>
            <div className="h-2 w-2 bg-indigo-600 rounded-full animate-pulse delay-75 mr-1"></div>
            <div className="h-2 w-2 bg-indigo-600 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg transition-all duration-300"
          >
            <Home className="h-5 w-5" />
            <span>Go to Home</span>
          </button>
          <button 
            onClick={() => navigate("/buyer-dashboard")}
            className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-indigo-700 border border-indigo-200 px-5 py-3 rounded-lg transition-all duration-300"
          >
            <span>View Images</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}