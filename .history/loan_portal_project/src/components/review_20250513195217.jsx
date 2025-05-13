//pages and routes
//reiew - redirect to- thank-you page
//use react-hook-form

//pages and routes
//reiew - redirect to- thank-you page
//use react-hook-form


import React from 'react';
import { useNavigate } from 'react-router-dom';

const Review = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate('/thank-you');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Review and Confirm
      </h1>
      <p className="text-lg text-gray-600 mb-6">Summary of user input</p>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              required
            />
            <span className="ml-2 text-gray-700">I confirm that all information provided is correct.</span>
          </label>
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
