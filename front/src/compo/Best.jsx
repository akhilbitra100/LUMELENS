import React from "react";

function Best() {
  const products = [
    {
      id: 1,
      title: "White Snow",
      description: "Mountain Peak",
      price: "₹2,000",
      badge: "Popular",
      image: "https://res.cloudinary.com/dp2vpmcac/image/upload/v1744351469/photo-uploads/at0qqrr4ksnbvhro7jqx.jpg",
      category: "Landscape Photography",
    },
    {
      id: 2,
      title: "Spider Eyes",
      description: 'Depth of Eyes',
      price: "₹5,000",
      badge: "Limited",
      image: "https://res.cloudinary.com/dp2vpmcac/image/upload/v1744375212/photo-uploads/qw0bhyvem97jbdicjogz.jpg",
      category: "Macro Photography",
    },
    {
      id: 3,
      title: "Eiffel Tower",
      description: "Known as Steel Tower",
      price: "₹1,400",
      badge: "Sale",
      image: "https://res.cloudinary.com/dp2vpmcac/image/upload/v1744376155/photo-uploads/fichzyuehxrfhw9v3l9e.jpg",
      category: "Architecture Photography",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-4 py-1.5 rounded-full uppercase tracking-wide">Wall Art Collection</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-4">Best Sellers</h2>
          <div className="h-1 w-24 bg-indigo-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600">
            Discover our most loved and sought-after photographic images that capture fleeting moments and transform any space into a visual story.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-2 flex-grow">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-base text-gray-500"><b>{product.category} </b></span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-indigo-700">{product.price}</span>
                  <span className="bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-lg">
                    Best Seller
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-block bg-indigo-100 text-indigo-800 font-medium py-3 px-8 rounded-lg">
            Featured Collection
          </div>
        </div>
      </div>
    </div>
  );
}

export default Best;