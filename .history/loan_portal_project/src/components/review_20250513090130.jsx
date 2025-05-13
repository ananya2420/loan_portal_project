//pages and routes
//reiew - redirect to- thank-you page
//use react-hook-form

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Review = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = () => {
    navigate('/thank-you');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Review and Confirm
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Please review your application and confirm to proceed.
        </p>

        {/* Simulated Summary Block (replace with actual userData) */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-sm text-gray-800 mb-6">
          <p><strong>Name:</strong> Gourab</p>
          <p><strong>Email:</strong> aborty@gmail.com</p>
          <p><strong>Company:</strong> TechCorp</p>
          <p><strong>Loan Amount:</strong> 200,000</p>
          <p><strong>Loan Type:</strong> Home Loan</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                {...register('confirm', { required: true })}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">
                I confirm that all the provided information is correct.
              </span>
            </label>
            {errors.confirm && (
              <p className="text-red-500 text-sm mt-2">
                You must confirm before submitting.
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              Confirm and Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Review;
