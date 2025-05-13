//Application For Structure
//add  react hook form 

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const PersonalInformation = ({ userData, setUserData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: userData.personalInfo || {} // Use existing data as default
  });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setUserData((prev) => ({ ...prev, personalInfo: data }));
    navigate('/apply/employee-details');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Personal Information
        </h2>

        {/* Full Name Input */}
        <div>
          <input
            name="name"
            placeholder="Full Name"
            {...register('name', { required: "Full Name is required" })}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Date of Birth Input */}
        <div>
          <input
            name="dob"
            type="date"
            {...register('dob', { required: "Date of Birth is required" })}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.dob && (
            <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
          )}
        </div>

        {/* Phone Number Input */}
        <div>
          <input
            name="phone"
            placeholder="Phone Number"
            {...register('phone', { required: "Phone Number is required" })}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            {...register('email', { required: "Email is required", pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
              message: "Invalid email address"
            } })}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
  );
};

export default PersonalInformation;



