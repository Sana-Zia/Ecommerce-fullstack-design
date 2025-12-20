import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import { CartProvider } from './context/CartContext';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart'; 

function App() {
  return (
    /* 1. Wrap EVERYTHING in CartProvider so state is shared across all pages */
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* Default page */}
            <Route index element={<Home />} />
            
            {/* List of all products */}
            <Route path="products" element={<ProductList />} />
            
            {/* Individual product detail */}
            <Route path="product/:id" element={<ProductDetail />} />

            {/* Shopping Cart Page */}
            <Route path="cart" element={<Cart />} />
            
            {/* 404 Fallback */}
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h2 className="text-2xl font-bold">404 - Page Not Found</h2>
                <p className="text-gray-500">The page you are looking for doesn't exist.</p>
              </div>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;