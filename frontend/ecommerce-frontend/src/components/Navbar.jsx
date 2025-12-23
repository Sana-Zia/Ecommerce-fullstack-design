import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, ShoppingCart, User, MessageSquare, 
  Heart, Menu, ChevronDown, X, LogOut 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { DE } from 'country-flag-icons/react/3x2';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All categories'); // Added category state
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user, logout } = useAuth();
  
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  
  const handleSearch = (e) => {
    e.preventDefault();
    
   
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.append('search', searchTerm.trim());
    if (category !== 'All categories') params.append('category', category);

    // Navigate to product list with the query string 
    navigate(`/products?${params.toString()}`);
  };

  return (
    <header className="bg-white border-b border-gray-200 w-full sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="h-16 md:h-20 flex items-center justify-between gap-4 md:gap-8">
          
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden p-1 text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img 
                src="/logo-colored.png" 
                alt="Brand Logo" 
                className="h-7 md:h-10 w-auto object-contain" 
              />
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <form 
            onSubmit={handleSearch} 
            className="hidden md:flex flex-grow max-w-2xl border-2 border-[#0D6EFD] rounded-lg overflow-hidden"
          >
            <input 
              type="text" 
              placeholder="Search products (e.g. apple, shirt)..." 
              className="w-full px-4 py-2 outline-none text-gray-700 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="bg-white border-l border-gray-200 px-3 flex items-center shrink-0">
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent text-sm outline-none cursor-pointer pr-2 font-medium"
              >
                <option>All categories</option>
                <option>Mobile accessory</option>
                <option>Clothing</option>
                <option>Home Interiors</option>
              </select>
            </div>
            <button type="submit" className="bg-[#0D6EFD] text-white px-8 py-2 font-bold hover:bg-blue-700 transition-colors shrink-0">
              Search
            </button>
          </form>

          <div className="flex items-center gap-3 md:gap-6 text-gray-500 shrink-0">
            <div className="relative group">
              <Link to={user ? "/profile" : "/login"} className="flex flex-col items-center cursor-pointer hover:text-blue-600 transition-colors">
                <User size={20} />
                <span className="hidden md:block mt-1 text-[11px] font-medium">
                  {user ? user.name.split(' ')[0] : 'Profile'}
                </span>
              </Link>
              
              {user && (
                <div className="absolute right-0 top-full hidden group-hover:block pt-2 w-32 z-50">
                  <div className="bg-white border border-gray-100 shadow-xl rounded-md overflow-hidden">
                    <button 
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="hidden sm:flex flex-col items-center cursor-pointer hover:text-blue-600 transition-colors">
              <MessageSquare size={20} />
              <span className="mt-1 text-[11px] font-medium">Message</span>
            </div>
            <div className="hidden sm:flex flex-col items-center cursor-pointer hover:text-blue-600 transition-colors">
              <Heart size={20} />
              <span className="mt-1 text-[11px] font-medium">Orders</span>
            </div>

            <Link to="/cart" className="flex flex-col items-center cursor-pointer hover:text-blue-600 relative transition-colors">
              <ShoppingCart size={20} />
              <span className="hidden md:block mt-1 text-[11px] font-medium">My cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FA3434] text-white text-[10px] rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center font-bold border border-white">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="flex items-center bg-[#F7FAFC] border border-gray-200 rounded-lg px-3 py-2">
            <Search size={18} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search products" 
              className="bg-transparent w-full outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
      </div>

      <div className="border-t border-gray-100 py-3 hidden md:block bg-white">
        <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between text-sm font-bold text-gray-800">
          <div className="flex items-center gap-7">
            <Link to="/products" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <Menu size={18} /> All categories
            </Link>
            <Link to="/products" className="hover:text-blue-600 transition-colors">Hot offers</Link>
            <span className="cursor-pointer hover:text-blue-600 transition-colors">Gift boxes</span>
            <span className="cursor-pointer hover:text-blue-600 transition-colors">Projects</span>
            
            <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
              Help <ChevronDown size={14} />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
              <span>English, USD</span> <ChevronDown size={14} />
            </div>
            
            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
              <span>Ship to</span>
              <div className="flex items-center gap-1.5">
                <DE title="Germany" className="w-5 h-auto rounded-sm shadow-sm border border-gray-100" />
                <ChevronDown size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="fixed top-0 left-0 bottom-0 w-64 bg-white shadow-xl">
            <div className="p-4 border-b border-gray-100 bg-[#F7FAFC]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                  <User size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold">
                    {user ? `Hello, ${user.name}` : <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign in | Register</Link>}
                  </p>
                </div>
              </div>
            </div>
            <nav className="p-4 space-y-4 text-gray-700 font-medium">
              <Link to="/" className="flex items-center gap-3 text-sm" onClick={() => setIsMobileMenuOpen(false)}><Menu size={18}/> Home</Link>
              <Link to="/products" className="flex items-center gap-3 text-sm" onClick={() => setIsMobileMenuOpen(false)}><Search size={18}/> All categories</Link>
              <hr className="my-4 border-gray-100" />
              {user && (
                <button 
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-3 text-sm text-red-600"
                >
                  <LogOut size={18}/> Logout
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;