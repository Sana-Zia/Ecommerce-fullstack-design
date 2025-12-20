import React from 'react';
import { 
  Mail, Facebook, Twitter, Linkedin, Instagram, 
  Youtube, ChevronUp 
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    {
      title: 'About',
      links: ['About Us', 'Find store', 'Categories', 'Blogs']
    },
    {
      title: 'Partnership',
      links: ['About Us', 'Find store', 'Categories', 'Blogs']
    },
    {
      title: 'Information',
      links: ['Help Center', 'Money Refund', 'Shipping', 'Contact us']
    },
    {
      title: 'For users',
      links: ['Login', 'Register', 'Settings', 'My Orders']
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-10">
      {/* --- NEWSLETTER SECTION --- */}
      <div className="bg-[#EFF2F4] py-10">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <h4 className="text-xl font-bold mb-1 text-gray-900">
            Subscribe on our newsletter
          </h4>
          <p className="text-gray-500 mb-6 text-sm">
            Get daily news on upcoming offers from many suppliers all over the world
          </p>
          
          <form className="flex w-full max-w-sm gap-2 px-4" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex-grow">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-white" 
              />
            </div>
            <button className="bg-[#0D6EFD] text-white px-5 py-2 rounded-md font-medium hover:bg-blue-700 transition-all shadow-sm">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* --- MAIN FOOTER LINKS --- */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
            
            {/* Brand Info */}
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                {/* Logo Icon Box */}
                <div className=" flex items-center justify-center">
                   <img 
                    src="/logo-colored.png" 
                    alt="Brand Logo" 
                    className="h-8 w-auto object-contain" 
                   />
                </div>
                
              </div>
              <p className="text-gray-500 text-sm mb-6 max-w-[240px] leading-relaxed">
                Best information about the company goes here but now lorem ipsum is.
              </p>
              <div className="flex gap-2">
                {[Facebook, Twitter, Linkedin, Instagram, Youtube].map((Icon, idx) => (
                  <button 
                    key={idx} 
                    className="w-8 h-8 bg-[#BDC4CD] rounded-full flex items-center justify-center text-white hover:bg-[#0D6EFD] transition-colors"
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Dynamic Link Groups */}
            {footerLinks.map((group, i) => (
              <div key={i} className="col-span-1">
                <h5 className="font-bold text-gray-900 mb-4 text-sm">{group.title}</h5>
                <ul className="text-gray-500 text-sm space-y-2">
                  {group.links.map((link, idx) => (
                    <li key={idx}>
                      <a href="#" className="hover:text-[#0D6EFD] transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Get App Section */}
            <div className="col-span-2 lg:col-span-1">
              <h5 className="font-bold text-gray-900 mb-4 text-sm">Get app</h5>
              <div className="flex flex-col gap-2">
                <a href="#" className="inline-block transition-opacity hover:opacity-80">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="w-32 h-auto" />
                </a>
                <a href="#" className="inline-block transition-opacity hover:opacity-80">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="w-32 h-auto" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- BOTTOM COPYRIGHT --- */}
      <div className="bg-[#EFF2F4] py-4 border-t border-gray-200">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© 2023 Ecommerce.</p>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 cursor-pointer hover:text-gray-800">
              <span>English</span>
              <ChevronUp size={14} className="rotate-180" />
            </div>
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-[#0D6EFD] transition-colors"
            >
              Back to top <ChevronUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;