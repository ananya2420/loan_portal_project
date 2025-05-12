//Application For Structure


import React from 'react';
import { useForm } from 'react-hook-form';

const LoanDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-6 text-center">Loan Details</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Loan Amount */}
        <div>
          <label className="block mb-1 font-medium">Loan Amount</label>
          <input
            type="text"
            {...register('LoanAmount', { required: 'Loan amount is required' })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
          {errors.LoanAmount && (
            <p className="text-red-500 text-sm mt-1">{errors.LoanAmount.message}</p>
          )}
        </div>

        {/* Loan Type */}
        <div>
          <label className="block mb-1 font-medium">Loan Type</label>
          <select
            {...register('LoanType', { required: 'Loan type is required' })}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">-- Select --</option>
            <option value="personal-loan">Personal Loan</option>
            <option value="home-loan">Home Loan</option>
            <option value="official-loan">Official Loan</option>
          </select>
          {errors.LoanType && (
            <p className="text-red-500 text-sm mt-1">{errors.LoanType.message}</p>
          )}
        </div>

        {/* Repayment Term */}
        <div>
          <label className="block mb-1 font-medium">Repayment Term</label>
          <select
            {...register('RepaymentTerm', { required: 'Repayment term is required' })}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">-- Select --</option>
            <option value="10000">10,000</option>
            <option value="12000">12,000</option>
          </select>
          {errors.RepaymentTerm && (
            <p className="text-red-500 text-sm mt-1">{errors.RepaymentTerm.message}</p>
          )}
        </div>

        {/* EMI Date */}
        <div>
          <label className="block mb-1 font-medium">EMI Date</label>
          <select
            {...register('EMIDate', { required: 'EMI date is required' })}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">-- Select --</option>
            <option value="6.5.25">6.5.25</option>
            <option value="8.5.25">8.5.25</option>
          </select>
          {errors.EMIDate && (
            <p className="text-red-500 text-sm mt-1">{errors.EMIDate.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoanDetails;
