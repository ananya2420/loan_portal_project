//Application For Structure
//show a read only summary of all user input with edts otion ad final submission
//react-hook-form 
//add progress bar

//Application For Structure


// src/pages/Summery.jsx
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ProgressBar from '../components/progressbar';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice'; // Correct import
import ThemeToggle from '../components/ThemeToggle';  // Import ThemeToggle component

const Summery = ({ userData, onEdit, onSubmit, mode }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme); // Get the current theme from the Redux store
  const { personalInfo, EmployeeDetails = {}, loanDetails, DocumentUpdates } = userData;

  // Calculate the progress based on completed sections
  const totalSteps = 5;
  const completedSteps = [
    personalInfo?.name,
    EmployeeDetails?.status,
    loanDetails?.amount,
    DocumentUpdates?.isUpdated,
  ].filter(Boolean).length; // Count non-empty sections
  const progress = (completedSteps / totalSteps) * 100;

  // UseEffect to apply theme changes to the body dynamically
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: personalInfo,
  });

  const submitUpdatedInfo = (data) => {
    console.log('Updated Personal Info:', data);
    onSubmit(data);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      {/* Theme Toggle Button */}
      <div className="mb-4 text-right">
        <ThemeToggle />
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <ProgressBar progress={progress} totalSteps={totalSteps} />
      </div>

      <h2 className="text-2xl font-bold text-center mb-4">User Summary</h2>

      {mode === 'edit' ? (
        <form onSubmit={handleSubmit(submitUpdatedInfo)} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h3 className="text-xl font-semibold">Edit Personal Information</h3>

          {/* Name Input */}
          <div>
            <label className="block font-medium text-gray-700">Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="w-full border rounded p-2"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Date of Birth Input */}
          <div>
            <label className="block font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              {...register('dob', { required: 'DOB is required' })}
              className="w-full border rounded p-2"
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
          </div>

          {/* Phone Input */}
          <div>
            <label className="block font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              {...register('phone', { required: 'Phone number is required' })}
              className="w-full border rounded p-2"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          {/* Email Input */}
          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full border rounded p-2"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={onEdit}
              className="px-5 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div>
          {/* Render the user's personal, employee, loan details, and document updates */}
          {/* (similar to how you did before) */}
        </div>
      )}
    </div>
  );
};

export default Summery;
