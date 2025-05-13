//pages and routes
//Apply component-redirect to- Review page
//use React-hook-form

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';

const Apply = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme); // Get current theme from Redux

  const [step, setStep] = useState(1); // Track current step (initially set to step 1)

  const onSubmit = (data) => {
    console.log('Form Data:', data);

    // Navigate based on current step
    if (step === 1) {
      navigate('/apply/personal-info');
      setStep(2); // Move to step 2 after submitting step 1
    }
    // Add more steps logic here based on your process
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
      // Go back in history stack
      navigate(-1);
    }
  };

  const goNext = () => {
    if (step < 5) { // Assuming 5 steps total, adjust as needed
      setStep(step + 1);
      navigate(`/apply/step${step + 1}`);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`max-w-md w-full p-6 shadow-md rounded-lg transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold flex-1 text-center text-red-800 dark:text-red-300">
            Loan Application
          </h1>
          <button
            type="button"
            onClick={handleToggleTheme}
            className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
          >
            Toggle Theme
          </button>
        </div>

        {/* Full Name Field */}
        <div className="mb-4">
          <label
            className={`block text-sm font-medium mb-1 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`}
          >
            Full Name
          </label>
          <input
            type="text"
            {...register('name', { required: 'Full name is required' })}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-black'
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          {/* Back Button */}
          {step > 1 && (
            <button
              type="button"
              onClick={goBack}
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
            >
              Back
            </button>
          )}

          {/* Next Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            {step === 5 ? 'Submit Application' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Apply;
