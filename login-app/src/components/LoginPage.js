import React, { useState } from 'react';
import { Mail, Lock, LogIn, UserPlus, Linkedin, Eye, EyeOff, AlertCircle } from 'lucide-react';
import '../styles/LoginPage.css';
// Import the validation functions
import { validateEmail, validatePassword } from '../utils/validation.js';

// A simple SVG for the Google icon
const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C14.03,4.73 15.69,5.36 16.95,6.45L19.05,4.35C17.02,2.36 14.46,1.5 12.19,1.5C7.03,1.5 3,5.58 3,12C3,18.42 7.03,22.5 12.19,22.5C17.6,22.5 21.7,18.35 21.7,12.33C21.7,11.77 21.52,11.44 21.35,11.1Z" />
    </svg>
);


const LoginPage = ({ onLoginSuccess, switchToSignUp }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    api: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id] || errors.api) {
      setErrors(prev => ({ ...prev, [id]: '', api: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(prev => ({ ...prev, api: '' }));

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
        api: '',
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://ai-job-platform-api.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data.message);
        onLoginSuccess();
      } else {
        setErrors(prev => ({ ...prev, api: data.message || 'An error occurred.' }));
      }
    } catch (error) {
      console.error('Network error:', error);
      setErrors(prev => ({ ...prev, api: 'Could not connect to the server.' }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden">
        
        {/* --- UPDATED: Moved title and subtitle here --- */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-gray-800 to-gray-900 text-white flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Login
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-300 mb-8">
            Welcome back! Please enter your details to find your future.
          </p>
          <div className="mt-4">
            <span className="inline-block w-24 h-1.5 bg-indigo-500 rounded-full"></span>
          </div>
        </div>

        {/* --- UPDATED: Removed title and added flex properties to center the form vertically --- */}
        <div className="w-full md:w-1/2 p-6 md:p-10 bg-white flex flex-col justify-center">
          <form onSubmit={handleSubmit} noValidate>
            {errors.api && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
                <AlertCircle size={20} className="mr-3" />
                <span>{errors.api}</span>
              </div>
            )}

            {/* --- UPDATED: Reduced bottom margin --- */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 transition-colors ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                />
              </div>
              {errors.email && (
                <div className="flex items-center mt-2 text-sm text-red-600">
                  <AlertCircle size={16} className="mr-1.5" />
                  {errors.email}
                </div>
              )}
            </div>

            {/* --- UPDATED: Reduced bottom margin --- */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`w-full pl-10 pr-12 py-2.5 bg-gray-50 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 transition-colors ${
                    errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-700"
                  aria-label="Toggle password visibility"
                >
                  {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center mt-2 text-sm text-red-600">
                  <AlertCircle size={16} className="mr-1.5" />
                  {errors.password}
                </div>
              )}
            </div>
            
            <div className="flex justify-end mb-4">
              <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot Password?</a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Login
                </>
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all">
                <GoogleIcon />
                <span className="text-sm font-medium">Google</span>
              </button>
              <button className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all">
                <Linkedin className="text-[#0077B5]" size={20}/>
                <span className="text-sm font-medium">LinkedIn</span>
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button onClick={switchToSignUp} className="font-medium text-indigo-600 hover:underline">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
