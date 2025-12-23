import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, MessageSquare, ShoppingBasket, Heart, ChevronRight, 
  Check, Globe, ShieldCheck, Mail, User, Plus, Minus, ShoppingCart
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { cart, addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('Description');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const isAlreadyInCart = cart.some(item => item.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`http://127.0.0.1:8000/api/products/items/${id}/`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleQuantity = (type) => {
    if (type === 'inc') setQuantity(q => q + 1);
    if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
  };

  if (loading) return <div className="p-20 text-center text-blue-600 font-bold">Loading...</div>;
  if (!product) return <div className="p-20 text-center text-red-600">Product not found.</div>;

  return (
    <div className="bg-[#F7FAFC] min-h-screen pb-12 font-sans text-[#1C1C1C]">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* BREADCRUMBS */}
        <nav className="flex items-center gap-2 py-4 text-[#8B96A5] text-[14px]">
          <Link to="/" className="hover:text-blue-600">Home</Link> <ChevronRight size={14} />
          <Link to="/products" className="hover:text-blue-600">Electronics</Link> <ChevronRight size={14} />
          <span className="text-gray-500 font-medium">{product.name}</span>
        </nav>

        {/* --- TOP SECTION: PRODUCT INFO & SUPPLIER --- */}
        <div className="bg-white border border-gray-200 rounded-md p-4 md:p-6 mb-6 flex flex-col lg:flex-row gap-8 shadow-sm">
          
          {/* Left: Gallery */}
          <div className="w-full lg:w-[40%]">
            <div className="border border-gray-200 rounded-md p-6 h-[400px] flex items-center justify-center bg-white mb-4">
              <img src={product.image_url} alt="" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-14 h-14 border border-gray-200 rounded p-1 shrink-0 cursor-pointer hover:border-blue-500 transition-colors">
                  <img src={product.image_url} alt="" className="h-full w-full object-contain opacity-60 hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>

          {/* Middle: Details */}
          <div className="flex-1">
            <div className="flex items-center gap-1 text-[#00B517] text-[15px] mb-2">
              <Check size={18} strokeWidth={3} /> <span className="font-medium">In stock</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-[#1C1C1C] mb-3 leading-tight">{product.name}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
              <div className="flex items-center text-[#FF9017]">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < 4 ? "currentColor" : "none"} />)}
                <span className="ml-2 font-bold text-[#FF9017]">4.5</span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="text-[#8B96A5] flex items-center gap-1.5"><MessageSquare size={16}/> 32 reviews</span>
              <span className="text-gray-300">•</span>
              <span className="text-[#8B96A5] flex items-center gap-1.5"><ShoppingBasket size={16}/> 154 sold</span>
            </div>

            {/* Price Box */}
            <div className="bg-[#FFF0DF] p-3 md:p-4 rounded-md flex items-center justify-between mb-6 border-l-4 border-orange-400">
               <div className="flex-1 px-4 text-center border-r border-orange-200 first:pl-0">
                  <p className="text-[#FA3434] text-lg font-bold">${product.price}</p>
                  <p className="text-[12px] text-gray-500">Retail Price</p>
               </div>
               <div className="flex-1 px-4 text-center border-r border-orange-200">
                  <p className="text-[#1C1C1C] text-lg font-bold">${(product.price * 0.9).toFixed(2)}</p>
                  <p className="text-[12px] text-gray-500">100-700 pcs</p>
               </div>
               <div className="flex-1 px-4 text-center last:border-0 last:pr-0">
                  <p className="text-[#1C1C1C] text-lg font-bold">${(product.price * 0.8).toFixed(2)}</p>
                  <p className="text-[12px] text-gray-500">Bulk Offer</p>
               </div>
            </div>

            {/* QUANTITY AND ADD TO CART SECTION */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button 
                  onClick={() => handleQuantity('dec')}
                  className="p-2 hover:bg-gray-100 border-r border-gray-300 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="px-6 font-bold">{quantity}</span>
                <button 
                  onClick={() => handleQuantity('inc')}
                  className="p-2 hover:bg-gray-100 border-l border-gray-300 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button 
                onClick={() => addToCart(product, quantity)}
                className={`flex-grow md:flex-initial flex items-center justify-center gap-2 px-8 py-2.5 rounded-md font-bold text-white transition-all transform active:scale-95 ${
                  isAlreadyInCart ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200'
                }`}
              >
                {isAlreadyInCart ? (
                  <><Check size={20} /> Added to Cart</>
                ) : (
                  <><ShoppingCart size={20} /> Add to Cart</>
                )}
              </button>
            </div>

            <div className="space-y-4 text-[14px] border-b pb-6">
              <div className="flex"><span className="w-32 text-[#8B96A5]">Price:</span><span className="text-[#505050]">Negotiable</span></div>
              <div className="flex"><span className="w-32 text-[#8B96A5]">Type:</span><span className="text-[#505050]">Classic Series</span></div>
              <div className="flex"><span className="w-32 text-[#8B96A5]">Material:</span><span className="text-[#505050]">Premium Components</span></div>
              <div className="flex"><span className="w-32 text-[#8B96A5]">Design:</span><span className="text-[#505050]">Modern sleek</span></div>
            </div>
          </div>

          {/* Right: Supplier Card */}
          <div className="w-full lg:w-72">
             <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm mb-4">
                <div className="flex items-center gap-3 mb-5">
                   <div className="w-12 h-12 bg-[#E3F0FF] text-blue-600 rounded-md flex items-center justify-center font-bold text-xl">R</div>
                   <div>
                      <p className="text-[15px] font-medium">Supplier</p>
                      <p className="text-[13px] text-gray-400">Guanjoi Trading LLC</p>
                   </div>
                </div>
                <div className="space-y-3 pt-3 border-t border-gray-100 mb-6 text-[14px] text-gray-500">
                   <p className="flex items-center gap-3"><Globe size={18} className="text-gray-300"/> Germany, Berlin</p>
                   <p className="flex items-center gap-3"><ShieldCheck size={18} className="text-gray-300"/> Verified Seller</p>
                   <p className="flex items-center gap-3"><Globe size={18} className="text-gray-300"/> Worldwide shipping</p>
                </div>
                <button className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-md mb-2 text-sm">Send inquiry</button>
                <button className="w-full bg-white border border-gray-200 text-blue-600 font-bold py-2.5 rounded-md text-sm hover:bg-gray-50">Seller's profile</button>
             </div>
             <button className="w-full flex items-center justify-center gap-2 text-blue-600 text-sm font-bold py-2 hover:bg-white rounded border border-transparent hover:border-gray-200 transition-all">
                <Heart size={18}/> Save for later
             </button>
          </div>
        </div>

        {/* --- DESCRIPTION TABS --- */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          <div className="flex-grow bg-white border border-gray-200 rounded-md shadow-sm">
            <div className="flex border-b border-gray-200 px-2 overflow-x-auto no-scrollbar">
              {['Description', 'Reviews', 'Shipping', 'About seller'].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-[15px] font-medium transition-all ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-[15px] leading-relaxed mb-8">{product.description}</p>
              
              <table className="w-full lg:w-3/5 border border-gray-100 text-[14px] text-gray-600 mb-8">
                <tbody>
                  <tr className="bg-gray-50"><td className="p-3 border-b border-r w-1/3 text-gray-400">Model</td><td className="p-3 border-b">#8786867</td></tr>
                  <tr><td className="p-3 border-b border-r text-gray-400">Style</td><td className="p-3 border-b">Classic style</td></tr>
                  <tr className="bg-gray-50"><td className="p-3 border-b border-r text-gray-400">Certificate</td><td className="p-3 border-b">ISO-898921212</td></tr>
                  <tr><td className="p-3 border-b border-r text-gray-400">Size</td><td className="p-3 border-b">34mm x 450mm x 19mm</td></tr>
                  <tr className="bg-gray-50"><td className="p-3 border-r text-gray-400">Memory</td><td className="p-3">36GB RAM</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="w-full lg:w-72 bg-white border border-gray-200 rounded-md p-4 shadow-sm h-fit">
            <h4 className="font-bold mb-5 text-[15px]">You may like</h4>
            <div className="space-y-5">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex gap-3 cursor-pointer group">
                  <div className="w-14 h-14 border border-gray-200 rounded shrink-0 p-1 flex items-center justify-center">
                    <img src={product.image_url} alt="" className="max-h-full" />
                  </div>
                  <div>
                    <p className="text-[14px] text-gray-800 leading-tight line-clamp-2 group-hover:text-blue-600">Premium Tech Accessory</p>
                    <p className="text-[13px] text-gray-400 mt-1">$7.00 - $99.50</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mb-10 bg-white border border-gray-200 rounded-md p-6 shadow-sm">
           <h3 className="text-lg font-bold mb-6">Related products</h3>
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
             {[...Array(6)].map((_, i) => (
                <div key={i} className="cursor-pointer group">
                   <div className="aspect-square bg-gray-50 rounded-md mb-3 flex items-center justify-center p-4 border border-transparent group-hover:border-gray-200">
                      <img src={product.image_url} alt="" className="max-h-full group-hover:scale-110 transition-transform" />
                   </div>
                   <p className="text-[14px] text-gray-600 line-clamp-2 mb-1">Xiaomi Redmi 8 Original</p>
                   <p className="text-[14px] text-gray-400 font-medium">$32.00-$40.00</p>
                </div>
             ))}
           </div>
        </div>

        {/* ---  BANNER --- */}
        <div className="bg-[#1C1C1C] rounded-lg p-8 md:p-12 text-white flex flex-col md:flex-row justify-between items-center relative overflow-hidden shadow-lg border-b-4 border-red-600">
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

export default ProductDetail;