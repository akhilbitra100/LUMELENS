import React, { useState, useEffect, useRef } from 'react';

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://res.cloudinary.com/dp2vpmcac/image/upload/v1744351469/photo-uploads/at0qqrr4ksnbvhro7jqx.jpg",
    "https://res.cloudinary.com/dp2vpmcac/image/upload/v1744352523/photo-uploads/p0dk1nq2ffeoogzeyaim.jpg",
    "https://res.cloudinary.com/dp2vpmcac/image/upload/v1744734004/photo-uploads/ddzsitkjzpqavgs617hs.jpg"
  ];
  const timerRef = useRef(null);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const startTimer = () => {
      timerRef.current = setInterval(() => {
        goToNext();
      }, 5000);
    };

    startTimer();

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="my-20 relative w-full h-[500px] overflow-hidden rounded-xl shadow-lg"> {/* Added shadow */}
      <img
        src={slides[currentSlide]}
        alt={`Slide ${currentSlide + 1}`}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out" //changed transition
        style={{ opacity: 1 }}
      />
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full transition-opacity duration-300" //adjusted buttons
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-800">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full transition-opacity duration-300" //adjusted buttons
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-800">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-blue-600' : 'bg-gray-400'} transition-colors duration-300`}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;