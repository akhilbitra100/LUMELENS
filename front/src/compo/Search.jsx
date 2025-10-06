import React, { useState, useEffect, useContext } from "react";
import { ShoppingCart } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Search() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, setCart } = useContext(CartContext);
  const { user } = useAuth();
  const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);
  const [addedItemTitle, setAddedItemTitle] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get(
          `http://localhost:4000/photos?q=${searchTerm}`,
          { headers }
        );

        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Invalid data received from server.");
        }

        setSearchResults(response.data);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError("Failed to load search results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchSearchResults();
    } else {
      setLoading(false);
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleAddToCart = (image) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === image._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === image._id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...image, quantity: 1 }];
      }
    });

    setAddedItemTitle(image.title);
    setShowAddToCartMessage(true);

    setTimeout(() => {
      setShowAddToCartMessage(false);
      setAddedItemTitle("");
    }, 2000);
  };

  const toggleExpandItem = (id) => {
    if (expandedItem === id) {
      setExpandedItem(null);
    } else {
      setExpandedItem(id);
    }
  };

  const filteredResults = () => {
    if (activeFilter === "all") return searchResults;
    if (activeFilter === "budget")
      return searchResults.filter((item) => item.price <= 1000);
    if (activeFilter === "premium")
      return searchResults.filter(
        (item) => item.price > 1000 && item.price <= 5000
      );
    if (activeFilter === "luxury")
      return searchResults.filter((item) => item.price > 5000);
    return searchResults;
  };

  // Price ranges for filtering with new categories
  const priceRanges = {
    all: searchResults.length,
    budget: searchResults.filter((item) => item.price <= 1000).length,
    premium: searchResults.filter(
      (item) => item.price > 1000 && item.price <= 5000
    ).length,
    luxury: searchResults.filter((item) => item.price > 5000).length,
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 relative">
          <div className="w-full h-full border-4 border-gray-200 rounded-full"></div>
          <div className="w-full h-full border-t-4 border-blue-500 rounded-full absolute top-0 left-0 animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-600">
          Finding results for "{searchTerm}"...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-red-100 rounded-xl shadow-lg">
        {/* Error Header with Icon */}
        <div className="flex items-center mb-6">
          <div className="p-3 rounded-full bg-red-50 text-red-500">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
          </div>
          <h2 className="ml-4 text-xl font-bold text-gray-900">
            Something went wrong
          </h2>
        </div>
  
        {/* Error Message in Highlighted Box */}
        <div className="bg-red-50 p-4 rounded-lg mb-6 border-l-4 border-red-500">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
  
        {/* Help Text */}
        <p className="text-gray-600 mb-6">
          This might be a temporary issue. Please try again or log in to continue.
        </p>
  
        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={() => window.location.href = "/signin"}
          >
            Log In
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg transition duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-medium text-gray-900">
            {searchResults.length > 0 ? (
              <span>
                Search results for{" "}
                <span className="font-bold">"{searchTerm}"</span>
              </span>
            ) : (
              <span>
                No matches found for{" "}
                <span className="font-bold">"{searchTerm}"</span>
              </span>
            )}
          </h1>
          {searchResults.length > 0 && (
            <p className="text-gray-500 mt-1">
              {searchResults.length} items found
            </p>
          )}
        </div>

        {searchResults.length > 0 ? (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Improved Filters sidebar */}
            <div className="w-full md:w-72 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <h2 className="font-medium text-lg text-gray-900 mb-4">
                  Filters
                </h2>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Price Range
                  </h3>

                  {/* Enhanced filter buttons with visual improvements */}
                  <div className="space-y-3">
                    <button
                      className={`w-full text-left px-4 py-3 rounded-lg flex justify-between items-center transition ${
                        activeFilter === "all"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "border border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                      }`}
                      onClick={() => setActiveFilter("all")}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${
                            activeFilter === "all"
                              ? "bg-blue-600"
                              : "border border-gray-400"
                          }`}
                        >
                          {activeFilter === "all" && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="font-medium">All Photos</span>
                      </div>
                      <span className="text-sm px-2 py-0.5 bg-gray-100 rounded-full">
                        {priceRanges.all}
                      </span>
                    </button>

                    <button
                      className={`w-full text-left px-4 py-3 rounded-lg flex justify-between items-center transition ${
                        activeFilter === "budget"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "border border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                      }`}
                      onClick={() => setActiveFilter("budget")}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${
                            activeFilter === "budget"
                              ? "bg-blue-600"
                              : "border border-gray-400"
                          }`}
                        >
                          {activeFilter === "budget" && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <span className="font-medium">Budget</span>
                          <p className="text-xs text-gray-500">≤₹1,000</p>
                        </div>
                      </div>
                      <span className="text-sm px-2 py-0.5 bg-gray-100 rounded-full">
                        {priceRanges.budget}
                      </span>
                    </button>

                    <button
                      className={`w-full text-left px-4 py-3 rounded-lg flex justify-between items-center transition ${
                        activeFilter === "premium"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "border border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                      }`}
                      onClick={() => setActiveFilter("premium")}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${
                            activeFilter === "premium"
                              ? "bg-blue-600"
                              : "border border-gray-400"
                          }`}
                        >
                          {activeFilter === "premium" && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <span className="font-medium">Premium</span>
                          <p className="text-xs text-gray-500">
                            ₹1,001 - ₹5,000
                          </p>
                        </div>
                      </div>
                      <span className="text-sm px-2 py-0.5 bg-gray-100 rounded-full">
                        {priceRanges.premium}
                      </span>
                    </button>

                    <button
                      className={`w-full text-left px-4 py-3 rounded-lg flex justify-between items-center transition ${
                        activeFilter === "luxury"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "border border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                      }`}
                      onClick={() => setActiveFilter("luxury")}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${
                            activeFilter === "luxury"
                              ? "bg-blue-600"
                              : "border border-gray-400"
                          }`}
                        >
                          {activeFilter === "luxury" && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <span className="font-medium">Luxury</span>
                          <p className="text-xs text-gray-500">₹5,000+</p>
                        </div>
                      </div>
                      <span className="text-sm px-2 py-0.5 bg-gray-100 rounded-full">
                        {priceRanges.luxury}
                      </span>
                    </button>
                  </div>

                  {/* Clear filters button */}
                  {activeFilter !== "all" && (
                    <button
                      onClick={() => setActiveFilter("all")}
                      className="mt-4 text-sm text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      Clear filters
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Results grid */}
            <div className="flex-1">
              {/* Active filter summary */}
              {activeFilter !== "all" && (
                <div className="bg-blue-50 rounded-lg p-3 mb-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      ></path>
                    </svg>
                    <span className="text-blue-700 font-medium">
                      {activeFilter === "budget" && "Budget photos (≤₹1,000)"}
                      {activeFilter === "premium" &&
                        "Premium photos (₹1,001-₹5,000)"}
                      {activeFilter === "luxury" && "Luxury photos (₹5,000+)"}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveFilter("all")}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredResults().map((photo) => (
                  <div
                    key={photo._id}
                    className={`bg-white rounded-lg shadow-sm overflow-hidden transition duration-300 ${
                      expandedItem === photo._id
                        ? "col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col md:flex-row"
                        : ""
                    }`}
                  >
                    <div
                      className={`relative cursor-pointer ${
                        expandedItem === photo._id
                          ? "md:w-1/2 lg:w-1/3"
                          : "w-full"
                      }`}
                      onClick={() => toggleExpandItem(photo._id)}
                    >
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className={`w-full ${
                          expandedItem === photo._id
                            ? "h-64 md:h-full object-cover"
                            : "h-48 sm:h-52 lg:h-56 object-cover"
                        }`}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 hover:opacity-100 text-white">
                          {expandedItem === photo._id ? (
                            <svg
                              className="w-8 h-8"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              className="w-8 h-8"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              ></path>
                            </svg>
                          )}
                        </div>
                      </div>

                      {/* Price category badge */}
                      <div className="absolute top-2 right-2">
                        {photo.price <= 1000 ? (
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                            Budget
                          </span>
                        ) : photo.price <= 5000 ? (
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                            Premium
                          </span>
                        ) : (
                          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
                            Luxury
                          </span>
                        )}
                      </div>
                    </div>

                    <div
                      className={`p-4 ${
                        expandedItem === photo._id
                          ? "md:w-1/2 lg:w-2/3 flex flex-col"
                          : ""
                      }`}
                    >
                      <h2
                        className="font-medium text-gray-900 mb-1 hover:text-blue-700 cursor-pointer"
                        onClick={() => toggleExpandItem(photo._id)}
                      >
                        {photo.title}
                      </h2>

                      <p
                        className={`text-gray-600 text-sm ${
                          expandedItem === photo._id ? "" : "line-clamp-2"
                        } mb-3`}
                      >
                        {photo.description}
                      </p>
                      <p className="text-sm font-semibold text-gray-600 mb-5">
                        {photo.category}
                      </p>

                      {expandedItem === photo._id && (
                        <div className="mb-4 mt-2">
                          <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                            <svg
                              className="w-5 h-5 mr-2 text-blue-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                            Product Details
                          </h3>

                          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">
                                  Product ID
                                </p>
                                <p className="text-sm font-medium text-gray-700">
                                  {photo._id}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">
                                  Category
                                </p>
                                <p className="text-sm font-medium text-gray-700">
                                  {photo.category}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">
                                  Format
                                </p>
                                <p className="text-sm font-medium text-gray-700">
                                  Digital Download
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">
                                  Price Category
                                </p>
                                <p className="text-sm font-medium">
                                  {photo.price <= 1000 ? (
                                    <span className="text-green-600">
                                      Budget
                                    </span>
                                  ) : photo.price <= 5000 ? (
                                    <span className="text-blue-600">
                                      Premium
                                    </span>
                                  ) : (
                                    <span className="text-purple-600">
                                      Luxury
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div
                        className={`flex justify-between items-center mt-auto ${
                          expandedItem === photo._id
                            ? "pt-4 border-t border-gray-100"
                            : ""
                        }`}
                      >
                        <div>
                          <p className="font-bold text-lg text-gray-900">
                            ₹{photo.price.toLocaleString("en-IN")}
                          </p>
                        </div>

                        {user ? (
                          <button
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-300"
                            onClick={() => handleAddToCart(photo)}
                          >
                            <ShoppingCart
                              className="inline-block align-middle mr-1"
                              size={16}
                            />{" "}
                            Add to Cart
                          </button>
                        ) : (
                          <button
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-md transition duration-300"
                            onClick={() =>
                              alert("Please sign in to add items to your cart")
                            }
                          >
                            Sign in
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredResults().length === 0 && (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <svg
                    className="w-12 h-12 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No photos found
                  </h3>
                  <p className="text-gray-600">
                    No photos match the selected price range.
                  </p>
                  <button
                    className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                    onClick={() => setActiveFilter("all")}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <svg
              className="w-16 h-16 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              No results found
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              We couldn't find any photos matching "{searchTerm}". Try checking
              your spelling or using more general terms.
            </p>
            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-3">
                Popular searches
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition">
                  Landscapes
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition">
                  Portraits
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition">
                  Abstract
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition">
                  Nature
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add to cart toast notification */}
      {showAddToCartMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-6 py-3 rounded-full shadow-xl flex items-center space-x-2 z-50 animate-fade-in-up">
          <svg
            className="w-5 h-5 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <span>Added {addedItemTitle} to cart</span>
        </div>
      )}
    </div>
  );
}

export default Search;
