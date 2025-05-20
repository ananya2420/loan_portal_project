//Application For Structure
//add  react hook form 
//add form  progress bar

import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoanDetails } from '../store/formSlice';
import { toggleTheme } from '../redux/slices/themeSlice';

const LoanDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme.theme);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {}, // No saved values, fresh form
  });

  const onSubmit = (data) => {
    dispatch(setLoanDetails(data));
    navigate('/apply/document-updates');
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleBack = () => {
    navigate('/apply/employee-details');
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div className="max-w-4xl mx-auto mt-8 w-full">
        {/* Theme Toggle */}
        <div className="flex items-center justify-end mb-4">
          <button
            onClick={handleToggleTheme}
            className="px-3 py-1 text-sm text-white transition bg-indigo-500 rounded hover:bg-indigo-600"
          >
            Toggle Theme
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className={`rounded-lg shadow-md p-8 w-full space-y-4 transition-all duration-300 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="mb-4 text-2xl font-bold text-center">Loan Details</h2>

          {/* Loan Amount */}
          <div>
            <input
              type="number"
              placeholder="Loan Amount"
              {...register('amount', { required: 'Loan amount is required' })}
              className="w-full px-4 py-2 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-500">{errors.amount.message}</p>
            )}
          </div>

          {/* Loan Type */}
          <div>
            <input
              placeholder="Loan Type"
              {...register('type', { required: 'Loan type is required' })}
              className="w-full px-4 py-2 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.type && (
              <p className="mt-1 text-sm text-red-500">{errors.type.message}</p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 text-white transition duration-300 bg-gray-400 rounded-lg hover:bg-gray-500"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-3 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanDetails;
