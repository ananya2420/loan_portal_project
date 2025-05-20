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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Document Updates</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="loanAmount" className="block mb-2 font-semibold text-gray-700">
            Loan Amount
          </label>
          <input
            id="loanAmount"
            type="number"
            placeholder="Enter Loan Amount"
            {...register('loanAmount', { required: 'Loan amount is required' })}
            className="w-full p-3 border rounded"
          />
          {errors.loanAmount && (
            <p role="alert" className="mt-1 text-sm text-red-600">
              {errors.loanAmount.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="loanType" className="block mb-2 font-semibold text-gray-700">
            Loan Type
          </label>
          <select
            id="loanType"
            {...register('loanType', { required: 'Loan type is required' })}
            className="w-full p-3 border rounded"
          >
            <option value="">Select a type</option>
            <option value="Home Loan">Home Loan</option>
            <option value="Auto Loan">Auto Loan</option>
          </select>
          {errors.loanType && (
            <p role="alert" className="mt-1 text-sm text-red-600">
              {errors.loanType.message}
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Submit Documents
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentUpdates;




