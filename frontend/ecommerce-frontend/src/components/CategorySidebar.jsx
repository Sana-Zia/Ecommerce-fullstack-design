import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Star } from 'lucide-react';

const CategorySidebar = () => {
  // Toggle states for collapsible sections
  const [openSections, setOpenSections] = useState({
    categories: true,
    brands: true,
    features: true,
    ratings: true
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside className="w-full lg:w-64 space-y-6 flex-shrink-0">
      
      {/* 1. CATEGORIES HIERARCHY */}
      <div className="border-t border-gray-200 pt-4">
        <button 
          onClick={() => toggleSection('categories')}
          className="flex justify-between items-center w-full font-bold text-gray-800 mb-3"
        >
          Category {openSections.categories ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
        </button>
        {openSections.categories && (
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="text-blue-600 font-medium cursor-pointer hover:underline">All Products</li>
            <li className="cursor-pointer hover:text-blue-600">Electronics</li>
            <li className="cursor-pointer hover:text-blue-600">Home Interiors</li>
            <li className="cursor-pointer hover:text-blue-600">Clothing & Apparel</li>
            <li className="cursor-pointer hover:text-blue-600">Tools & Machinery</li>
          </ul>
        )}
      </div>

      {/* 2. BRAND FILTER (Checkboxes) */}
      <div className="border-t border-gray-200 pt-4">
        <button 
          onClick={() => toggleSection('brands')}
          className="flex justify-between items-center w-full font-bold text-gray-800 mb-3"
        >
          Brands {openSections.brands ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
        </button>
        {openSections.brands && (
          <div className="space-y-2">
            {['Canon', 'Samsung', 'Apple', 'Huawei', 'Pantech'].map(brand => (
              <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 3. PRICE RANGE (Inputs) */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="font-bold text-gray-800 mb-4">Price Range</h4>
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs text-gray-400 mb-1 block">Min</label>
              <input type="number" placeholder="0" className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:border-blue-500" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-400 mb-1 block">Max</label>
              <input type="number" placeholder="9999" className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:border-blue-500" />
            </div>
          </div>
          <button className="w-full bg-white border border-gray-300 text-blue-600 py-2 rounded-md font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm">
            Apply
          </button>
        </div>
      </div>

      {/* 4. RATINGS FILTER */}
      <div className="border-t border-gray-200 pt-4">
        <button 
          onClick={() => toggleSection('ratings')}
          className="flex justify-between items-center w-full font-bold text-gray-800 mb-3"
        >
          Ratings {openSections.ratings ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
        </button>
        {openSections.ratings && (
          <div className="space-y-2">
            {[5, 4, 3, 2].map(star => (
              <label key={star} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600" />
                <div className="flex items-center text-[#FF9017]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < star ? "currentColor" : "none"} className={i < star ? "" : "text-gray-300"} />
                  ))}
                  {star < 5 && <span className="text-xs text-gray-400 ml-2">& Up</span>}
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

    </aside>
  );
};

export default CategorySidebar;