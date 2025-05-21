// LoanDetails.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoanDetails } from '../store/formSlice';
import { toggleTheme } from '../redux/slices/themeSlice';
import ProgressBar from '../components/progressbar';

const LoanDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme.theme);
  const savedData = useSelector((state) => state.formData?.loanDetails);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: savedData || {
      loanAmount: '',
      loanReason: '',
    },
  });

  const [currentStep, setCurrentStep] = useState(3);
  const totalSteps = 8;

  const onSubmit = (data) => {
    dispatch(setLoanDetails(data));
    navigate('/apply/document-updates');
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleBack = () => {
    navigate('/apply/employee-details');
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div className="w-full max-w-md">
        {/* Step Indicator */}
        <div className="mb-6 grid grid-cols-8 gap-2 text-xs font-semibold text-center">
          {[
            { step: 0, label: 'Apply' },
            { step: 1, label: <>Personal<br />Info</> },
            { step: 2, label: <>Employee<br />Details</> },
            { step: 3, label: <>Loan<br />Details</> },
            { step: 4, label: <>Document<br />Updates</> },
            { step: 5, label: 'Summary' },
            { step: 6, label: 'Reiew' },
            { step: 7, label: 'Thank you' },
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
              <span className="mt-1 truncate" title={typeof label === 'string' ? label : undefined}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="w-full max-w-md mx-auto">
          <div className="relative pt-1 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-block px-2 py-1 text-xs font-semibold text-teal-600 uppercase bg-teal-200 rounded-full">
                Step 4 of 8
              </span>
              <span className="text-xs font-semibold text-teal-600">40%</span>
            </div>
            <div className="flex h-2 overflow-hidden text-xs bg-teal-200 rounded">
              <div
                style={{ width: '40%' }}
                className="flex flex-col justify-center text-center text-white transition-all duration-500 bg-green-500 shadow-none whitespace-nowrap"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          <button
            onClick={handleToggleTheme}
            className="px-3 py-1 ml-4 text-sm text-white transition bg-indigo-500 rounded hover:bg-indigo-600"
          >
            Toggle Theme
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className={`shadow-lg rounded-lg p-8 w-full space-y-4 transition-all duration-300 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="mb-4 text-2xl font-bold
