import React from 'react';
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

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      confirmation: confirmation || false,
    },
  });

  const onSubmit = (data) => {
    dispatch(setConfirmation(data.confirmation));
    navigate('/thank-you');
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleBack = () => {
    navigate('/apply/summary');
  };

  const handleNext = () => {
    navigate('/apply/updated-picture');
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      {/* Main content container */}
      <div
        className={`p-8 rounded-lg shadow-md w-full max-w-md text-center transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {/* Progress Bar */}
        <div className="relative pt-1 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-teal-600 uppercase bg-teal-200 rounded-full">
              Step 6 of 8
            </span>
            <span className="text-xs font-semibold text-teal-600">Review</span>
          </div>
          <div className="flex h-2 overflow-hidden text-xs bg-teal-200 rounded">
            <div
              style={{ width: isSubmitting ? '100%' : '0%' }}
              className={`transition-all duration-500 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                isSubmitting ? 'bg-green-500' : 'bg-teal-500'
              }`}
            />
          </div>
        </div>

        <h1 className="mb-4 text-3xl font-bold">Review and Confirm</h1>

        {/* Toggle Theme Button ABOVE form, aligned right */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleThemeToggle}
            className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
          >
            Toggle Theme
          </button>
        </div>

        <p className="mb-6 text-lg">
          Please confirm the accuracy of your details.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="w-5 h-5 text-blue-600 form-checkbox"
                {...register('confirmation', { required: true })}
              />
              <span className="ml-2">
                I confirm that all information provided is correct.
              </span>
            </label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 font-semibold text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Confirm and Submit'}
            </button>
          </div>
        </form>

        {/* Navigation Buttons */}
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
    </div>
  );
};

export default Review;
