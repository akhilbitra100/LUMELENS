import React from "react";

function Ad() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-200 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
            PERSONALIZED ART
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            CREATE YOUR OWN ART
          </h1>
          <div className="h-1 w-24 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your images and personal possessions into wall art, home
            decor, apparel, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dp2vpmcac/image/upload/v1744373738/photo-uploads/uee3fjpplvvspmx5eez9.jpg"
                alt="Upload & Create"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                UPLOAD & CREATE
              </h3>
              <p className="text-gray-600">
                Upload your photos and transform them into beautiful custom art
                pieces you'll love.
              </p>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-600">
                    Easy upload process
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dp2vpmcac/image/upload/v1744375702/photo-uploads/nt1lltiil6najyarnbze.jpg"
                alt="Photos to Paintings"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                PHOTOS TO PAINTINGS
              </h3>
              <p className="text-gray-600">
                Convert your favorite photographs into stunning paintings with
                our artistic filters.
              </p>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-600">
                    Multiple style options
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src="https://render.fineartamerica.com/images/rendered/medium/framed-print/images/artworkimages/medium/1/hold-on-ruben-ireland.jpg?imgWI=13&imgHI=20&sku=CRQ13&mat1=PM3297&mat2=&t=2&b=2&l=2&r=2&off=0.5&frameW=0.875"
                alt="Mail & Frame"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                MAIL & FRAME
              </h3>
              <p className="text-gray-600">
                Send us your items and we'll professionally frame them for a
                perfect display piece.
              </p>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />
                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-600">
                    Premium framing options
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gradient-to-b from-gray-50 to-gray-200 px-4 text-sm text-gray-500">
              Ready to start?
            </span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://fineartamerica.com/custom"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-colors duration-300">
              Create Your Own
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Ad;
