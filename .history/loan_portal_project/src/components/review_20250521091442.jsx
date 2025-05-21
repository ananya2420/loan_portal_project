import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toggleTheme } from '../redux/slices/themeSlice';
import { setConfirmation } from '../redux/slices/formSlice';

const steps = [
  'Apply',
  'Personal Info',
  'Employee Details',
  'Loan Details',
  'Document Updates',
  'Summary',
  'Review',
  'Thank You',
];

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

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      {/* Toggle Theme Button OUTSIDE and away from form */}
      <div className="w-full max-w-md flex justify-end mb-6">
        <button
          onClick={handleThemeToggle}
          className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
        >
          Toggle Theme
        </button>
      </div>

      {/* Step tracker - same style as Summary component */}
      <div className="flex justify-between max-w-4xl mx-auto mb-6 px-4 w-full max-w-md">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = label === 'Review';

          return (
            <div key={label} className="flex flex-col items-center w-1/8">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  isActive ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {stepNumber}
              </div>
              <div
                className={`text-xs text-center ${
                  isActive ? 'font-bold text-blue-600' : 'text-gray-600'
                }`}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full max-w-md mx-auto">
        <div className="relative pt-1 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-teal-600 uppercase bg-teal-200 rounded-full">
              Step 7 of 7
            </span>
            <span className="text-xs font-semibold text-teal-600">80%</span>
          </div>
          <div className="flex h-2 overflow-hidden text-xs bg-teal-200 rounded">
            <div
              style={{ width: '80%' }}
              className="flex flex-col justify-center text-center text-white transition-all duration-500 bg-green-500 shadow-none whitespace-nowrap"
            />
          </div>
        </div>
      </div>

      {/* Main content container */}
      <div
        className={`p-8 rounded-lg shadow-md w-full max-w-md text-center transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h1 className="mb-4 text-3xl font-bold">Review and Confirm</h1>

        <p className="mb-6 text-lg">Please confirm the accuracy of your details.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="w-5 h-5 text-blue-600 form-checkbox"
                {...register('confirmation', { required: true })}
              />
              <span className="ml-2">I confirm that all information provided is correct.</span>
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
        </div>
      </div>
    </div>
  );
};

export default Review;

