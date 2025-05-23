import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';

const PersonalInformation = ({ setUserData, userData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const shouldReset = location.state?.reset;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: shouldReset
      ? { name: '', dob: '', phone: '', email: '' }
      : userData,
  });

  const onSubmit = (data) => {
    setUserData((prev) => ({ ...prev, ...data }));
    navigate('/apply/employee-details'); // Next step
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow rounded max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold">Personal Information</h2>

      <div>
        <input placeholder="Full Name" {...register('name', { required: 'Required' })} className="w-full border p-2 rounded" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <input type="date" {...register('dob', { required: 'Required' })} className="w-full border p-2 rounded" />
        {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
      </div>

      <div>
        <input placeholder="Phone Number" {...register('phone', { required: 'Required' })} className="w-full border p-2 rounded" />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
      </div>

      <div>
        <input type="email" placeholder="Email" {...register('email', { required: 'Required' })} className="w-full border p-2 rounded" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div className="flex justify-between mt-4">
        <button type="button" onClick={() => navigate('/apply')} className="px-4 py-2 bg-gray-500 text-white rounded">
          Back
        </button>
        <button type="submit" disabled={!isValid} className="px-4 py-2 bg-blue-600 text-white rounded">
          Next
        </button>
      </div>
    </form>
  );
};

export default PersonalInformation;


