//Application For Structure
//add  react hook form 
//add form  progress bar

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoanDetails } from '../store/formSlice';
import { toggleTheme } from '../store/themeSlice'; // Import theme action
import ProgressBar from '../components/progressbar';

const LoanDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loanDetails = useSelector((state) => state.formData?.loanDetails || {});
  const theme = useSelector((state) => state.theme.theme); // Access Redux theme

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: loanDetails });

  const [currentStep] = useState(3);
  const totalSteps = 5;

  const onSubmit = (data) => {
    dispatch(setLoanDetails(data));
    navigate('/apply/document-updates');
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div className="w-full max-w-md">
        {/* Progress Bar + Theme Toggle */}
        <div className="flex justify-between items-center mb-4">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          <button
            onClick={handleToggleTheme}
            className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
          >
            Toggle Theme
          </button>
        </div>

        {/* Loan Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`rounded-lg shadow-md p-8 w-full space-y-4 transition ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-2xl font-bold text-center mb-4">Loan Details</h2>

          {/* Loan Amount */}
          <div>
            <input
              type="number"
              placeholder="Loan Amount"
              {...register('amount', { required: 'Loan amount is required' })}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
            )}
          </div>

          {/* Loan Type */}
          <div>
            <input
              placeholder="Loan Type"
              {...register('type', { required: 'Loan type is required' })}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanDetails;
