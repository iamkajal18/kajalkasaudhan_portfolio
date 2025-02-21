import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { src: "/2.jpg", alt: "Logo" },
    { src: "/2.png", alt: "Item 2" },
    { src: "/3.png", alt: "Image 3" },
    { src: "/5.png", alt: "Image 5" },
    { src: "/6.png", alt: "Logo" },
    { src: "/7.png", alt: "Logo" },
    { src: "/8.png", alt: "Logo" },
    { src: "/9.png", alt: "Logo" },
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 2000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex(current => 
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex(current => 
      current === images.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-9">
      <div className="relative h-56 md:h-96 overflow-hidden rounded-lg shadow-lg">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out 
              ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        ))}
        
        {/* Navigation buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-3 mt-6">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all 
              ${index === currentIndex ? 'bg-blue-600 w-4 h-4' : 'bg-gray-300'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;