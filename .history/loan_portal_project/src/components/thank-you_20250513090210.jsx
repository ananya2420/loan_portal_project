//pages and routes
//thank-you  redirect back to the homepage or another page


import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Thankyou = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful }
  } = useForm();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const onSubmit = (data) => {
    console.log('Feedback submitted:', data);
    // Here you could send the feedback to an API
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-16">
      <h1 className="text-4xl font-bold text-center text-green-600 mb-4">Submission Confirmed!</h1>
      <p className="text-lg text-gray-700 text-center mb-6">
        Thank you for your submission. Your form has been successfully processed.
      </p>

      {/* Optional Feedback Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Leave us feedback (optional)</h2>
        <textarea
          {...register('feedback', {
            maxLength: {
              value: 300,
              message: 'Feedback must be under 300 characters'
            }
          })}
          placeholder="Your feedback..."
          className="w-full p-3 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.feedback && (
          <p className="text-red-500 text-sm">{errors.feedback.message}</p>
        )}

        <button
          type="submit"
          className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600 transition mb-4"
        >
          Submit Feedback
        </button>

        {isSubmitSuccessful && (
          <p className="text-green-600 text-sm">Thank you for your feedback!</p>
        )}
      </form>

      <div className="flex justify-center gap-6">
        <button
          onClick={handleGoHome}
          className="bg-blue-500 text-white font-semibold py-2 px-8 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Go Back to Home
        </button>

        <button
          onClick={handleGoToLogin}
          className="bg-green-500 text-white font-semibold py-2 px-8 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Thankyou;
