
//use react-hook-form
//Add progresbar
//Application For Structure


import React from 'react';
import { useForm } from 'react-hook-form';

const DocumentUpdates = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Submitted Data:', data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
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