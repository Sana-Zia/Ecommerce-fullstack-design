import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  const { pathname } = useLocation();
  const [isPageLoading, setIsPageLoading] = useState(false);

  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Briefly trigger a loading state for a smoother visual transition
    setIsPageLoading(true);
    const timer = setTimeout(() => setIsPageLoading(false), 300);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen font-sans antialiased text-gray-900 bg-[#F7FAFC]">
      
      {/* 1. TOP PROGRESS BAR */}
      <div 
        className={`fixed top-0 left-0 h-0.5 bg-[#0D6EFD] z-[100] transition-all duration-500 ease-out ${
          isPageLoading ? 'w-full opacity-100' : 'w-0 opacity-0'
        }`} 
      />

      {/* 2. NAVIGATION HEADER */}
      <Navbar />
      
      {/* 3. MAIN CONTENT AREA */}
      {/* Added a min-height calculation to keep footer at bottom even if page is empty */}
      <main className={`flex-grow transition-opacity duration-300 ease-in-out mt-[var(--navbar-height)] ${
        isPageLoading ? 'opacity-50' : 'opacity-100'
      }`}>
        {/* This is where Home, ProductList, Cart, etc. render */}
        <Outlet />
      </main>

      {/* 4. FOOTER */}
      <Footer />

      {/* 5. MOBILE QUICK NAV (Visible only on small screens) */}
      <div className="md:hidden sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-6 flex justify-between items-center z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
         <Link to="/" className={`flex flex-col items-center gap-0.5 ${pathname === '/' ? 'text-[#0D6EFD]' : 'text-gray-500'}`}>
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
           <span className="text-[10px] font-medium uppercase">Home</span>
         </Link>
         
         <Link to="/products" className={`flex flex-col items-center gap-0.5 ${pathname === '/products' ? 'text-[#0D6EFD]' : 'text-gray-500'}`}>
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
           <span className="text-[10px] font-medium uppercase">Shop</span>
         </Link>

         <Link to="/cart" className={`flex flex-col items-center gap-0.5 ${pathname === '/cart' ? 'text-[#0D6EFD]' : 'text-gray-500'}`}>
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
           <span className="text-[10px] font-medium uppercase">Cart</span>
         </Link>

         <Link to="/profile" className={`flex flex-col items-center gap-0.5 ${pathname === '/profile' ? 'text-[#0D6EFD]' : 'text-gray-500'}`}>
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
           <span className="text-[10px] font-medium uppercase">Account</span>
         </Link>
      </div>
    </div>
  );
};

export default MainLayout;