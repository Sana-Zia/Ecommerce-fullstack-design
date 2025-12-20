import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  const { pathname } = useLocation();
  const [isPageLoading, setIsPageLoading] = useState(false);

  // Scroll to top and handle transition effect on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Briefly trigger a loading state for a smoother visual transition
    setIsPageLoading(true);
    const timer = setTimeout(() => setIsPageLoading(false), 250);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen font-sans antialiased text-gray-900 bg-[#F7FAFC]">
      
      {/* 1. TOP PROGRESS BAR (Visual feedback for navigation) */}
      <div 
        className={`fixed top-0 left-0 h-0.5 bg-[#0D6EFD] z-[60] transition-all duration-500 ease-out ${
          isPageLoading ? 'w-full opacity-100' : 'w-0 opacity-0'
        }`} 
      />

      {/* 2. NAVIGATION HEADER */}
      {/* This contains your Logo, Search Bar, and Action Icons */}
      <Navbar />
      
      {/* 3. MAIN CONTENT AREA */}
      <main className={`flex-grow transition-opacity duration-300 ease-in-out ${
        isPageLoading ? 'opacity-60' : 'opacity-100'
      }`}>
        {/* This renders the specific page content (Home, Cart, Products, etc.) */}
        <Outlet />
      </main>

      {/* 4. FOOTER */}
      <Footer />

      {/* 5. MOBILE QUICK NAV (Optional: Fixed at bottom for mobile users) */}
      <div className="md:hidden sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-8 flex justify-between items-center z-40 shadow-[0_-2px_10px_rgba(0,0,0,0,0.05)]">
         <button className="flex flex-col items-center gap-1 text-[#0D6EFD]">
           <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
         </button>
         <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
           <span className="text-[10px] font-bold uppercase tracking-wider">Categories</span>
         </button>
         <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
           <span className="text-[10px] font-bold uppercase tracking-wider">Wishlist</span>
         </button>
      </div>
    </div>
  );
};

export default MainLayout;