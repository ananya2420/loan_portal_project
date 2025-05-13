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

  const onSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    navigate('/thank-you'); // Navigate to thank-you page after form submission
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Review and Confirm
      </h1>
      <p className="text-lg text-gray-600 mb-6">Summary of your input</p>

      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
          <p><strong>Name:</strong> Gourab</p>
          <p><strong>Date of birth:</strong> 2000-03-08</p>
          <p><strong>Phone number:</strong> 01700..</p>
          <p><strong>Email address:</strong> aborty@gmail.com</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Employee Details</h3>
          <p><strong>Status:</strong> Full-time</p>
          <p><strong>Company:</strong> TechCorp</p>
          <p><strong>Income:</strong> 40000</p>
          <p><strong>Experience:</strong> 5 years</p>
          <p><strong>Tax ID:</strong> TX123456</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Loan Details</h3>
          <p><strong>Loan Amount:</strong> 200000</p>
          <p><strong>Loan Type:</strong> Home Loan</p>
          <p><strong>Term:</strong> 10 years</p>
          <p><strong>EMI Date:</strong> 5th of every month</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Document Updates</h3>
          <p><strong>Documents Updated:</strong> Yes</p>
        </div>

        {/* Confirmation checkbox */}
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

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={onSubmit}
            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Confirm and Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
