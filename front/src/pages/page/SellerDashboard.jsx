// src/components/SellerDashboard.js

import React, { useState } from 'react';
import ImageForm from '../../compo/ImageForm';
import ImageList from '../../compo/ImageList';

function SellerDashboard() {
  const [images, setImages] = useState([]);
  const [imageAdded, setImageAdded] = useState(false); // Add this state

  const handleAddImage = (newImage) => {
    setImages([...images, newImage]);
    setImageAdded(!imageAdded); // Toggle state to trigger re-fetch
  };

  const handleDeleteImage = (indexToDelete) => {
    setImages(images.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded shadow p-4">
            <ImageForm onAddImage={handleAddImage} />
          </div>
          <div className="bg-white rounded shadow p-4">
            <ImageList onAddImage={imageAdded} /> {/* Pass imageAdded, not images state */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;