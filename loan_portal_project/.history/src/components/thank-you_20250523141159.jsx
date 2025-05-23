import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';

const Thankyou = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleBack = () => {
    navigate('/apply/review');
  };

  const currentStep = 8;

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
      }`}
    >
      {/* Toggle Theme Button */}
      <div className="w-full max-w-md flex justify-end mb-6">
        <button
          onClick={handleToggleTheme}
          className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
        >
          Toggle Theme
        </button>
      </div>

      {/* Step Tracker - Same as Review component */}
      <div className="mb-6 grid grid-cols-8 gap-2 text-xs font-semibold text-center">
        {[
          { step: 1, label: 'Apply' },
          { step: 2, label: <>Personal<br />Info</> },
          { step: 3, label: <>Employee<br />Details</> },
          { step: 4, label: <>Loan<br />Details</> },
          { step: 5, label: <>Document<br />Updates</> },
          { step: 6, label: 'Summary' },
          { step: 7, label: 'Review' },
          { step: 8, label: 'Thank You' },
        ].map(({ step, label }) => (
          <div key={step} className="flex flex-col items-center col-span-1">
            <span
              className={`w-7 h-7 flex items-center justify-center rounded-full font-bold ${
                step === currentStep ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}
            >
              {step}
            </span>
            <span className="mt-1 truncate" title={typeof label === 'string' ? label : undefined}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Progress Bar - Same as Review component */}
      <div className="w-full max-w-md mx-auto">
        <div className="relative pt-1 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-teal-600 uppercase bg-teal-200 rounded-full">
              Step 8 of 8
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

      {/* Thank You Section */}
      <div
        className={`w-full max-w-md p-8 rounded-lg shadow-md text-center transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        }`}
      >
        <h1 className="mb-4 text-4xl font-bold text-green-600">
          Submission Confirmed!
        </h1>
        <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
          Thank you for your submission. Your form has been successfully processed.
        </p>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleGoHome}
            className="px-8 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Go Back to Home
          </button>

          <button
            onClick={handleGoToLogin}
            className="px-8 py-2 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
          >
            Go to Login
          </button>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleBack}
            className="px-5 py-2 text-white bg-gray-400 rounded hover:bg-gray-500"
          >
            Back
          </button>

          <button
            className="px-5 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Thankyou;

