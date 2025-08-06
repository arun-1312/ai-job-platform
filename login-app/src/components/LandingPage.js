import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, HardHat, Linkedin, Twitter, Dribbble } from 'lucide-react';
import '../styles/LandingPage.css'; // Make sure this is imported

const LandingPage = ({ switchToLogin, switchToSignUp }) => {
  return (
    <div className="dark-theme-bg text-gray-300 font-sans flex flex-col min-h-screen">
      {/* 1. Navigation Bar */}
      <header className="sticky top-0 z-50 bg-slate-900/60 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="#" className="flex items-center space-x-2">
              <Briefcase className="h-7 w-7 text-indigo-400" />
              <span className="text-xl font-bold text-white">AI Job Match Platform</span>
            </a>
            <div className="flex items-center space-x-2">
              <button onClick={switchToLogin} className="px-4 py-2 text-sm font-semibold text-white bg-transparent rounded-md hover:bg-slate-800">
                Login
              </button>
              <button onClick={switchToSignUp} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 shadow-lg shadow-indigo-600/20">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center">
        {/* 2. Simplified Hero Section */}
        <section className="hero-section w-full">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <motion.div 
                    className="hero-content md:w-1/2"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="flex items-center text-yellow-400 mb-4">
                        <HardHat size={28} className="mr-3" />
                        <span className="text-lg font-semibold">Pardon Our Dust!</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                        Something <span className="text-indigo-400">Brilliant</span> is Coming Soon.
                    </h1>
                    <p className="max-w-xl mt-6 text-lg text-gray-300">
                        Welcome to AI Job Match Platform, the future of career development. Our intelligent platform is being built to analyze your unique skills and career goals, connecting you with opportunities that truly fit. We're revolutionizing the job search by making it smarter, faster, and more personalized.
                    </p>
                    <button onClick={switchToSignUp} className="mt-8 px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transform hover:scale-105 transition-transform">
                        Get Started
                    </button>
                </motion.div>
            </div>
            <div className="hero-image-container">
                <img 
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop" 
                    alt="Professionals collaborating in a modern office" 
                    className="hero-image"
                />
            </div>
        </section>
      </main>

      {/* 3. Simplified Footer */}
      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-screen-xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-400">Developing by Zolabz Technologies</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
