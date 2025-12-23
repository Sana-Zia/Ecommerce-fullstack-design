import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    // Simulating registration API call
    login({ 
      name: formData.name, 
      email: formData.email, 
      role: 'user' 
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Create account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
            <input 
              type="text" 
              required
              placeholder="First and last name"
              className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:border-blue-500"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              placeholder="example@mail.com"
              className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:border-blue-500"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              required
              placeholder="At least 6 characters"
              className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:border-blue-500"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
            <input 
              type="password" 
              required
              placeholder="Repeat password"
              className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:border-blue-500"
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          <button className="w-full bg-[#0D6EFD] text-white py-2.5 rounded-md font-bold hover:bg-blue-700 transition-colors mt-2">
            Register now
          </button>
        </form>

        <hr className="my-6 border-gray-100" />

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;