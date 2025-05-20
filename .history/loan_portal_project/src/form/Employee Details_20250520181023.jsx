//Application For Structure
//add react-hook-form
//conditional logic in forms 
//Add progress bar indicator

// employee-details
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setEmployeeDetails } from '../redux/slices/formSlice';

const EmployeeDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    dispatch(setEmployeeDetails(data));
    navigate('/apply/loan-details');
  };

  const handleBack = () => {
    navigate('/apply/personal-info');
  };

  const steps = [
    'Apply',
    'Personal Info',
    'Employee Details',
    'Loan Details',
    'Document Updates',
    'Review',
  ];

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      {/* Step Labels */}
      <div className="w-full max-w-md mb-6 flex justify-between text-sm font-semibold text-center">
        {steps.map((label, index) => {
          const isCurrentStep = index === 2;
          return (
            <div key={index} className="flex flex-col items-center w-full">
              <span
                className={`rounded-full w-7 h-7 flex items-center justify-center mb-1 ${
                  isCurrentStep
                    ? 'bg-blue-600 text-white font-bold'
                    : 'border border-gray-400 text-gray-600'
                }`}
              >
                {index}
              </span>
              <span
                className={`text-xs ${
                  isCurrentStep ? 'text-blue-600 font-semibold' : 'text-gray-600'
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`p-8 rounded-lg shadow-md w-full max-w-md transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h2 className="mb-4 text-2xl font-bold text-center">Employee Details</h2>

        {/* Company Name */}
        <div className="text-left mt-4">
          <label htmlFor="company" className="block text-sm font-medium mb-1">
            Company Name
          </label>
          <input
            id="company"
            placeholder="Company Name"
            {...register('company', { required: 'Company name is required' })}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-black'
            }`}
          />
          {errors.company && <p className="text-sm text-red-500 mt-1">{errors.company.message}</p>}
        </div>

        {/* Job Title */}
        <div className="text-left mt-4">
          <label htmlFor="jobTitle" className="block text-sm font-medium mb-1">
            Job Title
          </label>
          <input
            id="jobTitle"
            placeholder="Job Title"
            {...register('jobTitle', { required: 'Job title is required' })}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-black'
            }`}
          />
          {errors.jobTitle && <p className="text-sm text-red-500 mt-1">{errors.jobTitle.message}</p>}
        </div>

        {/* Years of Experience */}
        <div className="text-left mt-4">
          <label htmlFor="experience" className="block text-sm font-medium mb-1">
            Years of Experience
          </label>
          <input
            id="experience"
            type="number"
            placeholder="Years of Experience"
            {...register('experience', { required: 'Experience is required' })}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-black'
            }`}
          />
          {errors.experience && <p className="text-sm text-red-500 mt-1">{errors.experience.message}</p>}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleBack}
            className="w-1/3 p-3 rounded font-semibold text-gray-700 border border-gray-400 hover:bg-gray-200 transition"
          >
            Back
          </button>
          <button
            type="submit"
            className={`w-1/3 p-3 rounded font-semibold text-white transition ${
              isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeDetails;



