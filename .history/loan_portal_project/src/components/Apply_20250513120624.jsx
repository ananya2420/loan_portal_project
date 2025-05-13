//pages and routes
//Apply component-redirect to- Review page
//use React-hook-form

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Apply = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    navigate('/apply/personal-info');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10"
    >
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Welcome to the Loan Application
      </h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          {...register('name', { required: 'Full name is required' })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Enter your full name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Start Application
      </button>
    </form>
  );
};

export default Apply;

