import React, { useState } from 'react'; 
import { useForm } from 'react-hook-form';
import { useNavigate, Navigate } from 'react-router-dom';
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
      setStep(6);
      navigate('/apply/summary');
    } else if (step === 6) {
      setStep(7);
      navigate('/apply/review');
    } else if (step === 7) {
      setStep(8);
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
      setStep(step - 1);
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

  if (step === 6 && !isFormComplete()) {
    return <Navigate to="/apply" />;
  }

  const steps = [
    { step: 1, label: 'Apply' },
    { step: 2, label: <>Personal<br />Info</> },
    { step: 3, label: <>Employee<br />Details</> },
    { step: 4, label: <>Loan<br />Details</> },
    { step: 5, label: <>Document<br />Updates</> },
    { step: 6, label: 'Summary' },
    { step: 7, label: 'Review' },
    { step: 8, label: 'Thank You' },
  ];

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-r from-green-50 via-yellow-50 to-orange-50 text-gray-900'
      }`}
    >
      <div className="w-full max-w-md">
        {/* Top Row: Toggle Theme Button */}
        <div className="w-full flex justify-end mb-6">
          <button
            onClick={handleToggleTheme}
            className="text-sm px-3 py-1 bg-emerald-600 text-white rounded shadow-md hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-400 transition"
          >
            Toggle Theme
          </button>
        </div>

        {/* Step Tracker */}
        <div className="mb-6 grid grid-cols-8 gap-2 text-xs font-semibold text-center select-none">
          {steps.map(({ step: s, label }) => (
            <div key={s} className="flex flex-col items-center col-span-1">
              <span
                className={`w-7 h-7 flex items-center justify-center rounded-full font-bold transition-colors duration-300 ${
                  s === step
                    ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-400/50'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {s}
              </span>
              <span
                className="mt-1 truncate text-teal-600"
                title={typeof label === 'string' ? label : undefined}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="relative pt-1 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-amber-700 uppercase bg-amber-300 rounded-full shadow-sm">
              Step {step} of 8
            </span>
            <span className="text-xs font-semibold text-amber-700">{Math.floor((step / 8) * 100)}%</span>
          </div>
          <div className="flex h-2 overflow-hidden text-xs bg-amber-300 rounded shadow-inner">
            <div
              style={{ width: `${(step / 8) * 100}%` }}
              className="flex flex-col justify-center text-center text-white transition-all duration-500 bg-orange-600 shadow-lg whitespace-nowrap"
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
          <h1 className="text-2xl font-extrabold mb-4 text-center text-amber-700">
            Loan Application
          </h1>

          <div className="mb-4">
            <p className="text-lg text-center text-red-700">
              Loan Application Form
            </p>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={goBack}
              className="bg-outline-600 text-gary px-4 py-2 rounded shadow hover:bg-outline-700 focus:ring-2 focus:outline-blue-500 transition"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-emerald-600 text-white px-4 py-2 rounded shadow hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-400 transition"
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
