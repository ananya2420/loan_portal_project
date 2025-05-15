//Application For Structure
//add  react hook form 

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/progressbar';

const PersonalInformation = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', dob: '', phone: '', email: '' }, // Provide empty values to prevent pre-filling
  });

  const onSubmit = (data) => {
    setUserData((prev) => ({ ...prev, personalInfo: data }));
    navigate('/apply/employee-details');
  };
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="w-full max-w-md p-8 space-y-4 rounded-lg shadow-lg">
        <ProgressBar currentStep={1} totalSteps={5} />
        <h2 className="mb-4 text-2xl font-bold text-center">Personal Information</h2>

        <input placeholder="Full Name" {...register('name', { required: 'Full Name is required' })} className="w-full px-4 py-2 border border-gray-300 rounded" />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}

        <input type="date" {...register('dob', { required: 'Date of Birth is required' })} className="w-full px-4 py-2 border border-gray-300 rounded" />
        {errors.dob && <p className="text-sm text-red-500">{errors.dob.message}</p>}

        <input placeholder="Phone Number" {...register('phone', { required: 'Phone Number is required' })} className="w-full px-4 py-2 border border-gray-300 rounded" />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}

        <input type="email" placeholder="Email" {...register('email', { required: 'Email is required' })} className="w-full px-4 py-2 border border-gray-300 rounded" />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

        <button type="submit" className="w-full py-2 text-white bg-blue-600 rounded">Next</button>
      </form>
    </div>
  );
};

export default PersonalInformation; 
