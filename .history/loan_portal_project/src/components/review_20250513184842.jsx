//pages and routes
//reiew - redirect to- thank-you page
//use react-hook-form

//pages and routes
//reiew - redirect to- thank-you page
//use react-hook-form

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice'; // Action to toggle theme

const Review = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Accessing theme from the Redux store
  const theme = useSelector((state) => state.theme.theme);  // Get current theme from Redux store
  
  // Accessing form data from Redux store (this will be your form's state in Redux)
  const formData = useSelector((state) => state.formData); // Assuming you have form data in Redux
  
  // React Hook Form for the confirmation checkbox
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = () => {
    navigate('/thank-you');
  };

  // Handle theme toggle
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  // Navigation functions
  const handleBack = () => {
    navigate(-1); // Go to the previous step
  };

  const handleNext = () => {
    navigate('/next-step'); // Replace '/next-step' with the actual path for the next step
  };

  // Check if the form data is complete
  const isFormComplete = formData?.username && formData?.email && formData?.password; // Adjust this condition based on your form's data fields

  // Redirect if form is not complete
  if (!isFormComplete) {
    navigate('/form'); // Redirect to the form page if the data is not complete
    return null; // Prevent rendering the Review page
  }

  return (
    <div
      className={`max-w-4xl mx-auto p-6 rounded-lg shadow-md transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
      }`}
    >
      <h1 className="text-3xl font-bold text-center mb-4">Review and Confirm</h1>
      <p className="text-lg text-gray-600 mb-6">Summary of user input</p>

      {/* Theme Toggle Button */}
      <button
        onClick={handleToggleTheme}
        className="absolute top-4 right-4 text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
      >
        Toggle Theme
      </button>

      {/* Form for confirmation */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('confirm', { required: true })}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">I confirm that all information provided is correct.</span>
          </label>
          {errors.confirm && (
            <p className="text-red-500 text-sm mt-2">You must confirm before submitting.</p>
          )}
        </div>

        <div className="flex justify-center gap-4">
          {/* Back Button */}
          <button
            type="button"
            onClick={handleBack}
            className="px-5 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Back
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Confirm and Submit
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Review;
