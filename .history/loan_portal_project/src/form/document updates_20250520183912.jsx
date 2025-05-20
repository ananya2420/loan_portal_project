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

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Document Updates</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Loan Amount Input */}
        <div>
          <label htmlFor="loanAmount" className="block text-gray-800 font-semibold mb-2">
            Loan Amount
          </label>
          <input
            type="number"
            id="loanAmount"
            placeholder="Enter Loan Amount"
            {...register('loanAmount', { required: 'Loan amount is required' })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.loanAmount && (
            <p className="text-red-600 text-sm mt-1">{errors.loanAmount.message}</p>
          )}
        </div>

        {/* Loan Type Select */}
        <div>
          <label htmlFor="loanType" className="block text-gray-800 font-semibold mb-2">
            Loan Type
          </label>
          <select
            id="loanType"
            {...register('loanType', { required: 'Loan type is required' })}
            className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a type</option>
            <option value="Home Loan">Home Loan</option>
            <option value="Auto Loan">Auto Loan</option>
          </select>
          {errors.loanType && (
            <p className="text-red-600 text-sm mt-1">{errors.loanType.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md shadow-md transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400"
          >
            Submit Documents
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentUpdates;



