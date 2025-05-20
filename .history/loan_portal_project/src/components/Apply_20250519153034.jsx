//pages and routes
//Apply component-redirect to- Review page
//use React-hook-form

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';
import { setPersonalInfo, setLoanDetails, setEmployeeDetails } from '../redux/slices/formSlice';

const Apply = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);
  const formData = useSelector((state) => state.formData);

  const [step, setStep] = useState(1);

  const onSubmit = (data) => {
    if (step === 1) {
      dispatch(setPersonalInfo(data));
      setStep(2);
      navigate('/apply/personal-info');
    } else if (step === 2) {
      dispatch(setEmployeeDetails(data));
      setStep(3);
      navigate('/apply/employee-details');
    } else if (step === 3) {
      dispatch(setLoanDetails(data));
      setStep(4);
      navigate('/apply/loan-details');
    } else if (step === 4) {
      setStep(5);
      navigate('/apply/document-updates');
    } else if (step === 5) {
      navigate('/review');
    }
  };

  const isFormComplete = () => {
    return (
      formData.personalInfo?.name &&
      formData.employeeDetails?.status &&   // fix typo here: was "EmployeeDetails"
      formData.loanDetails?.amount &&
      formData.loanDetails?.type
    );
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
      navigate(`/apply/step${step - 1}`);
    }
  };

  if (step === 5 && !isFormComplete()) {
    return <Navigate to="/apply" />;
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-all duration-300 relative ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      {/* Theme toggle button fixed top-right */}
      <button
        onClick={handleToggleTheme}
        className="fixed top-4 right-4 z-50 px-3 py-1 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition"
      >
        Toggle Theme
      </button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`max-w-md w-full p-6 shadow-md rounded-lg transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-center text-red-800 dark:text-red-300">
            Loan Application form
          </h1>
        </div>

        {step === 1 && (
          <div className="mb-4">
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Full Name
            </label>
            <input
              type="text"
              {...register('name', { required: 'Full name is required' })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-black'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="mb-4">
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Employment Status
            </label>
            <select
              {...register('status', { required: 'Employment status is required' })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-black'
              }`}
            >
              <option value="">Select status</option>
              <option value="employed">Employed</option>
              <option value="self-employed">Self-employed</option>
              <option value="unemployed">Unemployed</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
            )}
          </div>
        )}

        {step === 3 && (
          <>
            <div className="mb-4">
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                Loan Amount
              </label>
              <input
                type="number"
                {...register('amount', {
                  required: 'Loan amount is required',
                  min: { value: 1000, message: 'Minimum amount is 1000' },
                })}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-black'
                }`}
                placeholder="Enter loan amount"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                Loan Type
              </label>
              <select
                {...register('type', { required: 'Loan type is required' })}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-black'
                }`}
              >
                <option value="">Select loan type</option>
                <option value="personal">Personal Loan</option>
                <option value="home">Home Loan</option>
                <option value="auto">Auto Loan</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
              )}
            </div>
          </>
        )}

        {step === 4 && (
          <div className="mb-4">
            <p className="text-center text-gray-600 dark:text-gray-300">
              Please upload or verify your documents on the next page.
            </p>
          </div>
        )}

        <div className="flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={goBack}
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
            >
              Back
            </button>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            {step === 5 ? 'Submit Application' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Apply;
