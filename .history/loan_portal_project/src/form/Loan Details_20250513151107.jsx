//Application For Structure
//add  react hook form 
//add form  progress bar
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoanDetails } from '../store/formSlice';
import ProgressBar from '../components/progressbar';

const LoanDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loanDetails = useSelector((state) => state.formData?.loanDetails || {});

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-lg rounded-lg p-8 space-y-4 mt-6"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Loan Details
          </h2>
          <div>
            <input
              type="number"
              placeholder="Loan Amount"
              {...register('amount', { required: 'Loan amount is required' })}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
            )}
          </div>

          <div>
            <input
              placeholder="Loan Type"
              {...register('type', { required: 'Loan type is required' })}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanDetails;
