import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from "./context/AuthContext"; 
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart'; 
import Login from './pages/Login';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';

function App() {
  return (
    
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<ProductList />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} />
              
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
    </AuthProvider>
  );
}

export default App;