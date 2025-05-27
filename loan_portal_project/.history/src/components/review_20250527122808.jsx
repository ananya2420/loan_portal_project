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
    watch,
  } = useForm({
    defaultValues: {
      confirmation: confirmation || false,
    },
  });

  const confirmationChecked = watch('confirmation');

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

  const currentStep = 7;

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      {/* Toggle Theme Button */}
      <div className="w-full max-w-md flex justify-end mb-6">
        <button
          onClick={handleThemeToggle}
          className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
        >
          Toggle Theme
        </button>
      </div>

      {/* Step Tracker */}
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
          <div <div
                key={stepLabel}
                
            <span>
              className={`w-7 h-7 flex items-center justify-center rounded-full font-bold ${
                step === currentStep ? 'bg-emerald-600 text-white' : 'bg-gray-300 text-gray-600'
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
              Step 7 of 8
            </span>
            <span className="text-xs font-semibold text-green-700">70%</span>
          </div>
          <div className="flex h-2 overflow-hidden text-xs bg-green-200 rounded">
            <div
              style={{ width: '70%' }}
              className="flex flex-col justify-center text-center text-white transition-all duration-500 bg-green-600 shadow-none whitespace-nowrap"
            />
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div
        className={`p-8 rounded-lg shadow-md w-full max-w-md text-center transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h1 className="mb-4 text-3xl font-bold text-black-600">Review and Confirm</h1>

        <p className="mb-6 text-lg text-indigo-600 dark:text-indigo-400">
          Please confirm the accuracy of your details.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="w-5 h-5 text-pink-600 form-checkbox"
                {...register('confirmation')}
              />
              <span className="ml-2 text-yellow-700 dark:text-yellow-400">
                I confirm that all information provided is correct.
              </span>
            </label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className={`px-6 py-2 font-semibold text-white rounded-lg transition duration-300 ${
                confirmationChecked
                  ? 'bg-emerald-500 hover:bg-emerald-600'
                  : 'bg-emerald-300 cursor-not-allowed'
              }`}
              disabled={!confirmationChecked || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Confirm and Submit'}
            </button>
          </div>
        </form>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleBack}
            className={`px-4 py-2 rounded transition border ${
                theme === 'dark' ? 'text-white border-gray-500 hover:bg-gray-700' : 'text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;





