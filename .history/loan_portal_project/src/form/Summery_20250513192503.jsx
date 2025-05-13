//Application For Structure
//show a read only summary of all user input with edts otion ad final submission
//react-hook-form 
//add progress bar

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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Review and Confirm
      </h1>
      <p className="text-lg text-gray-600 mb-6">Summary of user input</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('confirm', { required: true })}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">I confirm that all information provided is correct.</span>
          </label>
          {errors.confirm && (
            <p className="text-red-500 text-sm mt-2">You must confirm before submitting.</p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Confirm and Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Review;