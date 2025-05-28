import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';
import {
  setPersonalInfo,
  setLoanDetails,
  setEmployeeDetails,
} from '../redux/slices/formSlice';

const Apply = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useSelector((state) => state.theme.theme);
  const formData = useSelector((state) => state.formData);

  const [step, setStep] = useState(1);

  // Map URLs to steps
  const pathnameToStep = {
    '/apply': 1,
    '/apply/personal-info': 2,
    '/apply/employee-details': 3,
    '/apply/loan-details': 4,
    '/apply/document-updates': 5,
    '/apply/summary': 6,
    '/apply/review': 7,
    '/thank-you': 8,
  };

  // Sync step state when location changes
  useEffect(() => {
    const newStep = pathnameToStep[location.pathname];
    if (newStep && newStep !== step) {
      setStep(newStep);
    }
  }, [location.pathname]);

  const onSubmit = (data) => {
    if (step === 1) {
      dispatch(setPersonalInfo(data));
      navigate('/apply/personal-info');
    } else if (step === 2) {
      dispatch(setEmployeeDetails(data));
      navigate('/apply/employee-details');
    } else if (step === 3) {
      dispatch(setLoanDetails(data));
      navigate('/apply/loan-details');
    } else if (step === 4) {
      navigate('/apply/document-updates');
    } else if (step === 5) {
      navigate('/apply/summary');
    } else if (step === 6) {
      navigate('/apply/review');
    } else if (step === 7) {
      navigate('/thank-you');
    }
  };

  const isFormComplete = () => {
    return (
      formData.personalInfo?.name &&
      formData.EmployeeDetails?.status &&
      formData.loanDetails?.amount &&
      formData.loanDetails?.type
    );
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const goBack = () => {
    if (step === 1) {
      navigate('/');
    } else {
      const stepRoutes = [
        '/', // 0
        '/apply', // 1
        '/apply/personal-info', // 2
        '/apply/employee-details', // 3
        '/apply/loan-details', // 4
        '/apply/document-updates', // 5
        '/apply/summary', // 6
        '/apply/review', // 7
      ];
      navigate(stepRoutes[step - 1] || '/apply');
    }
  };

 

  const steps = [
    { step: 1, label: 'Apply', path: '/apply' },
    { step: 2, label: <>Personal<br />Info</>, path: '/apply/personal-info' },
    { step: 3, label: <>Employee<br />Details</>, path: '/apply/employee-details' },
    { step: 4, label: <>Loan<br />Details</>, path: '/apply/loan-details' },
    { step: 5, label: <>Document<br />Updates</>, path: '/apply/document-updates' },
    { step: 6, label: 'Summary', path: '/apply/summary' },
    { step: 7, label: 'Review', path: '/apply/review' },
    { step: 8, label: 'Thank You', path: '/thank-you' },
  ];

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div className="w-full max-w-md">
        {/* Top Row: Toggle Theme Button */}
        <div className="w-full flex justify-end mb-6">
          <button
            onClick={handleToggleTheme}
            className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
          >
            Toggle Theme
          </button>
        </div>

        {/* Step Tracker */}
        <div className="mb-6 grid grid-cols-8 gap-2 text-xs font-semibold text-center">
          {steps.map(({ step: s, label, path }) => (
            <div
              key={s}
              className="flex flex-col items-center col-span-1 cursor-pointer"
              onClick={() => {
                setStep(s);
                navigate(path);
              }}
            >
              <span
                className={`w-7 h-7 flex items-center justify-center rounded-full font-bold ${
                  s === step ? 'bg-emerald-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {s}
              </span>
              <span className="mt-1 truncate" title={typeof label === 'string' ? label : undefined}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="relative pt-1 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-teal-600 uppercase bg-teal-200 rounded-full">
              Step {step} of 8
            </span>
            <span className="text-xs font-semibold text-teal-600">{Math.floor((step / 8) * 100)}%</span>
          </div>
          <div className="flex h-2 overflow-hidden text-xs bg-teal-200 rounded">
            <div
              style={{ width: `${(step / 8) * 100}%` }}
              className="flex flex-col justify-center text-center text-white transition-all duration-500 bg-green-500 shadow-none whitespace-nowrap"
            />
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`p-8 rounded-lg shadow-md transition-all duration-300 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h1 className={`text-2xl font-bold mb-4 text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Loan Application
          </h1>

          <div className="mb-4">
            <p className={`text-lg text-center ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
              Loan Application Form
            </p>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={goBack}
              className={`border border-gray-300 px-4 py-2 rounded transition ${
                theme === 'dark'
                  ? 'text-white hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
            >
              {step === 7 ? 'Submit' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Apply;
