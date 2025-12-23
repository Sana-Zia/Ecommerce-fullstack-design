import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, ShieldCheck, MessageSquare, 
  Truck, ShoppingCart, Trash2, Heart
} from 'lucide-react';
import { useCart } from '../context/CartContext'; 

const Cart = () => {
  const { cart, removeFromCart, updateQty, clearCart } = useCart();
  const navigate = useNavigate();

  const savedItems = [
    { id: 101, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200' },
    { id: 102, name: 'Smartphone Pro Max 256GB Gold', price: 99.50, img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200' },
    { id: 103, name: 'Smartwatch Series 7 Waterproof', price: 99.50, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200' },
    { id: 104, name: 'Laptop Ultrabook 15" M2 Chip', price: 99.50, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200' },
  ];

  // --- HANDLERS ---
  const handleQtyChange = (id, newQty) => {
    updateQty(id, parseInt(newQty));
  };

  const removeItem = (id) => {
    removeFromCart(id);
  };

  const removeAll = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
        clearCart();
    }
  };

  // --- CALCULATIONS ---
  const subtotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.qty), 0), [cart]);
  const discount = cart.length > 0 ? 60.00 : 0;
  const tax = cart.length > 0 ? 14.00 : 0;
  const total = Math.max(0, subtotal - discount + tax);

  return (
    <div className="bg-[#F7FAFC] min-h-screen pb-12 font-sans">
      <div className="container mx-auto px-4 max-w-7xl pt-4 md:pt-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">My cart ({cart.length})</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* LEFT: CART ITEMS LIST */}
          <div className="flex-1 order-2 lg:order-1">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-4 md:p-6 space-y-6">
                {cart.length > 0 ? (
                  cart.map((item, index) => (
                    <div key={item.id} className={`flex flex-col sm:flex-row gap-4 py-4 ${index !== 0 ? 'border-t border-gray-100' : ''}`}>
                      <div className="w-full sm:w-24 h-40 sm:h-24 bg-[#F7F7F7] border border-gray-200 rounded-lg flex items-center justify-center p-2 shrink-0">
                        <div className="text-4xl">
                          {item.image ? (
                            <img src={item.image} alt="" className="max-h-full object-contain mix-blend-multiply" />
                          ) : (
                            <span className="text-gray-300">📦</span>
                          )}
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h3 className="font-medium text-gray-800 text-sm md:text-base leading-snug hover:text-blue-600 transition-colors cursor-pointer">
                              {item.name}
                            </h3>
                            <p className="mt-1 text-xs md:text-sm text-gray-400">Seller: <span className="text-gray-500">{item.seller || 'Artel Market'}</span></p>
                          </div>
                          <span className="font-bold text-gray-800 text-sm md:text-base whitespace-nowrap">
                            ${(item.price * item.qty).toFixed(2)}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center justify-between mt-4 gap-4">
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-red-500 text-xs font-bold hover:bg-red-50 transition-colors"
                            >
                              <Trash2 size={14} /> Remove
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-blue-600 text-xs font-bold hover:bg-blue-50 transition-colors">
                              <Heart size={14} /> Save for later
                            </button>
                          </div>
                          
                          <div className="w-full sm:w-28">
                            <select 
                              value={item.qty}
                              onChange={(e) => handleQtyChange(item.id, e.target.value)}
                              className="w-full border border-gray-300 rounded-md py-1.5 px-3 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
                            >
                              {[...Array(10)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>Qty: {i + 1}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500 font-medium">Your cart is empty</div>
                )}
              </div>

              <div className="p-4 md:p-6 bg-gray-50 rounded-b-lg flex flex-col sm:flex-row justify-between items-center gap-4">
                <Link to="/" className="w-full sm:w-auto bg-[#0D6EFD] text-white px-6 py-2.5 rounded-md text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
                  <ChevronLeft size={18} /> Back to shop
                </Link>
                <button 
                  onClick={removeAll}
                  className="w-full sm:w-auto border border-gray-200 bg-white text-blue-600 px-6 py-2.5 rounded-md text-sm font-bold hover:bg-gray-50 transition-colors"
                >
                  Remove all
                </button>
              </div>
            </div>

            {/* TRUST BADGES */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
              {[
                { icon: <ShieldCheck size={24}/>, title: 'Secure payment', desc: 'SSL encrypted' },
                { icon: <MessageSquare size={24}/>, title: 'Customer support', desc: '24/7 assistance' },
                { icon: <Truck size={24}/>, title: 'Free delivery', desc: 'On orders over $200' }
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white border border-gray-100 shadow-sm rounded-full flex items-center justify-center text-gray-400 group-hover:text-blue-500 transition-colors">
                    {badge.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">{badge.title}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDEBAR: SUMMARY */}
          <aside className="w-full lg:w-80 space-y-4 order-1 lg:order-2">
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <p className="text-sm text-gray-600 mb-3 font-medium">Have a coupon?</p>
              <div className="flex border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-100">
                <input type="text" placeholder="Add coupon" className="flex-1 px-3 py-2 text-sm outline-none" />
                <button className="bg-white border-l border-gray-300 px-4 py-2 text-blue-600 text-sm font-bold hover:bg-gray-50 transition-colors">Apply</button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <div className="space-y-3 text-sm border-b border-gray-100 pb-4 mb-4 text-gray-500 font-medium">
                <div className="flex justify-between"><span>Subtotal:</span> <span className="text-gray-800 font-bold">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-red-500"><span>Discount:</span> <span>- ${discount.toFixed(2)}</span></div>
                <div className="flex justify-between text-[#00B517]"><span>Tax:</span> <span>+ ${tax.toFixed(2)}</span></div>
              </div>
              <div className="flex justify-between font-bold text-gray-800 mb-6">
                <span className="text-base">Total:</span> 
                <span className="text-xl md:text-2xl">${total.toFixed(2)}</span>
              </div>
              <button 
                onClick={() => navigate('/checkout')}
                disabled={cart.length === 0}
                className="w-full bg-[#00B517] text-white py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-all shadow-md active:scale-[0.98] disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Checkout
              </button>
              
              <div className="flex justify-center gap-4 mt-6 opacity-60 grayscale hover:grayscale-0 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="visa" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="mastercard" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="paypal" />
              </div>
            </div>
          </aside>
        </div>

        {/* SAVED FOR LATER SECTION  */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 mt-8 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Saved for later</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {savedItems.map(item => (
              <div key={item.id} className="group">
                <div className="aspect-square bg-[#EEEEEE] rounded-lg mb-4 flex items-center justify-center p-4 md:p-8 overflow-hidden">
                  <img src={item.img} alt={item.name} className="max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300" />
                </div>
                <p className="text-sm md:text-base font-bold text-gray-800 mb-1">${item.price.toFixed(2)}</p>
                <p className="text-xs md:text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed group-hover:text-blue-600 transition-colors">{item.name}</p>
                <button className="w-full flex items-center justify-center gap-2 border border-[#0D6EFD] text-[#0D6EFD] py-2 md:py-2.5 rounded-md text-xs font-bold hover:bg-blue-50 transition-colors active:scale-95">
                  <ShoppingCart size={16} /> Move to cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* BRANDED PROMO BANNER */}
        <div className="bg-[#1C1C1C] rounded-lg p-8 md:p-12 text-white flex flex-col md:flex-row justify-between items-center relative overflow-hidden shadow-lg border-b-4 border-red-600 mt-10">
          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Exclusive Photography Bundle</h3>
            <p className="text-gray-400 text-sm md:text-base opacity-90 font-medium">Get a free 64GB SD card and camera bag with your first DSLR purchase.</p>
          </div>
          <button className="mt-6 md:mt-0 relative z-10 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-all active:scale-95">
            Claim Offer
          </button>
          <div className="absolute top-0 right-0 h-full w-1/3 bg-red-600/10 skew-x-12 translate-x-10"></div>
          <div className="absolute -bottom-10 -left-10 h-40 w-40 bg-white/5 rounded-full blur-3xl"></div>
        </div>

      </div>
    </div>
  );
};

export default Cart;