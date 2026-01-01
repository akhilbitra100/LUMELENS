import React, { useState, useEffect } from "react";
import axios from "axios";

function ImageList({ onAddImage }) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");

  const categories = [
    "All Categories",
    "Portrait Photography",
    "Landscape Photography",
    "Wildlife Photography",
    "Fashion Photography",
    "Street Photography",
    "Sports Photography",
    "Architectural Photography",
    "Event Photography",
    "Macro Photography",
    "Astrophotography",
    "Black & White Photography",
    "Fine Art Photography",
  ];

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (onAddImage) {
      fetchImages();
    }
  }, [onAddImage]);

  const handleDelete = async (image) => {
    setDeleteConfirmation(image);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation) return;
    
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("Authentication token not found. Please log in.");
        setIsLoading(false);
        return;
      }

      const decodedToken = decodeJwt(token);
      const sellerId = decodedToken.userId;
      if (deleteConfirmation.sellerId !== sellerId) {
        setErrorMessage("You do not have permission to delete this image.");
        setIsLoading(false);
        return;
      }

      await axios.delete(`http://localhost:4000/photos/${deleteConfirmation._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setImages((prevImages) => prevImages.filter((img) => img._id !== deleteConfirmation._id));
      setDeleteConfirmation(null);
      setIsLoading(false);
    } catch (error) {
      console.error("Error deleting image:", error);
      setErrorMessage(error.response?.data?.message || "Failed to delete image.");
      setIsLoading(false);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation(null);
  };

  const decodeJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("Authentication token not found. Please log in.");
        setIsLoading(false);
        return;
      }

      const decodedToken = decodeJwt(token);
      const sellerId = decodedToken.userId;

      const response = await axios.get(`http://localhost:4000/photos/seller/${sellerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setImages(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setErrorMessage(error.response?.data?.message || "Failed to fetch images.");
      setIsLoading(false);
    }
  };

  const openImageDetails = (image) => {
    setSelectedImage(image);
  };

  const closeImageDetails = () => {
    setSelectedImage(null);
  };

  const filteredImages = filterCategory && filterCategory !== "All Categories"
    ? images.filter(image => image.category === filterCategory)
    : images;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Photography Portfolio</h2>
        
        <div className="mt-3 md:mt-0">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {errorMessage && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No images found</h3>
          <p className="mt-1 text-gray-500">
            {filterCategory && filterCategory !== "All Categories" 
              ? `You haven't added any images in the "${filterCategory}" category yet.` 
              : "You haven't added any images to your portfolio yet."}
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setFilterCategory("")}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add your first image
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div key={image._id} className="overflow-hidden rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <div 
                className="relative h-48 overflow-hidden cursor-pointer"
                onClick={() => openImageDetails(image)}
              >
                <img 
                  src={image.src} 
                  alt={image.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <h3 className="font-medium text-white truncate">{image.title}</h3>
                  <p className="text-xs text-gray-300">{image.category}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-lg font-bold text-gray-900">₹{image.price.toLocaleString('en-IN')}</p>
                  <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                    {image.category.split(' ')[0]}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{image.description}</p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => openImageDetails(image)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleDelete(image)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Detail Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-auto overflow-hidden shadow-xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">{selectedImage.title}</h3>
              <button 
                onClick={closeImageDetails}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="md:flex">
              <div className="md:w-1/2 p-4">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.title} 
                  className="w-full h-auto object-contain rounded" 
                />
              </div>
              <div className="md:w-1/2 p-4">
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500">Category</h4>
                  <p>{selectedImage.category}</p>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500">Price</h4>
                  <p className="text-2xl font-bold text-gray-900">₹{selectedImage.price.toLocaleString('en-IN')}</p>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500">Description</h4>
                  <p className="text-gray-700">{selectedImage.description}</p>
                </div>
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => handleDelete(selectedImage)}
                    className="flex items-center justify-center px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Image
                  </button>
                  <button
                    onClick={closeImageDetails}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full mx-auto p-6 shadow-xl">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg font-medium text-gray-900">Delete Image</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete "{deleteConfirmation.title}"? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={confirmDelete}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={cancelDelete}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageList;