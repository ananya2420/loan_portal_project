//pages and routes
//thank-you  redirect back to the homepage or another page

// src/components/Thankyou.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice'; // Import the toggleTheme action

const Thankyou = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme); // Get the current theme from Redux state

  const handleGoHome = () => {
    navigate('/'); // Navigate to the homepage
  };

  const handleGoToLogin = () => {
    navigate('/login'); // Navigate to the login page
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme()); // Dispatch action to toggle theme
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleNext = () => {
    navigate('/next-step'); // Navigate to the next step page
  };

  return (
    <>
      {/* Progress Indicator */}
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                Step 6 of 6
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-teal-600">
                100%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
            <div
              style={{ width: '100%' }}
              className="transition-all duration-500 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
            ></div>
          </div>
        </div>
      </div>

      {/* Thank You Section */}
      <div
        className={`max-w-4xl mx-auto p-6 rounded-lg shadow-lg mt-8 transition-all duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}
      >
        <h1 className="text-4xl font-bold text-center text-green-600 mb-4">Submission Confirmed!</h1>
        <p className="text-lg text-gray-700 text-center mb-6">
          Thank you for your submission. Your form has been successfully processed.
        </p>

        {/* Theme Toggle Button */}
        <button
          onClick={handleToggleTheme}
          className="absolute top-4 right-4 text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
        >
          Toggle Theme
        </button>

        {/* Buttons for navigation */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleGoHome}
            className="bg-blue-500 text-white font-semibold py-2 px-8 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Go Back to Home
          </button>

          <button
            onClick={handleGoToLogin}
            className="bg-green-500 text-white font-semibold py-2 px-8 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Go to Login
          </button>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleBack}
            className="px-5 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Back
          </button>

          <button
            onClick={handleNext}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Thankyou;

