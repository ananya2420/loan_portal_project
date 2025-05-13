//Application For Structure
//add  react hook form 

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
//import ProgressBar from '../components/ProgressBar'; // Import the ProgressBar component
import progres
const LoanDetails = ({ userData, setUserData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: userData.loanDetails || {} // Use existing data as default
  });

  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(3); // Assuming this is the 3rd step in the process
  const totalSteps = 5; // Adjust this according to your total steps

  const onSubmit = (data) => {
    setUserData((prev) => ({ ...prev, loanDetails: data }));
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

