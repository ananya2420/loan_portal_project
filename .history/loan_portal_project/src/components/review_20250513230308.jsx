//pages and routes
//reiew - redirect to- thank-you page
//use react-hook-form

//pages and routes
//reiew - redirect to- thank-you page
//use react-hook-form


// src/components/review.js
// src/components/Review.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toggleTheme } from '../redux/slices/themeSlice';
import { setConfirmation } from '../redux/slices/formSlice';

const Review = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const confirmation = useSelector((state) => state.formData.confirmation);
  const formData = useSelector((state) => state.formData); // Get all form data to check for completeness

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      confirmation: confirmation || false,
    },
  });

  // Check if the form is complete
  useEffect(() => {
    if (!formData || !formData.someRequiredField) { // Replace 'someRequiredField' with an actual field to check
      navigate('/previous-step'); // Redirect to a previous step or home if the form is incomplete
    }
  }, [formData, navigate]);

  const onSubmit = (data) => {
    dispatch(setConfirmation(data.confirmation));
    navigate('/thank-you');
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    navigate('/next-step');
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
              className={`transition-all duration-500 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${isSubmitting ? 'bg-green-500' : 'bg-teal-500'}`}
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

        {/* Back and Next Buttons */}
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

export default Review;


