import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, Package, MapPin, Heart, 
  LogOut, ChevronRight, Settings 
} from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth(); // Added 'user' here to use as fallback
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token');
      
      try {
        const response = await fetch('http://127.0.0.1:8000/api/users/me/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  
  const orders = [
    { id: '#34556', date: 'Oct 24, 2025', status: 'Delivered', total: '$145.50', items: 3 },
    { id: '#34557', date: 'Nov 12, 2025', status: 'Shipped', total: '$99.00', items: 1 },
    { id: '#34558', date: 'Dec 05, 2025', status: 'Processing', total: '$1,240.00', items: 2 },
  ];

  if (loading) return <div className="text-center pt-20">Loading...</div>;

  return (
    <div className="bg-[#F7FAFC] min-h-screen pb-20">
      <div className="container mx-auto px-4 max-w-7xl pt-8">
        <div className="grid grid-cols-12 gap-6">
          
          {/* LEFT SIDEBAR */}
          <aside className="col-span-12 md:col-span-3">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="p-6 text-center border-b border-gray-100">
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User size={40} />
                </div>
                {/* UPDATED LOGIC BELOW */}
                <h3 className="font-bold text-gray-800">
                    {profileData?.first_name 
                      ? `${profileData.first_name} ${profileData.last_name}` 
                      : (profileData?.username || user?.username || user?.name || 'Guest User')}
                </h3>
                <p className="text-xs text-gray-400">{profileData?.email || user?.email}</p>
              </div>
              <nav className="p-2">
                <button className="w-full flex items-center justify-between p-3 text-sm font-medium text-blue-600 bg-blue-50 rounded-md">
                  <div className="flex items-center gap-3"><Package size={18}/> My Orders</div>
                  <ChevronRight size={16} />
                </button>
                <button className="w-full flex items-center justify-between p-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
                  <div className="flex items-center gap-3"><Heart size={18}/> Wishlist</div>
                  <ChevronRight size={16} />
                </button>
                <button className="w-full flex items-center justify-between p-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
                  <div className="flex items-center gap-3"><MapPin size={18}/> Addresses</div>
                  <ChevronRight size={16} />
                </button>
                <button className="w-full flex items-center justify-between p-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
                  <div className="flex items-center gap-3"><Settings size={18}/> Settings</div>
                  <ChevronRight size={16} />
                </button>
                <hr className="my-2 border-gray-100" />
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-3 p-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut size={18}/> Logout
                </button>
              </nav>
            </div>
          </aside>

          {/* MAIN CONTENT: ORDER HISTORY */}
          <main className="col-span-12 md:col-span-9 space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Orders</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100">
                      <th className="pb-4 font-medium">Order ID</th>
                      <th className="pb-4 font-medium">Date</th>
                      <th className="pb-4 font-medium">Status</th>
                      <th className="pb-4 font-medium">Items</th>
                      <th className="pb-4 font-medium text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {orders.map((order) => (
                      <tr key={order.id} className="text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <td className="py-4 font-bold text-blue-600">{order.id}</td>
                        <td className="py-4">{order.date}</td>
                        <td className="py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4">{order.items} items</td>
                        <td className="py-4 text-right font-bold text-gray-900">{order.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* QUICK INFO CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2">Default Address</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {profileData?.first_name} {profileData?.last_name}<br />
                  {profileData?.address || '123 Tech Street, Silicon Valley'}<br />
                  California, USA, 94043
                </p>
                <button className="mt-4 text-blue-600 text-sm font-bold hover:underline">Edit Address</button>
              </div>
              <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Store Credit</h4>
                  <p className="text-2xl font-bold text-[#00B517]">$0.00</p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                  <Package size={24} />
                </div>
              </div>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};

export default Profile;