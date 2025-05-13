//Application For Structure
//add  react hook form 
//add form  progress bar

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoanDetails } from '../store/formSlice'; // Import the action to update loan details
import ProgressBar from '../components/progressbar'; // Import the progress bar component

const LoanDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch loan details from the Redux store (persisted data)
  const loanDetails = useSelector((state) => state.formData.loanDetails);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: loanDetails || {}, // Use persisted loan details if available
  });

  const [currentStep] = useState(3); // Assuming this is the 3rd step in the process
  const totalSteps = 5; // Adjust this according to your total steps

  const onSubmit = (data) => {
    // Dispatch the action to store the loan details in Redux
    dispatch(setLoanDetails(data));
    // Navigate to the next page
    navigate('/apply/document-updates');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md">
        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-lg rounded-lg p-8 space-y-4 mt-6"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Loan Details
          </h2>

          {/* Loan Amount Input */}
          <div>
            <input
              name="amount"
              type="number"
              placeholder="Loan Amount"
              {...register('amount', { required: "Loan amount is required" })}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
            )}
          </div>

          {/* Loan Type Input */}
          <div>
            <input
              name="type"
              placeholder="Loan Type"
              {...register('type', { required: "Loan type is required" })}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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


