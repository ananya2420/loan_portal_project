//Application For Structure
//add react-hook-form
//conditional logic in forms 
//Add progress bar indicator
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setEmployeeDetails } from '../store/formSlice';
//import { toggleTheme } from '../store/themeSlice'; // Adjust path as needed
import ProgressBar from '../components/progressbar';

const EmployeeDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme.theme);
  const savedData = useSelector((state) => state.formData?.employeeDetails);

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: savedData || {},
  });

  const [currentStep] = useState(2);
  const totalSteps = 5;
  const employmentStatus = watch('status');

  const onSubmit = (data) => {
    dispatch(setEmployeeDetails(data));
    navigate('/apply/loan-details');
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 transition-all duration-300 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
    }`}>
      <div className="w-full max-w-md">
        {/* Theme Toggle and Progress Bar */}
        <div className="flex justify-between items-center mb-4">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          <button
            onClick={handleToggleTheme}
            className="ml-4 px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
          >
            Toggle Theme
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`shadow-lg rounded-lg p-8 w-full space-y-4 transition-all duration-300 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-2xl font-bold text-center mb-4">
            Employment Details
          </h2>

          {/* Company Name */}
          <div>
            <input
              placeholder="Company Name"
              {...register('company', { required: "Company name is required" })}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
            )}
          </div>

          {/* Employment Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Employment Status</label>
            <select
              {...register('status', { required: "Employment status is required" })}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">Select Status</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="self-employed">Self-employed</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
            )}
          </div>

          {/* Monthly Income */}
          <div>
            <input
              type="number"
              placeholder="Monthly Income"
              {...register('income', {
                required: "Income is required",
                valueAsNumber: true
              })}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            {errors.income && (
              <p className="text-red-500 text-sm mt-1">{errors.income.message}</p>
            )}
          </div>

          {/* Tax ID if Self-Employed */}
          {employmentStatus === 'self-employed' && (
            <div>
              <input
                placeholder="Tax ID"
                {...register('taxId', {
                  required: "Tax ID is required for self-employed individuals"
                })}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              {errors.taxId && (
                <p className="text-red-500 text-sm mt-1">{errors.taxId.message}</p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeDetails;
