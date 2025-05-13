//pages and routes
//reiew - redirect to- thank-you page
//use react-hook-form

//pages and routes
//reiew - redirect to- thank-you page
//use react-hook-form


// src/components/review.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toggleTheme } from '../redux/slices/themeSlice'; // Import the toggleTheme action

const Review = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme); // Get the current theme from Redux state

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm(); // Initialize React Hook Form

  const onSubmit = () => {
    navigate('/thank-you'); // Navigate to thank you page on form submission
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme()); // Dispatch the toggle theme action
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
              style={{ width: isSubmitting ? '100%' : '0%' }}
              className={`transition-all duration-500 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                isSubmitting ? 'bg-green-500' : 'bg-teal-500'
              }`}
            ></div>
          </div>
        </div>
      </div>

      <div className={`max-w-4xl mx-auto p-6 shadow-md rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <h1 className="text-3xl font-bold text-center mb-4">Review and Confirm</h1>
        <p className="text-lg mb-6">Summary of your input</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                {...register('confirmation', { required: true })}
              />
              <span className="ml-2">I confirm that all information provided is correct.</span>
            </label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Confirm and Submit'}
            </button>
          </div>
        </form>

        {/* Theme toggle button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleThemeToggle}
            className="bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Toggle Theme
          </button>
        </div>
      </div>
    </>
  );
};

export default Review;

