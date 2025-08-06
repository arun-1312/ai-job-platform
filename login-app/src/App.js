import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import SignUpPage from './components/SignUpPage';
import LandingPage from './components/LandingPage'; // Import the new LandingPage

function App() {
  // State can be 'landing', 'login', 'signup', or 'dashboard'
  const [currentPage, setCurrentPage] = useState('landing');

  const handleLoginSuccess = () => {
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentPage('landing'); // Go to landing page on logout
  };

  const showSignUpPage = () => {
    setCurrentPage('signup');
  };

  const showLoginPage = () => {
    setCurrentPage('login');
  };

  // Render the correct page based on the state
  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLoginSuccess={handleLoginSuccess} switchToSignUp={showSignUpPage} />;
      case 'signup':
        return <SignUpPage onSignUpSuccess={handleLoginSuccess} switchToLogin={showLoginPage} />;
      case 'dashboard':
        return <DashboardPage onLogout={handleLogout} />;
      case 'landing':
      default:
        return <LandingPage switchToLogin={showLoginPage} switchToSignUp={showSignUpPage} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;