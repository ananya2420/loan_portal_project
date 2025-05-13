//Application For Structure
//show a read only summary of all user input with edts otion ad final submission
//react-hook-form 
//add progress bar

//Application For Structure


// src/pages/Summery.jsx

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
//import { toggleTheme, setTheme } from '../redux/slices/themeSlice';
import { toggleTheme } from '../'
import ThemeToggle from '../components/ThemeToggle';
import ProgressBar from '../components/progressbar';

const Summery = ({ userData, onEdit, onSubmit, mode }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const { personalInfo, EmployeeDetails = {}, loanDetails = {}, DocumentUpdates = {} } = userData;

  const totalSteps = 5;
  const completedSteps = [
    personalInfo?.name,
    EmployeeDetails?.status,
    loanDetails?.amount,
    DocumentUpdates?.isUpdated,
  ].filter(Boolean).length;
  const progress = (completedSteps / totalSteps) * 100;

  // Apply and persist theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: personalInfo,
  });

  const submitUpdatedInfo = (data) => {
    console.log('Updated Personal Info:', data);
    onSubmit(data);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg shadow-md space-y-6">
      {/* Theme Toggle */}
      <div className="text-right">
        <ThemeToggle />
      </div>

      {/* Progress Bar */}
      <ProgressBar progress={progress} totalSteps={totalSteps} />

      <h2 className="text-2xl font-bold text-center mb-4">User Summary</h2>

      {mode === 'edit' ? (
        <form onSubmit={handleSubmit(submitUpdatedInfo)} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg space-y-4">
          <h3 className="text-xl font-semibold">Edit Personal Information</h3>

          {/* Name */}
          <div>
            <label className="block font-medium">Name</label>
            <input {...register('name', { required: 'Name is required' })} className="w-full border rounded p-2" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* DOB */}
          <div>
            <label className="block font-medium">Date of Birth</label>
            <input type="date" {...register('dob', { required: 'DOB is required' })} className="w-full border rounded p-2" />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium">Phone</label>
            <input type="tel" {...register('phone', { required: 'Phone is required' })} className="w-full border rounded p-2" />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium">Email</label>
            <input type="email" {...register('email', { required: 'Email is required' })} className="w-full border rounded p-2" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="flex justify-center gap-4">
            <button type="button" onClick={onEdit} className="px-5 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save</button>
          </div>
        </form>
      ) : (
        <>
          {/* View Mode Sections */}
          <section className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
            <p><strong>Name:</strong> {personalInfo?.name}</p>
            <p><strong>Date of Birth:</strong> {personalInfo?.dob}</p>
            <p><strong>Phone:</strong> {personalInfo?.phone}</p>
            <p><strong>Email:</strong> {personalInfo?.email}</p>
          </section>

          <section className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Employee Details</h3>
            <p><strong>Status:</strong> {EmployeeDetails?.status || 'N/A'}</p>
            <p><strong>Company:</strong> {EmployeeDetails?.company || 'N/A'}</p>
            <p><strong>Income:</strong> {EmployeeDetails?.income || 'N/A'}</p>
            <p><strong>Experience:</strong> {EmployeeDetails?.experience || 'N/A'}</p>
            <p><strong>Tax ID:</strong> {EmployeeDetails?.taxId || 'N/A'}</p>
          </section>

          <section className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Loan Details</h3>
            <p><strong>Amount:</strong> {loanDetails?.amount || 'N/A'}</p>
            <p><strong>Type:</strong> {loanDetails?.type || 'N/A'}</p>
            <p><strong>Term:</strong> {loanDetails?.term || 'N/A'}</p>
            <p><strong>EMI Date:</strong> {loanDetails?.emiDate || 'N/A'}</p>
          </section>

          <section className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Document Update</h3>
            <p><strong>ID Status:</strong> {DocumentUpdates?.isUpdated ? 'Updated' : 'Pending'}</p>
          </section>

          <div className="flex justify-center gap-4 mt-6">
            <button onClick={onEdit} className="px-5 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
            <button onClick={onSubmit} className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700">Submit</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Summery;
