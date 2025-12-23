import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to handle login errors
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store tokens in localStorage for API authorization
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);

      
        login({ 
          username: username, 
          name: username, 
          role: 'user' 
        }); 
        
        navigate('/');
      } else {
        setError(data.detail || 'Invalid username or password');
      }
    } catch (err) {
      setError('Connection refused. Is the backend running?');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Sign in</h2>
        
        {/* Error Message Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:border-blue-500"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Link to="#" className="text-sm text-blue-600 hover:underline">Forgot password?</Link>
            </div>
            <input 
              type="password" 
              className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:border-blue-500"
              placeholder="Type here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full bg-[#0D6EFD] text-white py-2.5 rounded-md font-bold hover:bg-blue-700 transition-colors">
            Log In
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account? <Link to="/signup" className="text-blue-600 font-bold hover:underline">Register now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;