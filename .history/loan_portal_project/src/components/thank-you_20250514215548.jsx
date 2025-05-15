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
        className={`relative max-w-4xl mx-auto p-6 rounded-lg shadow-lg mt-8 transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
        }`}
      >
        <h1 className="mb-4 text-4xl font-bold text-center text-green-600">Submission Confirmed!</h1>
        <p className="mb-6 text-lg text-center text-gray-700">
          Thank you for your submission. Your form has been successfully processed.
        </p>

        {/* Theme Toggle Button */}
        <button
          onClick={handleToggleTheme}
          className="absolute px-3 py-1 text-sm text-white transition bg-indigo-500 rounded top-4 right-4 hover:bg-indigo-600"
        >
          Toggle Theme
        </button>

        {/* Buttons for navigation */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleGoHome}
            className="px-8 py-2 font-semibold text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Go Back to Home
          </button>

          <button
            onClick={handleGoToLogin}
            className="px-8 py-2 font-semibold text-white transition duration-300 bg-green-500 rounded-lg hover:bg-green-600"
          >
            Go to Login
          </button>
        </div>

        {/* Back and Next Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleBack}
            className="px-5 py-2 text-white bg-gray-400 rounded hover:bg-gray-500"
          >
            Back
          </button>

          <button
            onClick={handleNext}
            className="px-5 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Thankyou;
