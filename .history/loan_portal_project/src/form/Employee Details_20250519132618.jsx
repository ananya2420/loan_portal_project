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
    defaultValues: savedData || {},
  });

  const [currentStep] = useState(2); // Step 2 of 5
  const totalSteps = 5;
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
      className={`min-h-screen flex items-center justify-center px-4 py-8 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div className="w-full max-w-4xl mx-auto space-y-6">
        {/* Progress and Theme Toggle */}
        <div className="flex items-center justify-between">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          <button
            onClick={handleToggleTheme}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded hover:bg-indigo-600"
          >
            Toggle Theme
          </button>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className={`rounded-lg shadow-md px-8 py-6 space-y-5 transition duration-300 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-2xl font-semibold text-center mb-4">Employment Details</h2>

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

          {/* Tax ID (if self-employed) */}
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
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 text-white bg-gray-400 rounded hover:bg-gray-500 transition duration-300"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-3 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300"
            >
              {currentStep === totalSteps ? 'Submit' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeDetails;

