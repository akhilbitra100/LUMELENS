import React, { useState, useRef } from "react";

function ImageForm({ onAddImage }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const categories = [
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

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!category) newErrors.category = "Please select a category";
    if (!price || price <= 0) newErrors.price = "Please enter a valid price";
    if (!imageFile) newErrors.image = "Please select an image file";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      // Clear the error if it exists
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: undefined }));
      }
    } else {
      setPreviewUrl(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        if (errors.image) {
          setErrors(prev => ({ ...prev, image: undefined }));
        }
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", Number(price));
    formData.append("image", imageFile);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication token not found. Please log in.");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("http://localhost:4000/photos", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "File upload failed");
      }

      const data = await response.json();
      onAddImage({
        name,
        description,
        category,
        price: parseFloat(price),
        src: data.photo.src,
        _id: data.photo._id,
        sellerId: data.photo.sellerId,
      });

      // Reset form
      setName("");
      setDescription("");
      setCategory("");
      setPrice("");
      setImageFile(null);
      setPreviewUrl(null);
      setErrors({});
      
      // Show success message (you could implement a toast notification here)
    } catch (error) {
      console.error("Error uploading file:", error);

      if (error.response) {
        console.error("Server responded with status:", error.response.status);
        console.error("Server response data:", error.response.data);
        alert(
          `File upload failed: ${error.response.data?.message || "Server error"}`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("File upload failed: No response from server.");
      } else {
        alert("File upload failed. Check the console for details.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-800/95">Add New Image</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Image Title
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({...errors, name: undefined});
            }}
            className={`block w-full rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2.5 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter a title for your image"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) setErrors({...errors, description: undefined});
            }}
            className={`block w-full rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2.5 border ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Describe your image"
            rows="3"
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>
        
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              if (errors.category) setErrors({...errors, category: undefined});
            }}
            className={`block w-full rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2.5 border ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
        </div>
        
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Price (₹)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-500">₹</span>
            </div>
            <input
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                if (errors.price) setErrors({...errors, price: undefined});
              }}
              className={`block w-full rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pl-8 px-4 py-2.5 border ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="0.00"
              min="0"
            />
          </div>
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
        </div>
        
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          
          <div 
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors ${
              errors.image ? "border-red-400" : previewUrl ? "border-indigo-400 bg-indigo-50" : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
            />
            
            {!previewUrl ? (
              <div className="space-y-2">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path 
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                </svg>
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-indigo-600 hover:text-indigo-500">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-64 mx-auto rounded"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center items-center text-white font-medium rounded-md px-4 py-3 ${
            isSubmitting 
              ? "bg-indigo-400 cursor-not-allowed" 
              : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </>
          ) : (
            "Upload Image"
          )}
        </button>
      </form>
    </div>
  );
}

export default ImageForm;