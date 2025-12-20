import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  // Destructuring for cleaner code, providing defaults
  const {
    id,
    name = "Product Name",
    price = 0.00,
    oldPrice,
    rating = 0,
    reviews = 0,
    img = "📷",
    isHot = false
  } = product;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
      {/* IMAGE SECTION */}
      <Link to={`/product/${id}`} className="relative aspect-square bg-[#F7F7F7] flex items-center justify-center p-4 overflow-hidden">
        {/* Hot Badge */}
        {isHot && (
          <span className="absolute top-2 left-2 bg-[#FA3434] text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase z-10">
            Hot
          </span>
        )}
        
        {/* Wishlist Button */}
        <button className="absolute top-2 right-2 p-2 bg-white border border-gray-100 rounded-md text-gray-400 hover:text-[#FA3434] hover:shadow-sm transition-all z-10">
          <Heart size={18} />
        </button>

        {/* Product Image (Emoji used as placeholder, replace with <img> tags) */}
        <div className="text-7xl group-hover:scale-110 transition-transform duration-500">
          {typeof img === 'string' && img.length < 5 ? img : <img src={img} alt={name} className="max-h-full object-contain mix-blend-multiply" />}
        </div>
      </Link>

      {/* CONTENT SECTION */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Price Row */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}</span>
          {oldPrice && (
            <span className="text-sm text-gray-400 line-through">${oldPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Ratings */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex text-[#FF9017]">
            <Star size={14} fill="currentColor" />
          </div>
          <span className="text-[#FF9017] text-xs font-bold">{rating}</span>
          <span className="text-gray-300 text-xs">•</span>
          <span className="text-gray-400 text-xs">{reviews} orders</span>
        </div>

        {/* Product Title */}
        <Link to={`/product/${id}`} className="text-sm md:text-base text-gray-600 font-medium hover:text-blue-600 transition-colors line-clamp-2 mb-4 flex-grow">
          {name}
        </Link>

        {/* Action Button */}
        <button className="w-full flex items-center justify-center gap-2 border border-blue-600 text-blue-600 py-2 rounded-md text-sm font-bold hover:bg-blue-50 transition-colors active:scale-95 mt-auto">
          <ShoppingCart size={16} /> Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;