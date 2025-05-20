import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//import { saveDocumentData } from './actions';
//import {saveDocumentData} from '../redux/slices/formSlice'
// {saveDocumentUpdates} from '../redux/slices/formSlice';

const DocumentUpdates = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    dispatch(saveDocumentData(data)); // save data in Redux
    navigate('/apply/summary');
  };

  const handleBack = () => {
    navigate('/apply/loan-details');
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      {/* 8-step Indicator */}
      <div className="flex justify-between max-w-md mx-auto mb-6 px-4 w-full">
        {[
          'Personal Info',
          'Employee Details',
          'Loan Details',
          'Document Updates',
          'Summary',
          'Review',
          'Thank You',
          'Final Step',
        ].map((label, index) => {
          const stepNumber = index + 1;
          const isActive = label === 'Document Updates';

          return (
            <div key={label} className="flex flex-col items-center w-1/8">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1
                  ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}
              >
                {stepNumber}
              </div>
              <div className={`text-xs text-center ${isActive ? 'font-bold text-blue-600' : 'text-gray-600'}`}>
                {label}
              </div>
            </div>
          );
        })}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`p-8 rounded-lg shadow-md w-full max-w-md text-center transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h1 className="text-3xl font-bold mb-6">Document Updates</h1>

        {/* Loan Amount Input */}
        <div className="text-left">
          <label htmlFor="loanAmount" className="block text-gray-700 font-semibold mb-2">
            Loan Amount
          </label>
          <input
            type="number"
            id="loanAmount"
            placeholder="Enter Loan Amount"
            {...register('loanAmount', { required: 'Loan amount is required' })}
            className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-black'
            }`}
          />
          {errors.loanAmount && (
            <p className="text-sm text-red-500 mt-1">{errors.loanAmount.message}</p>
          )}
        </div>

        {/* Loan Type Select */}
        <div className="text-left mt-4">
          <label htmlFor="loanType" className="block text-gray-700 font-semibold mb-2">
            Loan Type
          </label>
          <select
            id="loanType"
            {...register('loanType', { required: 'Loan type is required' })}
            className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-black'
            }`}
          >
            <option value="">Select a type</option>
            <option value="Home Loan">Home Loan</option>
            <option value="Auto Loan">Auto Loan</option>
          </select>
          {errors.loanType && (
            <p className="text-sm text-red-500 mt-1">{errors.loanType.message}</p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Submit Documents
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentUpdates;
