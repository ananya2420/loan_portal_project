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
          className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
        >
          Toggle Theme
        </button>
      </div>

      {/* Step Tracker - with colors */}
      <div className="mb-6 grid grid-cols-8 gap-2 text-xs font-semibold text-center">
        {[
          { step: 1, label: 'Apply', color: 'text-black-600' },
          { step: 2, label: <>Personal<br />Info</>, color: 'text-black-600' },
          { step: 3, label: <>Employee<br />Details</>, color: 'text-black-600' },
          { step: 4, label: <>Loan<br />Details</>, color: 'text-black-600' },
          { step: 5, label: <>Document<br />Updates</>, color: 'text-black-600' },
          { step: 6, label: 'Summary', color: 'text-black-600' },
          { step: 7, label: 'Review', color: 'text-black-600' },
          { step: 8, label: 'Thank You', color: 'text-black-600' },
        ].map(({ step, label, color }) => (
          <div key={step} className="flex flex-col items-center col-span-1">
            <span
              className={`w-7 h-7 flex items-center justify-center rounded-full font-bold ${
                step === currentStep ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}
            >
              {step}
            </span>
            <span className={`mt-1 truncate ${color}`} title={typeof label === 'string' ? label : undefined}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md mx-auto">
        <div className="relative pt-1 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-teal-700 uppercase bg-teal-200 rounded-full">
              Step 8 of 8
            </span>
            <span className="text-xs font-semibold text-green-700">80%</span>
          </div>
          <div className="flex h-2 overflow-hidden text-xs bg-green-200 rounded">
            <div
              style={{ width: '80%' }}
              className="flex flex-col justify-center text-center text-white transition-all duration-500 bg-green-600 shadow-none whitespace-nowrap"
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
        <h1 className="mb-4 text-4xl font-bold text-black-600">
          Submission Confirmed!
        </h1>
        <p className="mb-6 text-lg text-indigo-700 dark:text-indigo-400">
          Thank you for your submission. Your form has been successfully processed.
        </p>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleGoHome}
            className="px-8 py-2 font-semibold text-white bg-outline-600 rounded-lg hover:bg-outline-700 transition"
          >
            Go Back to Home
          </button>

          <button
            onClick={handleGoToLogin}
            className="px-8 py-2 font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition"
          >
            Go to Login
          </button>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleBack}
            className={`px-4 py-2 rounded transition border ${
                theme === 'dark' ? 'text-white border-gray-500 hover:bg-gray-700' : 'text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
          >
            Back
          </button>

          <button
            className="px-5 py-2 text-white bg-emerald-600 rounded hover:bg-emerald-700 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Thankyou;

