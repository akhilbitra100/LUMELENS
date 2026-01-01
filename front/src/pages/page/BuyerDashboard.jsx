import React, { useState, useEffect } from "react";
import axios from "axios";
import { Download, ImageIcon, Filter, Calendar, Tag, AlertCircle, Loader } from "lucide-react";

function BuyerDashboard() {
  const [purchasedImages, setPurchasedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPurchasedImages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/buyer/purchased-images",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPurchasedImages(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch purchased images.");
        setLoading(false);
      }
    };

    fetchPurchasedImages();
  }, [token]);

  const handleDownload = (imageUrl, imageName = "image.jpg") => {
    const cloudinaryDownloadUrl = imageUrl.replace(
      "/upload/",
      "/upload/fl_attachment:" + imageName.replace(".jpg", "") + "/"
    );
    const link = document.createElement("a");
    link.href = cloudinaryDownloadUrl;
    link.setAttribute("download", imageName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Get unique categories for filter
  const categories = ["all", ...new Set(purchasedImages.map(item => item.category).filter(Boolean))];

  const filteredImages = activeFilter === "all" 
    ? purchasedImages 
    : purchasedImages.filter(item => item.category === activeFilter);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <Loader className="h-10 w-10 text-indigo-500 animate-spin mb-4" />
        <p className="text-gray-600 text-lg">Loading your collection...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h3>
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">My Purchased Images</h2>
              <p className="text-gray-600">Manage and download your photography collection</p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-medium">
                {purchasedImages.length} {purchasedImages.length === 1 ? "Image" : "Images"}
              </span>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        {purchasedImages.length > 0 && (
          <div className="mb-8 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              <div className="bg-white p-2 rounded-lg shadow-sm inline-flex items-center">
                <Filter className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-700 font-medium">Filter by category:</span>
              </div>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === category
                      ? "bg-indigo-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category === "all" ? "All Images" : category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content Section */}
        {purchasedImages.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Images Found</h3>
            <p className="text-gray-600 mb-6">You haven't purchased any images yet.</p>
            <button 
              onClick={() => window.location.href = "/explore"} 
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              Explore Images
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
              >
                {item.src ? (
                  <div className="relative aspect-w-16 aspect-h-9 group">
                    <img
                      src={item.src}
                      alt={item.title || "Purchased Image"}
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() =>
                          handleDownload(
                            item.src,
                            item.title ? `${item.title}.jpg` : "image.jpg"
                          )
                        }
                        className="bg-indigo-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform hover:scale-110"
                      >
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="absolute top-3 right-3 bg-indigo-500 text-white text-xs font-medium px-2 py-1 rounded-md">
                      Purchased
                    </div>
                  </div>
                ) : (
                  <div className="h-56 bg-gray-200 flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                
                <div className="p-5 flex-grow flex flex-col">
                  {item.title && (
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                      {item.title}
                    </h3>
                  )}
                  
                  {item.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
                      {item.description}
                    </p>
                  )}
                  
                  <div className="space-y-2 mt-auto">
                    {item.category && (
                      <div className="flex items-center text-sm">
                        <Tag className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">{item.category}</span>
                      </div>
                    )}
                    
                    {item.purchaseDate && (
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">
                          {new Date(item.purchaseDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    
                    {item.price && (
                      <div className="text-indigo-600 font-semibold text-lg">
                        ₹{item.price}
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() =>
                      handleDownload(
                        item.src,
                        item.title ? `${item.title}.jpg` : "image.jpg"
                      )
                    }
                    className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BuyerDashboard;