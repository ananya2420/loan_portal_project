//Home component- redirect to- Apply page
//use react-hook-form

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';
import loan from '../assets'

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    // Navigate to /apply with user data
    navigate('/apply', { state: { username: data.username, email: data.email } });
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  // Progress indicator steps
  const steps = ['Start', 'Application', 'Review', 'Complete'];
  // On Home page, we are on step 1 (Start)
  const currentStep = 1;

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      {/* Form Progress Indicator */}
      <div className="w-full max-w-md mb-6 flex justify-between text-sm font-medium">
        {steps.map((label, index) => (
          <div
            key={index}
            className={`flex-1 text-center border-b-4 pb-2 ${
              currentStep === index + 1
                ? 'border-blue-600 text-blue-600'
                : 'border-gray-300 text-gray-400'
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="w-full max-w-md flex justify-end mb-4 px-0">
        <button
          onClick={handleToggleTheme}
          className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
        >
          Toggle Theme
        </button>
      </div>

      <div
        className={`p-8 rounded-lg shadow-md w-full max-w-md text-center transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h1 className="text-2xl font-bold text-red-800 dark:text-red-300 mb-4">
          Welcome to the Loan Portal
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Enter your name and email to begin your loan application.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          {/* Name Input */}
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
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="Your Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              })}
              className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-black'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full px-6 py-2 rounded text-white transition ${
              isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'
            }`}
          >
            Next
          </button>

          <div>
            <img src="" alt="" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;



