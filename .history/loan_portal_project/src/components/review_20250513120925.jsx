//pages and routes
//reiew - redirect to- thank-you page
//use react-hook-form

import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-router-dom';

const Review = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Review and Confirm
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Please review your application and confirm to proceed.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-sm text-gray-800 mb-6">
          <p><strong>Name:</strong> Gourab</p>
          <p><strong>Email:</strong> aborty@gmail.com</p>
          <p><strong>Company:</strong> TechCorp</p>
          <p><strong>Loan Amount:</strong> 200,000</p>
          <p><strong>Loan Type:</strong> Home Loan</p>
        </div>

        <Form method="post" className="space-y-6">
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="confirm"
                className="form-checkbox h-5 w-5 text-blue-600"
                required
              />
              <span className="ml-2 text-gray-700">
                I confirm that all the provided information is correct.
              </span>
            </label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              Confirm and Submit
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Review;
