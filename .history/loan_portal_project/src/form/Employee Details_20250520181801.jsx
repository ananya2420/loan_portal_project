//Application For Structure
//add react-hook-form
//conditional logic in forms 
//Add progress bar indicator

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setEmployeeDetails } from '../store/formSlice';
import { toggleTheme } from '../redux/slices/themeSlice';
import ProgressBar from '../components/progressbar';

const EmployeeDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme.theme);
  const savedData = useSelector((state) => state.formData?.employeeDetails);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: savedData || {}, // Prefill if saved data exists
  });

  const [currentStep, setCurrentStep] = useState(2); // Step 1-based indexing
  const totalSteps = 8; // Changed to 8 steps
  const employmentStatus = watch('status');

  const onSubmit = (data) => {
    dispatch(setEmployeeDetails(data));
    navigate('/apply/loan-details');
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleBack = () => {
    navigate('/apply/personal-info');
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div className="w-full max-w-md">
        {/* Inline Step Indicator with 8 steps */}
        <div className="mb-6 grid grid-cols-8 gap-2 text-xs font-semibold text-center">
          {[
            { step: 0, label: 'Apply' },
            { step: 1, label: 'Personal Info' },
            { step: 2, label: 'Employee Details' },
            { step: 3, label: 'Loan Details' },
            { step: 4, label: 'Document Updates' },
            { step: 5, label: 'Review' },
            { step: 6, label: 'Approval' },
            { step: 7, label: 'Confirmation' },
          ].map(({ step, label }) => (
            <div key={step} className="flex flex-col items-center col-span-1">
              <span
                className={`w-7 h-7 flex items-center justify-center rounded-full font-bold ${
                  step === currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step}
              </span>
              <span className="mt-1 truncate" title={label}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Theme Toggle and Progress Bar */}
        <div className="flex items-center justify-between mb-4">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          <button
            onClick={handleToggleTheme}
            className="px-3 py-1 ml-4 text-sm text-white transition bg-indigo-500 rounded hover:bg-indigo-600"
          >
            Toggle Theme
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className={`shadow-lg rounded-lg p-8 w-full space-y-4 transition-all duration-300 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="mb-4 text-2xl font-bold text-center">Employment Details</h2>

          {/* Company Name */}
          <div>
            <input
              placeholder="Company Name"
              autoComplete="off"
              {...register('company', { required: 'Company name is required' })}
              className="w-full px-4 py-2 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-500">{errors.company.message}</p>
            )}
          </div>

          {/* Employment Status */}
          <div>
            <label className="block mb-1 text-sm font-medium">Employment Status</label>
            <select
              autoComplete="off"
              {...register('status', { required: 'Employment status is required' })}
              className="w-full px-4 py-2 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Status</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="self-employed">Self-employed</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
            )}
          </div>

          {/* Monthly Income */}
          <div>
            <input
              type="number"
              placeholder="Monthly Income"
              autoComplete="off"
              {...register('income', {
                required: 'Income is required',
                valueAsNumber: true,
              })}
              className="w-full px-4 py-2 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.income && (
              <p className="mt-1 text-sm text-red-500">{errors.income.message}</p>
            )}
          </div>

          {/* Tax ID if Self-Employed */}
          {employmentStatus === 'self-employed' && (
            <div>
              <input
                placeholder="Tax ID"
                autoComplete="off"
                {...register('taxId', {
                  required: 'Tax ID is required for self-employed individuals',
                })}
                className="w-full px-4 py-2 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.taxId && (
                <p className="mt-1 text-sm text-red-500">{errors.taxId.message}</p>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 text-white transition duration-300 bg-gray-400 rounded-lg hover:bg-gray-500"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-3 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeDetails;




