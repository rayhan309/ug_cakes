import React, { useState } from 'react';
import { Search, Cake, Truck, Heart, Leaf, CreditCard, Sparkles } from 'lucide-react';

const UgCakesSearchFeatures = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Popular suggestions based on the image
  const popularSuggestions = [
    'Red velvet',
    'Birthday',
    'Bento',
    'Chocolate',
    'Bouquet',
    'Rasmalaí'
  ];

  // Filter suggestions based on search query
  const filteredSuggestions = popularSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = () => {
    // Handle search functionality here
    console.log('Searching for:', searchQuery);
    // You can add your search logic here
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Feature cards data from the image
  const featureCards = [
    {
      icon: <Truck className="w-6 h-6 text-rose-500" />,
      title: 'Same Day Delivery',
      description: 'In Kathmandu Valley'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      title: 'Custom Designs',
      description: 'Made to Order'
    },
    {
      icon: <Cake className="w-6 h-6 text-pink-500" />,
      title: 'Fresh Daily',
      description: 'Baked Fresh Daily'
    },
    {
      icon: <CreditCard className="w-6 h-6 text-emerald-500" />,
      title: 'Easy Payment',
      description: 'Card, QR or Cash'
    },
    {
      icon: <Heart className="w-6 h-6 text-rose-400" />,
      title: 'Sugarless Cakes',
      description: 'Diabetic Friendly'
    },
    {
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      title: 'Eggless Cakes',
      description: 'Pure Vegetarian'
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 bg-gradient-to-b from-white to-rose-50/30">
      {/* Search Section */}
      <div className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center">
          Find Your Perfect Cake
        </h2>
        
        <div className="relative max-w-2xl mx-auto">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for cakes or flavors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-9 pr-3 py-2.5 text-sm md:text-base rounded-lg border-2 border-rose-100 focus:border-rose-300 focus:ring-2 focus:ring-rose-200 w-full shadow-sm outline-none"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-lg transition-colors shadow-sm flex items-center justify-center min-w-[60px]"
            >
              GO
            </button>
          </div>

          {/* Popular Suggestions */}
          <div className="mt-4">
            <span className="text-sm font-medium text-gray-600 block mb-3">
              Popular:
            </span>
            <div className="flex flex-wrap gap-2">
              {(searchQuery ? filteredSuggestions : popularSuggestions).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(suggestion)}
                  className="px-4 py-1.5 bg-white border border-rose-200 rounded-full text-xs md:text-sm text-gray-700 hover:bg-rose-50 hover:border-rose-300 transition-colors shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            {searchQuery && filteredSuggestions.length === 0 && (
              <p className="text-sm text-gray-500 mt-2">
                No matching suggestions. Try something else!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div>
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 text-center">
          Why Choose UG Cakes?
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6">
          {featureCards.map((feature, index) => (
            <div 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 border border-rose-100 hover:border-rose-200 bg-white/80 backdrop-blur-sm rounded-lg p-5 md:p-6 flex flex-col items-center text-center"
            >
              <div className="mb-3 p-2.5 bg-rose-50 rounded-full group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h4 className="font-semibold text-gray-800 mb-1.5 text-base md:text-lg">
                {feature.title}
              </h4>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative element - optional */}
      <div className="mt-12 text-center text-xs text-gray-400">
        <span className="inline-flex items-center gap-1">
          <Cake className="w-3 h-3" /> Freshly baked with love every day
        </span>
      </div>
    </section>
  );
};

export default UgCakesSearchFeatures;