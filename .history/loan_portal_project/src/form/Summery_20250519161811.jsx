import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice'; // Make sure this is the correct path
import ProgressBar from '../components/progressbar'; // Import ProgressBar here

const Summary = ({ userData = {}, onSubmit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const [isEditingEmployee, setIsEditingEmployee] = useState(false);
  const [validationError, setValidationError] = useState('');

  const {
    personalInfo = {},
    employeeDetails = {},
    loanDetails = {},
    documentUpdates = {},
  } = userData;

  useEffect(() => {
    console.log('User Data:', userData);
  }, [userData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: employeeDetails,
  });

  useEffect(() => {
    reset(employeeDetails);
  }, [employeeDetails, reset]);

  const submitEmployeeDetails = (data) => {
    onSubmit({ ...userData, employeeDetails: data });
    setIsEditingEmployee(false);
  };

  const handleGoToReview = () => {
    if (!isAllDataValid()) {
      setValidationError('Please complete all required fields before proceeding to review.');
      return;
    }
    setValidationError('');
    navigate('/apply/review');
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  // Step-wise validation function for all steps:
  const isAllDataValid = () => {
    // Personal Info validations
    if (
      !personalInfo.name ||
      !personalInfo.dob ||
      !personalInfo.phone ||
      !personalInfo.email
    ) {
      return false;
    }

    // Employee Details validations
    if (
      !employeeDetails.status ||
      !employeeDetails.company ||
      !employeeDetails.income ||
      !employeeDetails.experience ||
      !employeeDetails.taxId
    ) {
      return false;
    }

    // Loan Details validations
    if (
      !loanDetails.amount ||
      !loanDetails.type ||
      !loanDetails.term ||
      !loanDetails.emiDate
    ) {
      return false;
    }

    // Document Updates validation
    if (documentUpdates?.isUpdated === undefined) {
      return false;
    }

    return true;
  };

  if (!personalInfo?.name) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        No user data available. Please complete the form steps before accessing the summary.
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      {/* Toggle Theme Button */}
      <div className="max-w-4xl mx-auto flex justify-end mb-4">
        <button
          onClick={handleToggleTheme}
          className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
        >
          Toggle Theme
        </button>
      </div>

      {/* Progress Bar at the top of the summary */}
      <div className="max-w-4xl mx-auto mb-6">
        <ProgressBar currentStep={5} totalSteps={5} />
      </div>

      <div
        className={`max-w-4xl mx-auto p-6 rounded-xl shadow-lg space-y-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h2 className="text-3xl font-bold text-center">User Summary</h2>

        {isEditingEmployee ? (
          <form
            onSubmit={handleSubmit(submitEmployeeDetails)}
            className={`border p-5 rounded-lg space-y-5 max-w-lg mx-auto ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">Edit Employee Details</h3>

            {[{ label: 'Status', name: 'status' },
              { label: 'Company', name: 'company' },
              { label: 'Monthly Income', name: 'income', type: 'number' },
              { label: 'Experience (years)', name: 'experience', type: 'number' },
              { label: 'Tax ID', name: 'taxId' }].map(({ label, name, type = 'text' }) => (
              <div key={name}>
                <label className="block font-semibold mb-1">{label}</label>
                <input
                  type={type}
                  placeholder={label}
                  {...register(name, { required: `${label} is required` })}
                  className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    theme === 'dark'
                      ? 'bg-gray-600 border-gray-500 text-white'
                      : 'bg-white border-gray-300 text-black'
                  }`}
                />
                {errors[name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
                )}
              </div>
            ))}

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => setIsEditingEmployee(false)}
                className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <>
            {/* Summary Sections */}
            {[{
                title: 'Personal Information',
                content: [
                  { label: 'Name', value: personalInfo.name },
                  { label: 'Date of Birth', value: personalInfo.dob },
                  { label: 'Phone', value: personalInfo.phone },
                  { label: 'Email', value: personalInfo.email },
                ],
              },
              {
                title: 'Employee Details',
                content: [
                  { label: 'Status', value: employeeDetails.status },
                  { label: 'Company', value: employeeDetails.company },
                  { label: 'Monthly Income', value: `$${employeeDetails.income}` },
                  { label: 'Experience', value: `${employeeDetails.experience} years` },
                  { label: 'Tax ID', value: employeeDetails.taxId },
                ],
              },
              {
                title: 'Loan Details',
                content: [
                  { label: 'Amount', value: `$${loanDetails.amount}` },
                  { label: 'Type', value: loanDetails.type },
                  { label: 'Term', value: loanDetails.term },
                  { label: 'EMI Date', value: loanDetails.emiDate },
                ],
              },
              {
                title: 'Document Updates',
                content: [
                  { label: 'ID Updated', value: documentUpdates?.isUpdated ? 'Yes' : 'No' },
                ],
              }].map((section, i) => (
              <section
                key={i}
                className={`p-5 rounded-lg border ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <h3 className="text-xl font-semibold mb-3">{section.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.content.map((item, j) => (
                    <p key={j} className="text-sm">
                      <strong>{item.label}:</strong> {item.value || 'N/A'}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            {validationError && (
              <p className="text-red-600 font-semibold text-center mt-4">{validationError}</p>
            )}

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setIsEditingEmployee(true)}
                className="px-6 py-2 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600"
              >
                Edit Employee Details
              </button>

              <button
                onClick={handleGoToReview}
                disabled={!isAllDataValid()}
                className={`px-6 py-2 font-medium rounded hover:bg-blue-700 ${
                  isAllDataValid()
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-300 text-gray-700 cursor-not-

