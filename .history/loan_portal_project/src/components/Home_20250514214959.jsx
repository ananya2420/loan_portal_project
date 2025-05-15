//Home component- redirect to- Apply page
//use react-hook-form

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice'; // Adjust path if needed

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme); // Get current theme from Redux

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Form submission handler
  const onSubmit = (data) => {
    console.log("User Info:", data); // Log data to the console (for debugging)
    navigate('/apply'); // Redirect to /apply page after submission
  };

  // Theme toggle handler
  const handleToggleTheme = () => {
    dispatch(toggleTheme()); // Dispatch the toggle action to change the theme
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div
        className={`p-8 rounded-lg shadow-md w-full max-w-md text-center transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {/* Header with Toggle */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-red-800 dark:text-red-300">
            Welcome to the Loan Portal
          </h1>
          <button
            onClick={handleToggleTheme}
            className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
          >
            Toggle Theme
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Enter your name to begin your loan application.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          {/* Full Name Input */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              {...register('username', { required: 'Name is required' })}
              className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-black'
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message} {/* Show error message if validation fails */}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Apply for Loan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
