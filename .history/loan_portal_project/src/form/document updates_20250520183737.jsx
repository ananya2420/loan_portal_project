import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const DocumentUpdates = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Submitted Data:', data);
    // After form submission, navigate to the summary page
    navigate('/apply/summary', { state: { formData: data } }); // Passing data as state to the summary page
  };

  // 8 steps labels
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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">

      {/* 8 Steps Progress Bar */}
      <div className="flex justify-between max-w-md mx-auto mb-6 px-4 w-full">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = index === 4; // Document Updates is step 5 (index 4)
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

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Document Updates</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Loan Amount Input */}
        <div>
          <label htmlFor="loanAmount" className="block text-gray-700 font-semibold mb-2">
            Loan Amount
          </label>
          <input
            type="number"
            id="loanAmount"
            placeholder="Enter Loan Amount"
            {...register('loanAmount', { required: 'Loan amount is required' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.loanAmount && (
            <p className="text-red-500 text-sm mt-1">{errors.loanAmount.message}</p>
          )}
        </div>

        {/* Loan Type Select */}
        <div>
          <label htmlFor="loanType" className="block text-gray-700 font-semibold mb-2">
            Loan Type
          </label>
          <select
            id="loanType"
            {...register('loanType', { required: 'Loan type is required' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a type</option>
            <option value="Home Loan">Home Loan</option>
            <option value="Auto Loan">Auto Loan</option>
          </select>
          {errors.loanType && (
            <p className="text-red-500 text-sm mt-1">{errors.loanType.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit Documents
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentUpdates;




