import React from 'react';
import { 
  ChevronRight, Send, Search, ShieldCheck, Globe, 
  Box, Truck, User 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate(); // Hook for navigation

  const categories = [
    "Automobiles", "Clothes", "Interiors",
    "Computer", "Tools", "Sports",
    "Animals", "Machinery", "More"
  ];

  // --- MAPPING DATA ---
  const dealProducts = [
    { name: 'Smart watches', discount: '-25%', img: '⌚' },
    { name: 'Laptops', discount: '-15%', img: '💻' },
    { name: 'GoPro cameras', discount: '-40%', img: '📷' },
    { name: 'Headphones', discount: '-20%', img: '🎧' },
    { name: 'Canon cams', discount: '-25%', img: '📸' }
  ];

  const gridSections = [
    { 
      title: 'Home and outdoor', 
      bg: 'bg-[url("https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500")]', 
      icon: '🏠',
      products: Array(8).fill({ name: 'Product Name', price: '19' })
    },
    { 
      title: 'Consumer electronics', 
      bg: 'bg-[url("https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500")]', 
      icon: '📱',
      products: Array(8).fill({ name: 'Product Name', price: '19' })
    }
  ];

  const recommendedItems = [
    { price: '$10.30', desc: 'T-shirts with multiple colors, for men and boy', img: '👕' },
    { price: '$12.50', desc: 'Summer caps for outdoor activities', img: '🧢' },
    { price: '$34.00', desc: 'Leather wallet for men', img: '👛' },
    { price: '$99.00', desc: 'Wireless gaming headphones', img: '🎧' },
    { price: '$15.00', desc: 'Cotton socks pack of 5', img: '🧦' },
    { price: '$10.30', desc: 'T-shirts with multiple colors, for men and boy', img: '👕' },
    { price: '$12.50', desc: 'Summer caps for outdoor activities', img: '🧢' },
    { price: '$34.00', desc: 'Leather wallet for men', img: '👛' },
    { price: '$99.00', desc: 'Wireless gaming headphones', img: '🎧' },
    { price: '$15.00', desc: 'Cotton socks pack of 5', img: '🧦' },
  ];

  return (
    <div className="bg-[#F7FAFC] min-h-screen pb-10 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* --- SECTION 1: HERO AREA --- */}
        <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4 grid grid-cols-12 gap-4">
          <aside className="hidden lg:block col-span-2">
            <ul className="space-y-1">
              {categories.map((cat, i) => (
                <li
                  key={i}
                  onClick={() => navigate(`/products?search=${cat}`)} // Added category filter
                  className={`px-3 py-1.5 rounded-md cursor-pointer text-sm text-gray-600 hover:bg-[#E5F1FF] hover:text-black transition-colors ${i === 0 ? 'bg-[#E5F1FF] font-semibold text-black' : ''}`}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </aside>

          <section className="col-span-12 lg:col-span-8 relative rounded-md overflow-hidden min-h-[340px] flex items-center group">
            <img
              src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Hero Background"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/10 to-transparent"></div>
            <div className="relative z-10 p-10">
              <h3 className="text-xl text-gray-800">Latest trending</h3>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">Electronic items</h2>
              <button 
                onClick={() => navigate('/products')} // Navigates to full product list
                className="bg-white text-gray-900 px-6 py-2 rounded-md font-bold hover:bg-gray-100 shadow-md transition-colors"
              >
                Source now
              </button>
            </div>
          </section>

          <aside className="hidden lg:block col-span-2 space-y-3">
            <div className="bg-[#E3F0FF] p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white shrink-0">
                  <User size={20} />
                </div>
                <p className="text-xs leading-tight font-medium">Hi, user<br />let's get started</p>
              </div>
              <button className="w-full bg-[#0D6EFD] text-white py-1.5 rounded-md text-xs font-medium mb-2 hover:bg-blue-700 transition-colors">Join now</button>
              <button className="w-full bg-white text-[#0D6EFD] py-1.5 rounded-md text-xs font-medium border border-gray-200 hover:bg-gray-50 transition-colors">Log in</button>
            </div>
            <div className="bg-[#F38332] p-3 rounded-lg text-white font-medium text-xs leading-snug">Get US $10 off with a new supplier</div>
            <div className="bg-[#55BDC3] p-3 rounded-lg text-white font-medium text-xs leading-snug">Send quotes with supplier preferences</div>
          </aside>
        </div>

        {/* --- SECTION 2: DEALS AND OFFERS (Mapped) --- */}
        <div className="mt-6 bg-white border border-gray-200 rounded-lg flex overflow-hidden shadow-sm">
          <div className="p-6 border-r border-gray-100 min-w-[280px]">
            <h4 className="font-bold text-lg">Deals and offers</h4>
            <p className="text-gray-400 text-sm mb-4">Hygiene equipments</p>
            <div className="flex gap-2">
              {['04', '13', '34', '56'].map((t, i) => (
                <div key={i} className="bg-[#464646] text-white w-12 h-12 flex flex-col items-center justify-center rounded-md">
                  <span className="font-bold text-sm leading-none">{t}</span>
                  <span className="text-[8px] uppercase mt-1">{['Days', 'Hour', 'Min', 'Sec'][i]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-grow grid grid-cols-5">
            {dealProducts.map((item, i) => (
              <div 
                key={i} 
                onClick={() => navigate(`/products?search=${item.name}`)} // Search by deal name
                className="p-4 border-r border-gray-100 last:border-r-0 flex flex-col items-center justify-center hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="h-32 w-32 flex items-center justify-center text-5xl">{item.img}</div>
                <p className="text-sm mt-3 text-gray-700">{item.name}</p>
                <span className="bg-[#FFE3E3] text-[#EB001B] px-3 py-1 rounded-full text-xs font-bold mt-2">{item.discount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: HOME & ELECTRONICS GRID (Mapped) */}
        {gridSections.map((sec, idx) => (
          <div key={idx} className="mt-6 bg-white border border-gray-200 rounded-lg flex overflow-hidden shadow-sm">
            <div className={`${sec.bg} bg-cover bg-center w-[280px] p-6 relative flex flex-col`}>
              <div className="absolute inset-0 bg-white/40"></div>
              <div className="relative z-10">
                <h4 className="font-bold text-lg mb-4 w-32 leading-tight text-gray-900">{sec.title}</h4>
                <button 
                  onClick={() => navigate('/products')} // Direct to products page
                  className="bg-white px-4 py-2 rounded-md text-sm font-bold shadow-md hover:bg-gray-50 transition-colors"
                >
                  Source now
                </button>
              </div>
            </div>
            <div className="flex-grow grid grid-cols-4">
              {sec.products.map((prod, i) => (
                <div 
                   key={i} 
                   onClick={() => navigate(`/products?search=${sec.title}`)} // Filter by section theme
                   className="p-4 border-r border-b border-gray-100 flex justify-between items-start hover:bg-gray-50 cursor-pointer group"
                >
                  <div className="z-10">
                    <p className="text-sm font-medium text-gray-800">{prod.name}</p>
                    <p className="text-xs text-gray-400 mt-1">From <br /> USD {prod.price}</p>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {sec.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* --- SECTION 4: INQUIRY FORM --- */}
        <div className="mt-6 rounded-lg overflow-hidden relative min-h-[380px] flex items-center p-8">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200" className="absolute inset-0 w-full h-full object-cover" alt="Inquiry bg" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-400/80"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full items-center gap-10">
            <div className="text-white max-w-md hidden lg:block">
              <h2 className="text-3xl font-bold mb-4 leading-tight">An easy way to send requests to all suppliers</h2>
              <p className="text-sm opacity-90">Send your specifications once and receive multiple quotes from verified manufacturers worldwide.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md ml-auto w-full">
              <h4 className="font-bold text-lg mb-4 text-gray-900">Send quote to suppliers</h4>
              <input type="text" placeholder="What item you need?" className="w-full border border-gray-200 rounded-md p-2.5 mb-3 outline-none focus:border-blue-500" />
              <textarea placeholder="Type more details" className="w-full border border-gray-200 rounded-md p-2.5 mb-3 h-20 outline-none focus:border-blue-500 resize-none" />
              <div className="flex gap-3 mb-4">
                <input type="text" placeholder="Quantity" className="border border-gray-200 rounded-md p-2.5 w-1/2 outline-none focus:border-blue-500" />
                <select className="border border-gray-200 rounded-md p-2.5 w-1/2 outline-none">
                  <option>Pcs</option>
                  <option>Kg</option>
                </select>
              </div>
              <button className="bg-[#0D6EFD] text-white px-6 py-2.5 rounded-md font-bold hover:bg-blue-700 w-fit">Send inquiry</button>
            </div>
          </div>
        </div>

        {/* --- SECTION 5: RECOMMENDED ITEMS (Mapped) --- */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Recommended items</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {recommendedItems.map((item, i) => (
              <div key={i} onClick={() => navigate('/products')} className="bg-white border border-gray-200 rounded-md p-4 hover:shadow-md cursor-pointer transition-all">
                <div className="h-40 flex items-center justify-center text-6xl bg-gray-50 rounded-md mb-4">{item.img}</div>
                <p className="font-bold text-gray-900 text-lg">{item.price}</p>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- SECTION 6: EXTRA SERVICES --- */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Our extra services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Source from Industry Hubs', icon: <Search size={20} />, img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400' },
              { title: 'Customize Your Products', icon: <Box size={20} />, img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=400' },
              { title: 'Fast, Reliable Shipping', icon: <Truck size={20} />, img: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?w=400' },
              { title: 'Product Monitoring', icon: <ShieldCheck size={20} />, img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400' }
            ].map((service, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-md overflow-hidden relative group shadow-sm">
                <div className="h-32 overflow-hidden bg-gray-900">
                  <img src={service.img} className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-500" alt="Service" />
                </div>
                <div className="p-5 relative">
                  <div className="absolute -top-7 right-5 w-12 h-12 bg-[#D1E7FF] border-4 border-white rounded-full flex items-center justify-center text-gray-900 shadow-sm z-20">
                    {service.icon}
                  </div>
                  <p className="font-medium text-gray-800 pr-10 leading-tight">{service.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- SECTION 7: REGIONS --- */}
        <div className="mt-10 mb-10">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Suppliers by region</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-6">
            {[
              { name: 'Arabic Emirates', site: 'shop.ae', code: 'ae' },
              { name: 'Australia', site: 'shop.au', code: 'au' },
              { name: 'United States', site: 'shop.us', code: 'us' },
              { name: 'Russia', site: 'shop.ru', code: 'ru' },
              { name: 'Italy', site: 'shop.it', code: 'it' },
              { name: 'Denmark', site: 'shop.dk', code: 'dk' },
              { name: 'France', site: 'shop.fr', code: 'fr' },
              { name: 'China', site: 'shop.cn', code: 'cn' },
              { name: 'Great Britain', site: 'shop.uk', code: 'gb' },
              { name: 'Japan', site: 'shop.jp', code: 'jp' }
            ].map((region, i) => (
              <div key={i} className="flex items-center gap-3 cursor-pointer group">
                <div className="w-7 h-5 overflow-hidden rounded-sm shadow-sm border border-gray-100 shrink-0">
                  <img
                    src={`https://flagcdn.com/w40/${region.code}.png`}
                    alt={region.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 leading-tight group-hover:text-blue-600">{region.name}</p>
                  <p className="text-[10px] text-gray-400">{region.site}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;