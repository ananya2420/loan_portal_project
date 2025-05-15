import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Summary = ({ userData = {}, onSubmit }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState('view'); // Set to 'view' initially

  const {
    personalInfo = {},
    employeeDetails = {},
    loanDetails = {},
    documentUpdates = {}
  } = userData;

  useEffect(() => {
    console.log('User Data:', userData);
  }, [userData]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: personalInfo });

  const submitUpdatedInfo = (data) => {
    onSubmit(data);
    setStep('view'); // After saving, go back to 'view' mode
  };

  const handleGoToReview = () => {
    navigate('/apply/review');
  };

  if (!personalInfo?.name) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        No user data available. Please complete the form steps before accessing summary.
      </div>
    );
  }
return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center mb-4">User Summary</h2>

      {/* Step 1: View Mode - Show User Summary */}
      {step === 'view' && (
        <>
          <section className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
            <p><strong>Name:</strong> {personalInfo?.name || 'N/A'}</p>
            <p><strong>Date of Birth:</strong> {personalInfo?.dob || 'N/A'}</p>
            <p><strong>Phone:</strong> {personalInfo?.phone || 'N/A'}</p>
            <p><strong>Email:</strong> {personalInfo?.email || 'N/A'}</p>
          </section>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setStep('edit')} // Go to edit mode
              className="px-5 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => setStep('submit')} // Go to submit mode
              className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </>
      )}

      {/* Step 2: Edit Mode - Show Form to Edit Personal Information */}
      {step === 'edit' && (
        <form onSubmit={handleSubmit(submitUpdatedInfo)} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              placeholder="Name"
              {...register('name', { required: 'Name is required' })}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block font-semibold mb-1">Date of Birth</label>
            <input
              placeholder="Date of Birth"
              {...register('dob', { required: 'Date of Birth is required' })}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
          </div>

          <div>
            <label className="block font-semibold mb-1">Phone</label>
            <input
              placeholder="Phone"
              {...register('phone', { required: 'Phone is required' })}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="flex justify-between mt-4">
            <button type="button" onClick={() => setStep('view')} className="px-5 py-2 bg-gray-400 text-white rounded">
              Cancel
            </button>
