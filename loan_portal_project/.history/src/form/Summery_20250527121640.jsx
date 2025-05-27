import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPersonalInfo,
  setEmployeeDetails,
  setLoanDetails,
  setDocumentUpdates,
} from '../redux/slices/formSlice';
import { toggleTheme } from '../redux/slices/themeSlice';

const Summary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    personalInfo = {},
    employeeDetails = {},
    loanDetails = {},
    documentUpdates = {},
  } = useSelector((state) => state.formData || {});

  const theme = useSelector((state) => state.theme.theme);

  const [isEditing, setIsEditing] = useState(false);
  const [editStep, setEditStep] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      personalInfo,
      employeeDetails,
      loanDetails,
      documentUpdates,
    },
  });

  useEffect(() => {
    const hasAnyData =
      personalInfo?.name ||
      personalInfo?.firstName ||
      personalInfo?.lastName ||
      employeeDetails?.company ||
      loanDetails?.amount;

    if (!hasAnyData) {
      alert('No form data found. Please complete at least one step before viewing the summary.');
      navigate('/apply/document-updates');
    } else {
      reset({
        personalInfo,
        employeeDetails,
        loanDetails,
        documentUpdates,
      });
    }
  }, [personalInfo, employeeDetails, loanDetails, documentUpdates, reset, navigate]);

  const stepTitles = ['Personal Info', 'Employee Details', 'Loan Details', 'Document Updates'];

  // Mapping from step label to route path
  const stepRoutes = {
    Apply: '/apply',
    'Personal Info': '/apply/personal-info',
    'Employee Details': '/apply/employee-details',
    'Loan Details': '/apply/loan-details',
    'Document Updates': '/apply/document-updates',
    Summary: '/apply/summary',
    Review: '/apply/review',
    'Thank you': '/apply/thank-you',
  };

  const onSubmit = (data) => {
    dispatch(setPersonalInfo(data.personalInfo));
    dispatch(setEmployeeDetails(data.employeeDetails));
    dispatch(setLoanDetails(data.loanDetails));
    dispatch(setDocumentUpdates(data.documentUpdates));
    alert('Changes saved!');
    setIsEditing(false);
    setEditStep(0);
  };

  const renderStepForm = () => {
    const inputClass =
      'w-full border rounded px-3 py-1.5 text-sm dark:bg-gray-600 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400';
    const errorClass = 'text-red-500 text-xs mt-1';

    switch (editStep) {
      case 0:
        return (
          <>
            <h3 className="text-lg font-semibold mb-2 text-indigo-700 dark:text-indigo-300">
              Edit Personal Information
            </h3>
            {['name', 'dob', 'phone', 'email'].map((field) => (
              <div key={field}>
                <label className="block font-semibold mb-1 capitalize text-indigo-600 dark:text-indigo-400">
                  {field}
                </label>
                <input
                  {...register(`personalInfo.${field}`, { required: `${field} is required` })}
                  className={inputClass}
                />
                {errors?.personalInfo?.[field] && (
                  <p className={errorClass}>{errors.personalInfo[field].message}</p>
                )}
              </div>
            ))}
          </>
        );
      case 1:
        return (
          <>
            <h3 className="text-lg font-semibold mb-2 text-green-700 dark:text-green-300">
              Edit Employee Details
            </h3>
            {['company', 'status', 'income', 'experience', 'taxId'].map((field) => (
              <div key={field}>
                <label className="block font-semibold mb-1 capitalize text-green-600 dark:text-green-400">
                  {field}
                </label>
                <input
                  {...register(`employeeDetails.${field}`, { required: `${field} is required` })}
                  className={inputClass}
                />
                {errors?.employeeDetails?.[field] && (
                  <p className={errorClass}>{errors.employeeDetails[field].message}</p>
                )}
              </div>
            ))}
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-lg font-semibold mb-2 text-yellow-700 dark:text-yellow-300">
              Edit Loan Details
            </h3>
            {['amount', 'type', 'repaymentTerm', 'emiDate'].map((field) => (
              <div key={field}>
                <label className="block font-semibold mb-1 capitalize text-yellow-600 dark:text-yellow-400">
                  {field.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  {...register(`loanDetails.${field}`, { required: `${field} is required` })}
                  className={inputClass}
                />
                {errors?.loanDetails?.[field] && (
                  <p className={errorClass}>{errors.loanDetails[field].message}</p>
                )}
              </div>
            ))}
          </>
        );
      case 3:
        return (
          <>
            <h3 className="text-lg font-semibold mb-2 text-purple-700 dark:text-purple-300">
              Edit Document Updates
            </h3>
            <label className="block font-semibold mb-1 text-purple-600 dark:text-purple-400">
              ID Updated
            </label>
            <select
              {...register('documentUpdates.isUpdated', {
                required: 'Selection is required',
              })}
              className={inputClass}
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors?.documentUpdates?.isUpdated && (
              <p className={errorClass}>{errors.documentUpdates.isUpdated.message}</p>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen p-4 ${
        theme === 'dark'
          ? 'bg-gray-900 text-gray-100'
          : 'bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 text-gray-900'
      }`}
    >
      <div className="max-w-3xl mx-auto mb-2 flex justify-end">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm transition-shadow shadow-md"
        >
          Toggle Theme
        </button>
      </div>

      <div className="max-w-3xl mx-auto mb-2">
        <div className="flex justify-between text-xs font-semibold text-gray-500 dark:text-gray-400">
          {[
            'Apply',
            'Personal Info',
            'Employee Details',
            'Loan Details',
            'Document Updates',
            'Summary',
            'Review',
            'Thank you',
          ].map((stepLabel, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === 6;
            return (
              <div
                key={stepLabel}
                onClick={() => navigate(stepRoutes[stepLabel])}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigate(stepRoutes[stepLabel]);
                  }
                }}
                className={`flex flex-col items-center w-full cursor-pointer ${
                  isActive ? 'text-white-700 dark:text-white-300 font-bold' : ''
                }`}
                style={{ minWidth: '70px' }}
              >
                <div
                  className={`rounded-full w-6 h-6 flex items-center justify-center mb-1 border ${
                    isActive
                      ? 'border-white-600 text-white-200 bg-emerald-200 dark:bg-emerald-700'
                      : 'border-white-300 bg-white-100 dark:bg-white-700'
                  }`}
                >
                  {stepNumber}
                </div>
                <div className="whitespace-nowrap">{stepLabel}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full max-w-md mx-auto">
        <div className="relative pt-1 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-teal-600 uppercase bg-teal-200 rounded-full dark:bg-teal-700 dark:text-teal-100">
              Step 6 of 8
            </span>
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-300">60%</span>
          </div>
          <div className="flex h-2 overflow-hidden text-xs bg-teal-200 rounded dark:bg-teal-900">
            <div
              style={{ width: '60%' }}
              className="flex flex-col justify-center text-center text-white transition-all duration-500 bg-gradient-to-r from-green-400 to-green-600 shadow-lg whitespace-nowrap"
            />
          </div>
        </div>
      </div>

      <div
        className={`max-w-3xl mx-auto p-4 rounded-xl shadow-lg ${
          theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
        } space-y-5`}
      >
        <h2 className="text-2xl font-bold text-center text-black-700 dark:text-black-300">Summary</h2>

        {isEditing ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`p-4 border rounded ${
              theme === 'dark' ? 'bg-gray-700 border-indigo-600' : 'bg--50 border-indigo-200'
            } space-y-4 shadow-inner`}
          >
            <h2 className="text-center font-semibold text-lg text-black-600 dark:text-black-400">
              {stepTitles[editStep]}
            </h2>
            {renderStepForm()}
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => {
                  if (editStep > 0) {
                    setEditStep((prev) => prev - 1);
                  } else {
                    setIsEditing(false);
                    setEditStep(0);
                    navigate('/apply/summary');
                  }
                }}
                className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-shadow shadow-md"
              >
                Back
              </button>
              {editStep < stepTitles.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setEditStep((prev) => prev + 1)}
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-shadow shadow-md"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-shadow shadow-md"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        ) : (
          <>
            {[
              {
                title: 'Personal Information',
                content: [
                  {
                    label: 'Name',
                    value:
                      personalInfo?.name ||
                      (personalInfo?.firstName && personalInfo?.lastName
                        ? `${personalInfo.firstName} ${personalInfo.lastName}`
                        : 'N/A'),
                  },
                  { label: 'Date of Birth', value: personalInfo?.dob || personalInfo?.dateOfBirth || 'N/A' },
                  { label: 'Phone', value: personalInfo?.phone || personalInfo?.phoneNumber || 'N/A' },
                  { label: 'Email', value: personalInfo?.email || 'N/A' },
                ],
              },
              {
                title: 'Employee Details',
                content: [
                  { label: 'Company', value: employeeDetails?.company || 'N/A' },
                  { label: 'Status', value: employeeDetails?.status || 'N/A' },
                  { label: 'Income', value: employeeDetails?.income || 'N/A' },
                  { label: 'Experience', value: employeeDetails?.experience || 'N/A' },
                  { label: 'Tax ID', value: employeeDetails?.taxId || 'N/A' },
                ],
              },
              {
                title: 'Loan Details',
                content: [
                  { label: 'Amount', value: loanDetails?.amount || 'N/A' },
                  { label: 'Type', value: loanDetails?.type || 'N/A' },
                  { label: 'Repayment Term', value: loanDetails?.repaymentTerm || 'N/A' },
                  { label: 'EMI Date', value: loanDetails?.emiDate || 'N/A' },
                ],
              },
              {
                title: 'Document Updates',
                content: [
                  {
                    label: 'ID Updated',
                    value:
                      documentUpdates?.isUpdated === 'true' || documentUpdates?.isUpdated === true
                        ? 'Yes'
                        : 'No',
                  },
                ],
              },
            ].map(({ title, content }, idx) => (
              <div
                key={title}
                className="border rounded-lg p-4 shadow-md bg-gray-50 dark:bg-gray-700"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-lg">{title}</h3>
                  <button
                    onClick={() => {
                      setEditStep(idx);
                      setIsEditing(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200 font-semibold text-sm"
                  >
                    Edit
                  </button>
                </div>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  {content.map(({ label, value }) => (
                    <React.Fragment key={label}>
                      <dt className="font-medium text-gray-700 dark:text-gray-300">{label}</dt>
                      <dd className="text-gray-900 dark:text-gray-100">{value}</dd>
                    </React.Fragment>
                  ))}
                </dl>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Summary;

