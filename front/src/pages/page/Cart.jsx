import { useState, useContext, useEffect } from "react";
import { Trash2, ShoppingBag, ArrowLeft, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";

function decodeJwtPayload(token) {
  if (!token) {
    return null;
  }
  const base64Url = token.split('.')[1];
  if (!base64Url) {
    return null;
  }
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  try {
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT payload:", error);
    return null;
  }
}

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Ensure each cart item has a unique cartItemId
  useEffect(() => {
    // Only process if we have items without cartItemId
    if (cart.some(item => !item.cartItemId)) {
      const updatedCart = cart.map(item => {
        // If item already has a cartItemId, keep it as is
        if (item.cartItemId) return item;
        // Otherwise add a unique cartItemId
        return {
          ...item,
          cartItemId: `${item._id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        };
      });
      setCart(updatedCart);
    }
  }, [cart, setCart]);

  const handleRemove = (cartItemId) => {
    const updatedCart = cart.filter((item) => item.cartItemId !== cartItemId);
    setCart(updatedCart);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal;

  const stripePromise = loadStripe(
    "pk_test_51QypkWISJBjrAV9XjsuDlvljEB2rJb5mgvy4Hju5fZNgiMnU9FpCQHtzme6n3fw6bNDacRxPulNZz5phPmTsnpIU00wbZvPuaS"
  );

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const stripe = await stripePromise;
      const authToken = localStorage.getItem('token');
      console.log("Frontend authToken before fetch:", authToken);

      const payload = decodeJwtPayload(authToken);
      const userId = payload ? payload.userId : null;
      console.log("Frontend userId from token:", userId);

      if (!userId) {
        setError("Please log in to complete your purchase");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:4000/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartItems: cart.map((item) => ({
              ...item,
              price: parseFloat(item.price),
            })),
            amount: total,
            userId: userId,
          }),
        }
      );

      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
        setError(result.error.message);
      }
      setCart();
    } catch (error) {
      console.error("Error creating checkout session:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with breadcrumb */}
        <div className="mb-8">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-4 group">
            <ArrowLeft size={16} className="mr-2 group-hover:translate-x-[-2px] transition-transform" />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
        </div>

        {cart.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Cart Items */}
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item.cartItemId || `temp-${Math.random()}`} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center">
                  <div className="flex-shrink-0 mr-6">
                    {item && item.src ? (
                      <img
                        src={item.src}
                        alt={item.title || item.name || "Product Image"}
                        className="w-20 h-20 object-cover rounded-md"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/path/to/placeholder.jpg";
                        }}
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-sm">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex-grow mt-4 sm:mt-0">
                    <h3 className="text-lg font-medium text-gray-800">{item.title || item.name}</h3>
                    {item.description && (
                      <p className="text-gray-500 text-sm mt-1 line-clamp-1">{item.description}</p>
                    )}
                  </div>
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto mt-4 sm:mt-0">
                    <div className="font-semibold text-gray-900 text-lg">
                      ₹{item.price.toFixed(2)}
                    </div>
                    <button
                      onClick={() => handleRemove(item.cartItemId || item._id)}
                      className="ml-6 p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Order Summary */}
            <div className="bg-gray-50 p-6 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3"></div>
                <div className="flex justify-between font-semibold text-lg text-gray-900">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <button
                  disabled={cart.length === 0 || loading}
                  className={`w-full mt-4 py-3 px-4 flex items-center justify-center rounded-lg font-medium transition-colors ${
                    cart.length === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : loading
                      ? "bg-blue-400 text-white cursor-wait"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                  onClick={handleCheckout}
                >
                  <CreditCard size={18} className="mr-2" />
                  {loading ? "Processing..." : "Proceed to Checkout"}
                </button>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mt-4">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
              <ShoppingBag size={28} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}