import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, MessageSquare, Heart, ShoppingCart, 
  Search, Menu, ChevronDown, X 
} from 'lucide-react';

const Header = ({ cartCount = 3 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* MAIN TOP HEADER */}
      <div className="container mx-auto px-4 max-w-7xl py-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* LEFT: LOGO & MOBILE MENU TOGGLE */}
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden p-1 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="bg-[#0D6EFD] p-1.5 md:p-2 rounded-lg text-white shadow-sm">
                <ShoppingCart size={20} className="md:w-6 md:h-6" fill="white" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-[#8B96A5] tracking-tight">Brand</span>
            </Link>
          </div>

          {/* MIDDLE: SEARCH BAR (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-2xl border-2 border-[#0D6EFD] rounded-lg overflow-hidden ml-6 lg:ml-10">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="flex-1 px-4 py-2 outline-none text-gray-700 text-sm" 
            />
            <div className="relative border-l border-gray-200 flex items-center bg-white px-3 shrink-0">
              <select className="text-sm text-gray-700 outline-none cursor-pointer bg-transparent pr-4 font-medium">
                <option>All categories</option>
                <option>Electronics</option>
                <option>Apparel</option>
              </select>
            </div>
            <button className="bg-[#0D6EFD] text-white px-8 py-2 font-bold hover:bg-blue-700 transition-colors shrink-0">
              Search
            </button>
          </div>

          {/* RIGHT: ACTION BUTTONS */}
          <div className="flex items-center gap-4 md:gap-6 text-gray-500 text-[11px] shrink-0">
            <Link to="/profile" className="flex flex-col items-center cursor-pointer hover:text-blue-600 transition-colors">
              <User size={22} className="md:w-5 md:h-5" />
              <span className="mt-1 hidden md:block">Profile</span>
            </Link>
            <div className="hidden sm:flex flex-col items-center cursor-pointer hover:text-blue-600 transition-colors">
              <MessageSquare size={22} className="md:w-5 md:h-5" />
              <span className="mt-1">Message</span>
            </div>
            <div className="hidden sm:flex flex-col items-center cursor-pointer hover:text-blue-600 transition-colors">
              <Heart size={22} className="md:w-5 md:h-5" />
              <span className="mt-1">Orders</span>
            </div>
            
            <Link to="/cart" className="flex flex-col items-center cursor-pointer hover:text-blue-600 relative transition-colors">
              <ShoppingCart size={22} className="md:w-5 md:h-5" />
              <span className="mt-1 hidden md:block">My cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 md:-top-1 md:-right-1 bg-[#FA3434] text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold border border-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* MOBILE SEARCH BAR (Visible only on small screens) */}
        <div className="mt-3 md:hidden">
          <div className="flex items-center bg-[#F7FAFC] border border-gray-200 rounded-lg px-3 py-2">
            <Search size={18} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search products" 
              className="bg-transparent w-full outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* SECONDARY NAVIGATION (Desktop) */}
      <div className="border-t border-gray-100 bg-white hidden md:block">
        <div className="container mx-auto px-4 max-w-7xl py-3 flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm font-bold text-gray-800">
            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
              <Menu size={18} /> <span>All category</span>
            </div>
            <Link to="/" className="hover:text-blue-600 transition-colors">Hot offers</Link>
            <Link to="/" className="hover:text-blue-600 transition-colors">Gift boxes</Link>
            <Link to="/" className="hover:text-blue-600 transition-colors">Projects</Link>
            <Link to="/" className="hover:text-blue-600 transition-colors flex items-center gap-1">
              Help <ChevronDown size={14} />
            </Link>
          </div>

          <div className="flex items-center gap-6 text-sm font-bold">
            <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
              <span>English, USD</span>
              <ChevronDown size={14} />
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
              <span>Ship to</span>
              <span className="text-lg">🇩🇪</span>
              <ChevronDown size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU SIDEBAR OVERLAY */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="fixed inset-0 bg-black/40" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed top-0 left-0 bottom-0 w-72 bg-white shadow-xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500"><User /></div>
                <span className="font-bold text-sm">Sign in | Register</span>
              </div>
            </div>
            <nav className="p-4 space-y-5 text-gray-700 font-medium">
              <Link to="/" className="flex items-center gap-3 text-sm" onClick={() => setIsMenuOpen(false)}><Menu size={20}/> All Categories</Link>
              <Link to="/" className="flex items-center gap-3 text-sm" onClick={() => setIsMenuOpen(false)}><Heart size={20}/> Favorites</Link>
              <Link to="/" className="flex items-center gap-3 text-sm" onClick={() => setIsMenuOpen(false)}><ShoppingCart size={20}/> My Orders</Link>
              <hr className="border-gray-100" />
              <div className="space-y-4">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Settings</p>
                <div className="flex items-center gap-3 text-sm">🌐 English | USD</div>
                <div className="flex items-center gap-3 text-sm">🇩🇪 Ship to Germany</div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;