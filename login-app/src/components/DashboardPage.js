import React from 'react';
import { HardHat, LogOut, Home } from 'lucide-react';

const DashboardPage = ({ onLogout }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-sans p-4">
      <div className="text-center">
        <HardHat className="mx-auto h-24 w-24 text-yellow-500 animate-bounce" />
        <h1 className="mt-6 text-4xl font-bold text-gray-800">
          Dashboard Under Construction
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-md">
          Our AI is busy building your future (and this page). Please check back soon! We're adding some awesome features.
        </p>
        
        {/* --- UPDATED: Added a container and a second button --- */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
            <button
              onClick={onLogout} // This function correctly navigates back to the landing page
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              <Home size={16} />
              <span>Back to Landing Page</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
