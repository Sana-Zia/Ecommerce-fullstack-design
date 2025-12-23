import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext'; 

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Access cart function

  
  const {
    id,
    name = "Product Name",
    price = 0.00,
    old_price, 
    rating = 0,
    reviews = 0,
    image_url = "", 
    isHot = false
  } = product;

  // Helper to safely format price
  const formattedPrice = typeof price === 'number' ? price : parseFloat(price || 0);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
      {/* IMAGE SECTION */}
      <div 
        onClick={() => navigate(`/product/${id}`)} 
        className="relative aspect-square bg-[#F7F7F7] flex items-center justify-center p-4 overflow-hidden cursor-pointer"
      >
        {/* Hot Badge */}
        {isHot && (
          <span className="absolute top-2 left-2 bg-[#FA3434] text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase z-10">
            Hot
          </span>
        )}
        
        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation(); 
            
          }}
          className="absolute top-2 right-2 p-2 bg-white border border-gray-100 rounded-md text-gray-400 hover:text-[#FA3434] hover:shadow-sm transition-all z-10"
        >
          <Heart size={18} />
        </button>

        {/* Product Image */}
        <img 
          src={image_url || 'https://via.placeholder.com/200'} 
          alt={name} 
          className="max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
        />
      </div>

      {/* CONTENT SECTION */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Price Row */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg font-bold text-gray-900">${formattedPrice.toFixed(2)}</span>
          {old_price && (
            <span className="text-sm text-gray-400 line-through">${parseFloat(old_price).toFixed(2)}</span>
          )}
        </div>

        {/* Ratings */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex text-[#FF9017]">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                fill={i < Math.floor(rating) ? "currentColor" : "none"} 
                className={i < Math.floor(rating) ? "" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-[#FF9017] text-xs font-bold">{rating}</span>
          <span className="text-gray-300 text-xs">•</span>
          <span className="text-gray-400 text-xs">{reviews || '154'} orders</span>
        </div>

        {/* Product Title */}
        <Link to={`/product/${id}`} className="text-sm md:text-base text-gray-600 font-medium hover:text-blue-600 transition-colors line-clamp-2 mb-4 flex-grow">
          {name}
        </Link>

        {/* Action Button */}
        <button 
          onClick={() => addToCart(product)}
          className="w-full flex items-center justify-center gap-2 border border-blue-600 text-blue-600 py-2 rounded-md text-sm font-bold hover:bg-blue-50 transition-colors active:scale-95 mt-auto"
        >
          <ShoppingCart size={16} /> Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;