import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, Heart, Star, LayoutGrid, List, 
  ChevronUp, ChevronDown, ShoppingCart, ChevronLeft, Filter, X 
} from 'lucide-react';

const ProductList = () => {
  const [viewType, setViewType] = useState('grid');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products/items/')
      .then(res => res.json())
      .then(data => {
        const results = Array.isArray(data) ? data : (data.results || []);
        setProducts(results);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-20 text-center text-gray-400 text-sm italic">Loading...</div>;

  return (
    <div className="bg-[#F7FAFC] min-h-screen pb-10 font-sans text-[#1C1C1C] antialiased">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* BREADCRUMBS */}
        <nav className="hidden sm:flex items-center gap-1 py-4 text-[#8B96A5] text-[13px]">
          <span>Home</span> <ChevronRight size={12} />
          <span>Electronics</span> <ChevronRight size={12} />
          <span className="text-[#505050]">Mobile accessory</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-5">
          
          {/* SIDEBAR */}
          <aside className={`
            fixed inset-0 z-50 bg-white p-6 overflow-y-auto transition-transform lg:relative lg:translate-x-0 lg:z-0 lg:bg-transparent lg:p-0 lg:w-60 lg:block
            ${showMobileFilters ? "translate-x-0" : "-translate-x-full"}
          `}>
            <div className="flex justify-between items-center lg:hidden mb-6 border-b pb-4">
               <span className="font-bold text-lg">Filters</span>
               <X size={24} onClick={() => setShowMobileFilters(false)} className="cursor-pointer text-gray-400" />
            </div>
            
            <FilterSidebarContent />

            <button onClick={() => setShowMobileFilters(false)} className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-bold lg:hidden">
              Show Results
            </button>
          </aside>

          {/* MAIN CATALOG */}
          <main className="flex-1">
            {/* TOOLBAR */}
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 mb-3 flex justify-between items-center shadow-sm">
              <div className="text-[13px] font-medium hidden sm:block">
                {products.length} items in <span className="font-bold uppercase text-[11px]">Mobile accessory</span>
              </div>
              <button onClick={() => setShowMobileFilters(true)} className="lg:hidden flex items-center gap-2 text-sm font-bold"><Filter size={16}/> Filters</button>
              
              <div className="flex items-center gap-3">
                <select className="border border-gray-300 rounded px-2 py-1 text-[13px] bg-white outline-none">
                  <option>Featured</option>
                  <option>Newest</option>
                </select>
                <div className="flex border border-gray-300 rounded overflow-hidden">
                  <button onClick={() => setViewType('grid')} className={`p-1.5 ${viewType === 'grid' ? 'bg-gray-100' : 'bg-white'}`}><LayoutGrid size={16} /></button>
                  <button onClick={() => setViewType('list')} className={`p-1.5 border-l border-gray-300 ${viewType === 'list' ? 'bg-gray-100' : 'bg-white'}`}><List size={16} /></button>
                </div>
              </div>
            </div>

            {/* TOP FILTER TAGS BAR */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
               {['Samsung', 'Apple', 'Poco', 'Metallic', '4 star'].map(tag => (
                 <div key={tag} className="flex items-center gap-2 border border-blue-500 bg-white px-3 py-1 rounded text-[13px] text-[#505050]">
                    {tag} <X size={14} className="text-gray-400 cursor-pointer hover:text-red-500" />
                 </div>
               ))}
               <button className="text-blue-600 text-[13px] font-semibold ml-2">Clear all filters</button>
            </div>

            {/* PRODUCT LISTING */}
            <div className={viewType === 'grid' ? "grid grid-cols-2 md:grid-cols-3 gap-3" : "flex flex-col gap-3"}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} viewType={viewType} navigate={navigate} />
              ))}
            </div>

            {/* PAGINATION */}
            <Pagination productsCount={products.length} />
          </main>
        </div>
      </div>
    </div>
  );
};

// Fixed Product Card (Grid and List View Matching Pictures)
const ProductCard = ({ product, viewType, navigate }) => {
  const isGrid = viewType === 'grid';
  
  if (isGrid) {
    return (
      <div className="bg-white border border-gray-200 rounded-md p-3 flex flex-col hover:shadow-lg transition-all relative group">
        <button className="absolute top-2.5 right-2.5 p-1.5 border border-gray-200 rounded bg-white text-blue-600 z-10 hover:bg-blue-50">
          <Heart size={15} />
        </button>
        <div onClick={() => navigate(`/product/${product.id}`)} className="cursor-pointer h-40 flex items-center justify-center mb-3">
          <img src={product.image_url} alt="" className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
        </div>
        <div className="border-t border-gray-100 pt-3">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-base font-bold text-[#1C1C1C]">${parseFloat(product.price).toFixed(2)}</span>
            {product.old_price && <span className="text-[11px] text-gray-400 line-through">${product.old_price}</span>}
          </div>
          <div className="flex items-center gap-1 mb-2">
            <div className="flex text-[#FF9017]">
              {[...Array(5)].map((_, i) => <Star key={i} size={11} fill={i < Math.floor(product.rating) ? "#FF9017" : "none"} className="text-[#FF9017]" />)}
            </div>
            <span className="text-[#FF9017] text-[11px] font-bold">{product.rating}</span>
          </div>
          <h4 onClick={() => navigate(`/product/${product.id}`)} className="text-[#606060] text-[13px] leading-tight line-clamp-2 h-8 cursor-pointer mb-3">
            {product.name}
          </h4>
          <button className="w-full py-2 bg-blue-600 text-white rounded text-[12px] font-bold flex items-center justify-center gap-2 hover:bg-blue-700">
            <ShoppingCart size={14} /> Add to cart
          </button>
        </div>
      </div>
    );
  }

  // LIST VIEW: Image | Middle Info | Vertical Divider | Price/Actions
  return (
    <div className="bg-white border border-gray-200 rounded-md flex flex-col md:flex-row p-4 hover:shadow-md transition-shadow">
      {/* 1. Image Left */}
      <div onClick={() => navigate(`/product/${product.id}`)} className="w-full md:w-48 h-44 shrink-0 flex items-center justify-center cursor-pointer p-2">
        <img src={product.image_url} alt="" className="max-h-full max-w-full object-contain" />
      </div>

      {/* 2. Middle Content */}
      <div className="flex-1 px-0 md:px-6 py-2">
        <h4 onClick={() => navigate(`/product/${product.id}`)} className="text-[16px] font-semibold text-[#1C1C1C] hover:text-blue-600 cursor-pointer mb-1">
          {product.name}
        </h4>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex text-[#FF9017]">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "#FF9017" : "none"} className="text-[#FF9017]" />)}
          </div>
          <span className="text-[#FF9017] text-[14px] font-bold">{product.rating}</span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-500 text-[13px]">154 orders</span>
          <span className="text-gray-300">•</span>
          <span className="text-[#00B517] text-[13px] font-medium">Free Shipping</span>
        </div>
        <p className="text-[#505050] text-[14px] leading-relaxed line-clamp-3 mb-3">
          {product.description || "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
        </p>
        <button onClick={() => navigate(`/product/${product.id}`)} className="text-blue-600 font-bold text-[13px] hover:underline">View details</button>
      </div>

      {/* 3. Price & Actions Right (Vertical Divider Style) */}
      <div className="w-full md:w-48 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#1C1C1C]">${product.price}</span>
            <span className="text-[13px] text-gray-400 line-through">${product.old_price}</span>
          </div>
          <p className="text-[#00B517] text-[12px] font-medium mt-1">Available in stock</p>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <button className="w-full py-2 bg-blue-600 text-white rounded font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-blue-700">
             Add to cart
          </button>
          <button className="flex items-center justify-center gap-2 text-blue-600 text-[13px] font-bold py-2 border border-gray-200 rounded hover:bg-gray-50">
             <Heart size={16} /> Save to wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

// Full Sidebar Content
const FilterSidebarContent = () => (
  <div className="space-y-1">
    <FilterSection title="Category">
      <ul className="text-[14px] text-[#505050] space-y-2">
        <li className="text-blue-600 font-bold">Mobile accessory</li>
        <li className="hover:text-blue-600 cursor-pointer">Electronics</li>
        <li className="hover:text-blue-600 cursor-pointer">Smartphones</li>
        <li className="text-blue-600 cursor-pointer">See all</li>
      </ul>
    </FilterSection>

    <FilterSection title="Brands">
      {['Samsung', 'Apple', 'Huawei', 'Poco'].map(brand => (
        <label key={brand} className="flex items-center gap-2.5 py-1 text-[#505050] text-[14px] cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded accent-blue-600 border-gray-300" /> <span>{brand}</span>
        </label>
      ))}
    </FilterSection>

    <FilterSection title="Features">
      {['Metallic', '8GB Ram', 'Super power'].map(f => (
        <label key={f} className="flex items-center gap-2.5 py-1 text-[#505050] text-[14px] cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded accent-blue-600 border-gray-300" /> <span>{f}</span>
        </label>
      ))}
    </FilterSection>

    <FilterSection title="Price range">
      <div className="space-y-3">
        <div className="flex gap-2">
          <input type="number" placeholder="Min" className="w-full border border-gray-300 rounded p-1.5 text-xs outline-none" />
          <input type="number" placeholder="Max" className="w-full border border-gray-300 rounded p-1.5 text-xs outline-none" />
        </div>
        <button className="w-full py-1.5 bg-white border border-gray-200 text-blue-600 rounded font-bold text-xs">Apply</button>
      </div>
    </FilterSection>

    <FilterSection title="Condition">
      {['Any', 'Refurbished', 'Brand New'].map((c, i) => (
        <label key={c} className="flex items-center gap-2.5 py-1 text-[#505050] text-[14px]">
          <input type="radio" name="c" defaultChecked={i===0} className="w-4 h-4 accent-blue-600" /> <span>{c}</span>
        </label>
      ))}
    </FilterSection>

    <FilterSection title="Ratings">
       {[5, 4, 3].map(n => (
         <label key={n} className="flex items-center gap-2 py-1 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            <div className="flex text-[#FF9017]">
              {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < n ? "#FF9017" : "none"} className="text-[#FF9017]" />)}
            </div>
         </label>
       ))}
    </FilterSection>
  </div>
);

const FilterSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="border-b lg:border-t lg:border-b-0 border-gray-200 py-3">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center font-bold text-[12px] uppercase tracking-wider mb-2 text-[#1C1C1C]">
        {title} {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

const Pagination = ({ productsCount }) => (
  <div className="flex flex-col sm:flex-row items-center justify-between mt-8 bg-white border border-gray-200 rounded-lg p-3 gap-4 shadow-sm">
    <span className="text-xs text-gray-500 font-medium italic">Showing {productsCount} items</span>
    <div className="flex -space-x-px">
      <button className="px-3 py-2 border border-gray-300 rounded-l-md bg-white hover:bg-gray-50"><ChevronLeft size={16} /></button>
      <button className="px-4 py-2 border border-gray-300 text-sm font-bold bg-blue-50 text-blue-600 z-10">1</button>
      <button className="px-4 py-2 border border-gray-300 text-sm hover:bg-gray-50">2</button>
      <button className="px-4 py-2 border border-gray-300 text-sm hover:bg-gray-50">3</button>
      <button className="px-3 py-2 border border-gray-300 rounded-r-md bg-white hover:bg-gray-50"><ChevronRight size={16} /></button>
    </div>
  </div>
);

export default ProductList;