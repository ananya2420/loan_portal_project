//pages and routes
//thank-you  redirect back to the homepage or another page

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { toggleTheme } from '../store/themeSlice';  // Import the action to toggle theme
import {}
const Thankyou = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Accessing theme from Redux
  const theme = useSelector((state) => state.theme.theme);

  // Handle the "Go Back to Home" button click
  const handleGoHome = () => {
    navigate('/');
  };

  // Handle the "Go to Login" button click
  const handleGoToLogin = () => {
    navigate('/login'); // Navigate to login page
  };

  // Toggle theme between light and dark mode
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div
      className={`max-w-4xl mx-auto p-6 rounded-lg shadow-lg mt-16 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
      }`}
    >
      <h1 className="text-4xl font-bold text-center text-green-600 mb-4">Submission Confirmed!</h1>
      <p className="text-lg text-gray-700 text-center mb-6">Thank you for your submission. Your form has been successfully processed.</p>

      {/* Theme Toggle Button */}
      <button
        onClick={handleToggleTheme}
        className="absolute top-4 right-4 text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
      >
        Toggle Theme
      </button>

      <div className="flex justify-center gap-4">
        {/* Button to go back home */}
        <button
          onClick={handleGoHome}
          className="bg-blue-500 text-white font-semibold py-2 px-8 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Go Back to Home
        </button>

        {/* New Button to go to the Login page */}
        <button
          onClick={handleGoToLogin}
          className="bg-green-500 text-white font-semibold py-2 px-8 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Thankyou;
