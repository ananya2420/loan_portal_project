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

  console.log('Redux personalInfo:', personalInfo);

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
    switch (editStep) {
      case 0:
        return (
          <>
            <h3 className="text-lg font-semibold mb-2 text-indigo-700">Edit Personal Information</h3>
            {['name', 'dob', 'phone', 'email'].map((field) => (
              <div key={field} className="mb-3">
                <label className="block font-semibold mb-1 capitalize text-indigo-600">{field}</label>
                <input
                  {...register(`personalInfo.${field}`, { required: `${field} is required` })}
                  className="w-full border border-indigo-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder={`Enter ${field}`}
                />
                {errors?.personalInfo?.[field] && (
                  <p className="text-red-600 text-xs mt-1 italic">{errors.personalInfo[field].message}</p>
                )}
              </div>
            ))}
          </>
        );

      case 1:
        return (
          <>
            <h3 className="text-lg font-semibold mb-2 text-green-700">Edit Employee Details</h3>
            {['company', 'status', 'income', 'experience', 'taxId'].map((field) => (
              <div key={field} className="mb-3">
                <label className="block font-semibold mb-1 capitalize text-green-600">{field}</label>
                <input
                  {...register(`employeeDetails.${field}`, { required: `${field} is required` })}
                  className="w-full border border-green-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder={`Enter ${field}`}
                />
                {errors?.employeeDetails?.[field] && (
                  <p className="text-red-600 text-xs mt-1 italic">{errors.employeeDetails[field].message}</p>
                )}
              </div>
            ))}
          </>
        );

      case 2:
        return (
          <>
            <h3 className="text-lg font-semibold mb-2 text-purple-700">Edit Loan Details</h3>
            {['amount', 'type', 'repaymentTerm', 'emiDate'].map((field) => (
              <div key={field} className="mb-3">
                <label className="block font-semibold mb-1 capitalize text-purple-600">
                  {field.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  {...register(`loanDetails.${field}`, { required: `${field} is required` })}
                  className="w-full border border-purple-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder={`Enter ${field}`}
                />
                {errors?.loanDetails?.[field] && (
                  <p className="text-red-600 text-xs mt-1 italic">{errors.loanDetails[field].message}</p>
                )}
              </div>
            ))}
          </>
        );

      case 3:
        return (
          <>
            <h3 className="text-lg font-semibold mb-2 text-yellow-700">Edit Document Updates</h3>
            <label className="block font-semibold mb-1 text-yellow-600">ID Updated</label>
            <select
              {...register('documentUpdates.isUpdated', {
                required: 'Selection is required',
              })}
              className="w-full border border-yellow-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors?.documentUpdates?.isUpdated && (
              <p className="text-red-600 text-xs mt-1 italic">{errors.documentUpdates.isUpdated.message}</p>
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
        theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 text-gray-900'
      } transition-colors duration-500`}
    >
      {/* Toggle Theme Button */}
      <div className="max-w-3xl mx-auto mb-2 flex justify-end">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 text-white rounded text-sm shadow-lg hover:from-indigo-700 hover:to-pink-700 transition"
        >
          Toggle Theme
        </button>
      </div>

      {/* Step indicator */}
      <div className="max-w-3xl mx-auto mb-4">
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

            // Colors for each step
            const colors = [
              { text: 'text-indigo-600', border: 'border-indigo-600', bg: 'bg-indigo-200' },
              { text: 'text-pink-600', border: 'border-pink-600', bg: 'bg-pink-200' },
              { text: 'text-green-600', border: 'border-green-600', bg: 'bg-green-200' },
              { text: 'text-purple-600', border: 'border-purple-600', bg: 'bg-purple-200' },
              { text: 'text-yellow-600', border: 'border-yellow-600', bg: 'bg-yellow-200' },
              { text: 'text-pink-700', border: 'border-pink-700', bg: 'bg-pink-300' },
              { text: 'text-teal-600', border: 'border-teal-600', bg: 'bg-teal-200' },
              { text: 'text-gray-700', border: 'border-gray-700', bg: 'bg-gray-300' },
            ];

            const color = colors[index];

            return (
              <div
                key={stepLabel}
                className={`flex flex-col items-center w-full ${
                  isActive ? `${color.text} font-bold` : 'text-gray-400'
                }`}
                style={{ minWidth: '70px' }}
              >
                <div
                  className={`rounded-full w-6 h-6 flex items-center justify-center mb-1 border ${
                    isActive ? `${color.border} ${color.bg}` : 'border-gray-300 bg-gray-200'
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

      {/* Progress Bar */}
      <div className="w-full max-w-md mx-auto mb-6">
        <div className="relative pt-1">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-pink-700 uppercase bg-pink-200 rounded-full shadow-sm">
              Step 6 of 8
            </span>
            <span className="text-xs font-semibold text-pink-700">60%</span>
          </div>
          <div className="flex h-2 overflow-hidden text-xs bg-pink-200 rounded">
            <div
              style={{ width: '60%' }}
              className="flex flex-col justify-center text-center text-white transition-all duration-700 bg-pink-500 shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div
        className={`max-w-3xl mx-auto p-6 rounded-xl shadow-lg ${
          theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
        } space-y-6 transition-colors duration-500`}
      >
        <h2 className="text-3xl font-extrabold text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">
          Summary
        </h2>

        {isEditing ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`p-6 border rounded-lg ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
            } space-y-6`}
          >
            <h2 className="text-center font-semibold text-xl text-indigo-600">{stepTitles[editStep]}</h2>
            {renderStepForm()}
            <div className="flex justify-between mt-6">
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
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded text-sm transition"
              >
                Back
              </button>
              {editStep < stepTitles.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setEditStep((prev) => prev + 1)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition"
                >
                  Save
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
                  { label: 'Phone', value: personalInfo?.phone || 'N/A' },
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
                    value: documentUpdates?.isUpdated === true || documentUpdates?.isUpdated === 'true' ? 'Yes' : 'No',
                  },
                ],
              },
            ].map(({ title, content }, idx) => (
              <div
                key={title}
                className={`p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                }`}
                onClick={() => {
                  setIsEditing(true);
                  setEditStep(idx);
                }}
              >
                <h3 className="text-xl font-semibold text-indigo-600 mb-2">{title}</h3>
                <ul className="space-y-1">
                  {content.map(({ label, value }) => (
                    <li key={label} className="flex justify-between border-b border-gray-300 dark:border-gray-600 py-1">
                      <span className="font-semibold">{label}:</span>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Summary;

