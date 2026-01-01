import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function Wildlife() {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useAuth();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);
  const [addedItemTitle, setAddedItemTitle] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "http://localhost:4000/photos?category=Wildlife%20Photography"
        );

        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Invalid data received from server.");
        }

        setImages(response.data);
      } catch (err) {
        console.error("Error fetching photos:", err);
        setError("Failed to load wildlife photos. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const addToCart = (image) => {
    setCart((prevCart) => [...prevCart, image]);
    
    // Show notification
    setAddedItemTitle(image.title);
    setShowAddToCartMessage(true);

    // Hide notification after 2 seconds
    setTimeout(() => {
      setShowAddToCartMessage(false);
      setAddedItemTitle("");
    }, 2000);
  };

  // Filter images by price range
  const getFilteredImages = () => {
    if (selectedFilter === "all") return images;
    if (selectedFilter === "budget") return images.filter(img => img.price <= 1000);
    if (selectedFilter === "premium") return images.filter(img => img.price > 1000 && img.price <= 5000);
    if (selectedFilter === "luxury") return images.filter(img => img.price > 5000);
    return images;
  };

  const filteredImages = getFilteredImages();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-amber-500 font-medium">Loading wildlife photos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center my-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="text-red-700 text-lg font-semibold">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center bg-gray-50 rounded-xl shadow-sm my-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-gray-600 text-xl font-medium">
          No wildlife photographs are currently available.
        </p>
        <p className="text-gray-500 mt-2">
          Please check back later for our upcoming collection.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="container mx-auto px-4 pt-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-700 rounded-2xl shadow-lg mb-8 overflow-hidden">
          <div className="max-w-4xl mx-auto py-12 px-6 md:px-12 md:flex md:items-center md:justify-between">
            <div className="text-center md:text-left md:max-w-lg">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Wildlife Photography</h1>
              <p className="text-amber-100 text-lg mb-6">
                Discover extraordinary moments of wildlife captured in their natural habitats.
              </p>
              {!user && (
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm text-white text-sm">
                  <p>Sign in to save your favorite photos and make purchases.</p>
                </div>
              )}
            </div>
            <div className="hidden md:block h-40 w-40 bg-amber-500 bg-opacity-30 rounded-full backdrop-blur-md"></div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6 md:justify-between items-center">
          <div className="flex gap-2 flex-wrap">
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedFilter === 'all' ? 'bg-amber-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setSelectedFilter('all')}
            >
              All Wildlife
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedFilter === 'budget' ? 'bg-amber-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setSelectedFilter('budget')}
            >
              Budget (≤₹1,000)
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedFilter === 'premium' ? 'bg-amber-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setSelectedFilter('premium')}
            >
              Premium (₹1,001-₹5,000)
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedFilter === 'luxury' ? 'bg-amber-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setSelectedFilter('luxury')}
            >
              Luxury (₹5,000+)
            </button>
          </div>
          <p className="text-gray-600 font-medium">{filteredImages.length} wildlife photos found</p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image._id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 hover:shadow-xl group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-64 object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">
                    {image.title}
                  </h2>
                  <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-1 rounded">
                    ₹{image.price.toLocaleString('en-IN')}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-5 line-clamp-3 text-sm">
                  {image.description}
                </p>
                
                {user ? (
                  <button
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2.5 px-5 rounded-lg transition duration-300 flex items-center justify-center gap-2"
                    onClick={() => addToCart(image)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                      <path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    Add to Cart
                  </button>
                ) : (
                  <div className="text-center p-2 bg-gray-100 rounded-lg">
                    <p className="text-gray-600 text-sm">Sign in to purchase</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-100 inline-flex rounded-full p-4 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No matching wildlife photos found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filter criteria to see more results.</p>
            <button 
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
              onClick={() => setSelectedFilter('all')}
            >
              View All Wildlife Photos
            </button>
          </div>
        )}
      </div>

      {/* Add to Cart Notification */}
      {showAddToCartMessage && (
        <div className="fixed bottom-6 right-6 bg-amber-600 text-white px-5 py-4 rounded-lg shadow-lg transition-opacity duration-500 z-50 flex items-center gap-3 animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-medium">{addedItemTitle}</p>
            <p className="text-amber-100 text-sm">Added to your cart</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Wildlife;