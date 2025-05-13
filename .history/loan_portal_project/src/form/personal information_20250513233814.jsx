//Application For Structure
//add  react hook form 
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/progressbar';

const PersonalInformation = ({ userData, setUserData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: userData.personalInfo || {},  // Set default values
  });

  const navigate = useNavigate();

  const currentStep = 1;
  const totalSteps = 5;

  const onSubmit = (data) => {
    console.log('Form Data:', data);  // Log form data for debugging
    setUserData((prev) => ({ ...prev, personalInfo: data })); // Store data in the parent state
    navigate('/apply/employee-details'); // Navigate to the next step (Employee Details)
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-lg rounded-lg p-8 w-full max-w-md space-y-4"
      >
        <div className="flex justify-between items-center">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        <h2 className="text-2xl font-bold text-center mb-4">Personal Information</h2>

        {/* Full Name */}
        <div>
          <input
            placeholder="Full Name"
            {...register('name', { required: 'Full Name is required' })}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Date of Birth */}
        <div>
          <input
            type="date"
            {...register('dob', { required: 'Date of Birth is required' })}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <input
            placeholder="Phone Number"
            {...register('phone', { required: 'Phone Number is required' })}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: 'Invalid email address',
              },
            })}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
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
