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
        theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 text-gray-900'
      }`}
    >
      <div className="max-w-3xl mx-auto mb-2 flex justify-end">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-4 py-1.5 bg-emerald-600 hover:bg-blue-700 text-white rounded text-sm transition-shadow shadow-md"
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
                className={`flex flex-col items-center w-full ${
                  isActive ? 'text-indigo-700 dark:text-indigo-300 font-bold' : ''
                }`}
                style={{ minWidth: '70px' }}
              >
                <div
                  className={`rounded-full w-6 h-6 flex items-center justify-center mb-1 border ${
                    isActive
                      ? 'border-indigo-600 bg-indigo-200 dark:bg-indigo-700'
                      : 'border-gray-300 bg-gray-100 dark:bg-gray-700'
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
        <h2 className="text-2xl font-bold text-center text-indigo-700 dark:text-indigo-300">Summary</h2>

        {isEditing ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`p-4 border rounded ${
              theme === 'dark' ? 'bg-gray-700 border-indigo-600' : 'bg-indigo-50 border-indigo-200'
            } space-y-4 shadow-inner`}
          >
            <h2 className="text-center font-semibold text-lg text-indigo-600 dark:text-indigo-400">
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
                color: 'text-indigo-700 dark:text-indigo-300',
                bgColor: 'bg-indigo-50 dark:bg-indigo-900',
              },
              {
                title: 'Employee Details',
                content: [
                  { label: 'Status', value: employeeDetails?.status || 'N/A' },
                  { label: 'Company', value: employeeDetails?.company || 'N/A' },
                  { label: 'Monthly Income', value: employeeDetails?.income || 'N/A' },
                  {
                    label: 'Experience',
                    value: employeeDetails?.experience ? `${employeeDetails.experience} years` : 'N/A',
                  },
                  { label: 'Tax ID', value: employeeDetails?.taxId || 'N/A' },
                ],
                color: 'text-green-700 dark:text-green-300',
                bgColor: 'bg-green-50 dark:bg-green-900',
              },
              {
                title: 'Loan Details',
                content: [
                  { label: 'Amount', value: loanDetails?.amount || 'N/A' },
                  { label: 'Type', value: loanDetails?.type || 'N/A' },
                  {
                    label: 'Term',
                    value: loanDetails?.repaymentTerm ? `${loanDetails.repaymentTerm} months` : 'N/A',
                  },
                  { label: 'EMI Date', value: loanDetails?.emiDate || 'N/A' },
                ],
                color: 'text-yellow-700 dark:text-yellow-300',
                bgColor: 'bg-yellow-50 dark:bg-yellow-900',
              },
              {
                title: 'Document Updates',
                content: [
                  {
                    label: 'ID Updated',
                    value:
                      documentUpdates?.isUpdated === 'true'
                        ? 'Yes'
                        : documentUpdates?.isUpdated === 'false'
                        ? 'No'
                        : 'N/A',
                  },
                  {
                    label: 'Preview',
                    value: documentUpdates?.previewUrl || null,
                  },
                ],
                color: 'text-purple-700 dark:text-purple-300',
                bgColor: 'bg-purple-50 dark:bg-purple-900',
              },
            ].map((section, i) => (
              <section
                key={i}
                className={`p-4 rounded border ${section.bgColor} ${section.color} space-y-2 shadow-md`}
              >
                <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {section.content.map((item, j) => (
                    <div key={j}>
                      <strong>{item.label}:</strong>{' '}
                      {item.label === 'Preview' && item.value ? (
                        <img
                          src={item.value}
                          alt="Document Preview"
                          className="mt-2 max-h-48 rounded border shadow"
                        />
                      ) : (
                        item.value
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
            <div className="flex flex-wrap gap-2 justify-between mt-4">
              <button
                onClick={() => navigate('/apply/document-updates')}
                className="px-4 py-1.5 bg-outline-400 hover:bg-outline-500 text-gray rounded text-sm shadow-sm"
              >
                Back
              </button>

              <button
                onClick={() => navigate('/apply/full-summary')}
                className="px-4 py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded text-sm shadow-md"
              >
                View Full Summary
              </button>

              <button
                onClick={() => navigate('/apply/review')}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm shadow-md"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Summary;
