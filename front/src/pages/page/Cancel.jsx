import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { XCircle, ShoppingCart, ArrowLeft, RefreshCw } from "lucide-react";

function Cancel() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate("/cart");
    }, 5000); // Extended to 5 seconds to give users more time to read

    return () => clearTimeout(redirectTimeout);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-50 p-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl text-center max-w-md w-full relative overflow-hidden">
        {/* Cancel decoration elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 to-red-600"></div>
        <div className="absolute -top-10 -right-10 h-20 w-20 bg-red-100 rounded-full opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 h-16 w-16 bg-red-100 rounded-full opacity-50"></div>
        
        {/* Cancel icon with pulse effect */}
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-red-100 animate-pulse opacity-30"></div>
          <div className="relative flex justify-center">
            <XCircle className="h-20 w-20 text-red-500" strokeWidth={1.5} />
          </div>
        </div>
        
        {/* Content */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-red-700">Order Canceled</h1>
        <p className="text-xl mb-6 text-gray-700">Your order was not placed.</p>
        
        <div className="bg-red-50 p-4 rounded-xl mb-6">
          <p className="text-lg text-gray-700">
            If you faced any issues, please try again or contact our support team for assistance.
          </p>
        </div>
        
        {/* Countdown element */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-8">
          <p className="text-gray-600">
            Redirecting to cart in a few seconds
          </p>
          <div className="flex items-center text-red-600">
            <div className="h-2 w-2 bg-red-600 rounded-full animate-pulse mr-1"></div>
            <div className="h-2 w-2 bg-red-600 rounded-full animate-pulse delay-75 mr-1"></div>
            <div className="h-2 w-2 bg-red-600 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={() => navigate("/cart")}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg transition-all duration-300"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Return to Cart</span>
          </button>
          <button 
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-5 py-3 rounded-lg transition-all duration-300"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Continue Shopping</span>
          </button>
        </div>
        
        {/* Support link */}
        <div className="mt-6 text-center">
          <button 
            onClick={() => navigate("/contact")}
            className="text-red-600 hover:text-red-800 inline-flex items-center text-sm font-medium"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Need help? Contact support
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cancel;