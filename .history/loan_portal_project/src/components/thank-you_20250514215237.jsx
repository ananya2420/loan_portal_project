-//pages and routes
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
    navigate('/apply/picture-preview'); // Navigate to /apply/picture-preview
  };

  return (
    <>
      {/* Progress Indicator */}
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="relative pt-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="inline-block px-2 py-1 text-xs font-semibold text-teal-600 uppercase bg-teal-200 rounded-full">
                Step 6 of 6
              </span>
            </div>
            <div className="text-right">
              <span className="inline-block text-xs font-semibold text-teal-600">
                100%
              </span>
            </div>
          </div>
          <div className="flex h-2 mb-4 overflow-hidden text-xs bg-teal-200 rounded">
            <div
              style={{ width: '100%' }}
              className="flex flex-col justify-center text-center text-white transition-all duration-500 bg-green-500 shadow-none whitespace-nowrap"
            ></div>
          </div>
        </div>
      </div>

      {/* Thank You Section */}
      <div
        className={`max-w-4xl mx-auto p-6 rounded-lg shadow-lg mt-8 transition-all duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}
      >
        <h1 className="mb-4 text-4xl font-bold text-center text-green-600">Submission Confirmed!</h1>
        <p className="mb-6 text-lg text-center text-gray-700">
