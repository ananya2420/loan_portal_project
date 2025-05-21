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
    'Apply',
    'Personal Info',
    'Employee Details',
    'Loan Details',
    'Document Updates',
    'Summary',
    'Review',
    'Thank You',
  ];

  return (
    <>
      {/* Theme Toggle */}
      <button
        onClick={handleToggleTheme}
        className="fixed top-4 right-4 z-50 px-4 py-2 bg-indigo-600 text-white rounded shadow-lg hover:bg-indigo-700 transition"
      >
        Toggle Theme
      </button>

      {/* Main Wrapper */}
      <div
        className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
        }`}
      >
        <div className="max-w-xl w-full p-6">
          {/* Progress Bar */}
          <div className="mb-6 flex items-center">
            {steps.map((label, index) => {
              const current = step === index + 1;
              const completed = step > index + 1;

              return (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center text-xs w-full">
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${
                        completed
                          ? 'bg-blue-600'
                          : current
                          ? 'bg-blue-400'
                          : 'bg-gray-300'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div
                      className={`mt-1 text-center text-[10px] sm:text-xs ${
                        current
                          ? 'text-blue-600 font-semibold'
                          : completed
                          ? 'text-gray-500'
                          : 'text-gray-400'
                      }`}
                    >
                      {label}
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="flex-1 h-1 mx-1 sm:mx-2 bg-gray-300 relative">
                      <div
                        className={`h-full transition-all duration-500 ${
                          step > index + 1 ? 'bg-blue-600 w-full' : 'w-0'
                        }`}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="w-full max-w-md mx-auto">
        <div className="relative pt-1 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-teal-600 uppercase bg-teal-200 rounded-full">
              Step 1 of 1
            </span>
            <span className="text-xs font-semibold text-teal-600">10%</span>
          </div>
          <div className="flex h-2 overflow-hidden text-xs bg-teal-200 rounded">
            <div
              style={{ width: '10%' }}
              className="flex flex-col justify-center text-center text-white transition-all duration-500 bg-green-500 shadow-none whitespace-nowrap"
            />
          </div>
        </div>
      </div>

          {/* Form Box */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`p-6 rounded-lg shadow-md transition-all duration-300 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
              Loan Application
            </h1>

            <div className="mb-4">
              <p className="text-lg text-center">Loan Application Form</p>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={goBack}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {step === 7 ? 'Submit' : 'Next'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Apply;



