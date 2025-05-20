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
    console.log('Form Data:', data);

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
      formData.EmployeeDetails?.status &&
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

  // Step labels for progress indicator
  const steps = [
    'Personal Info',
    'Employee Details',
    'Loan Details',
    'Document Updates',
    'Review',
  ];

  return (
    <>
      {/* Fixed Toggle Theme Button */}
      <button
        onClick={handleToggleTheme}
        className="fixed top-4 right-4 z-50 px-4 py-2 bg-indigo-600 text-white rounded shadow-lg hover:bg-indigo-700 transition"
      >
        Toggle Theme
      </button>

      <div
        className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
        }`}
      >
        <div className="max-w-md w-full p-6">
          {/* Form Progress Indicator */}
          <div className="mb-6 flex justify-between text-sm font-medium">
            {steps.map((label, index) => (
              <div
                key={index}
                className={`flex-1 text-center border-b-4 pb-2 ${
                  step === index + 1
                    ? 'border-blue-600 text-blue-600'
                    : 'border-gray-300 text-gray-400'
                }`}
              >
                {label}
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`max-w-md w-full p-6 shadow-md rounded-lg transition-all duration-300 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            {/* Header */}
            <h1 className="text-2xl font-bold mb-6 text-center text-red-800 dark:text-red-300">
              Loan Application
            </h1>

            {/* Full Name Field */}
            <div className="mb-4">
             
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Navigation Buttons */}
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
      </div>
    </>
  );
};

export default Apply;
