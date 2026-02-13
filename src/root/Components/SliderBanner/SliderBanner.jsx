import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const sliderData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2070&auto=format&fit=crop",
    title: "Delicious Chocolate Cake",
    description: "Rich, moist chocolate cake with premium ingredients",
    alt: "Chocolate cake",
    buttonColor: "bg-pink-500",
    buyNowText: "Buy Now",
    findCakeText: "Find Your Cake",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1603532648955-039310d9ed75?q=80&w=2070&auto=format&fit=crop",
    title: "Fresh Fruit Cake",
    description: "Light sponge cake topped with fresh seasonal fruits",
    alt: "Fruit cake",
    buttonColor: "bg-purple-500",
    buyNowText: "Buy Now",
    findCakeText: "Find Your Cake",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?q=80&w=2070&auto=format&fit=crop",
    title: "Red Velvet Cake",
    description: "Classic red velvet with cream cheese frosting",
    alt: "Red velvet cake",
    buttonColor: "bg-red-500",
    buyNowText: "Buy Now",
    findCakeText: "Find Your Cake",
  },
];

const SliderBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto play with pause on hover functionality
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) =>
          prev === sliderData.length - 1 ? 0 : prev + 1
        );
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) =>
      prev === sliderData.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) =>
      prev === 0 ? sliderData.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  return (
    <div 
      className="relative w-full h-[300px] sm:h-[350px] md:h-[380px] lg:h-[400px] overflow-hidden group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      {sliderData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          {/* Image */}
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

          {/* Content - Left aligned */}
          <div className="absolute inset-0 flex items-center">
            <div className="container lg:ms-10 sm:ms-0 px-4   sm:px-6 lg:px-8">
              <div className="max-w-xl text-white text-left">
                {/* Title */}
                <h1 
                  className={`text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-3 transform transition-all duration-700 delay-200 ${
                    index === currentSlide 
                      ? "translate-y-0 opacity-100" 
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  {slide.title}
                </h1>
                
                {/* Description */}
                <p 
                  className={`text-base sm:text-lg md:text-xl mb-6 text-gray-200 transform transition-all duration-700 delay-400 ${
                    index === currentSlide 
                      ? "translate-y-0 opacity-100" 
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  {slide.description}
                </p>

                {/* Buttons - Bigger size */}
                <div 
                  className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-700 delay-600 ${
                    index === currentSlide 
                      ? "translate-y-0 opacity-100" 
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Button 
                    className={`${slide.buttonColor} hover:opacity-90 text-white px-8 py-6 
                      flex items-center justify-center gap-3 text-base sm:text-lg
                      shadow-lg hover:shadow-xl transform hover:scale-105 
                      transition-all duration-300 rounded-xl min-w-[160px]`}
                  >
                    {slide.buyNowText}
                    <ShoppingBag size={20} />
                  </Button>

                  <Button
                    variant="outline"
                    className="bg-transparent border-2 border-white text-white 
                      hover:bg-white hover:text-gray-900 px-8 py-6 
                      flex items-center justify-center gap-3 text-base sm:text-lg
                      shadow-lg hover:shadow-xl transform hover:scale-105 
                      transition-all duration-300 rounded-xl min-w-[180px]"
                  >
                    <Search size={20} />
                    {slide.findCakeText}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 
          bg-black/30 backdrop-blur-md hover:bg-black/50 
          text-white p-2 sm:p-3 rounded-full z-20
          opacity-0 group-hover:opacity-100 transition-all duration-300
          border border-white/20 hover:border-white/40
          shadow-lg hover:shadow-xl transform hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 
          bg-black/30 backdrop-blur-md hover:bg-black/50 
          text-white p-2 sm:p-3 rounded-full z-20
          opacity-0 group-hover:opacity-100 transition-all duration-300
          border border-white/20 hover:border-white/40
          shadow-lg hover:shadow-xl transform hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={20} className="sm:w-6 sm:h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative"
            aria-label={`Go to slide ${index + 1}`}
          >
            <span 
              className={`block h-2 rounded-full transition-all duration-300 cursor-pointer
                ${index === currentSlide 
                  ? 'w-6 bg-white shadow-lg' 
                  : 'w-2 bg-white/50 group-hover:bg-white/80'}`}
            />
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
        <div 
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 transition-all duration-300"
          style={{ 
            width: isAutoPlaying ? `${((currentSlide + 1) / sliderData.length) * 100}%` : '0%',
            transition: 'width 0.3s ease'
          }}
        />
      </div>
    </div>
  );
};

export default SliderBanner;