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
            <h3 className="text-lg font-semibold mb-2">Edit Personal Information</h3>
            {['name', 'dob', 'phone', 'email'].map((field) => (
              <div key={field}>
                <label className="block font-semibold mb-1 capitalize">{field}</label>
                <input
                  {...register(`personalInfo.${field}`, { required: `${field} is required` })}
                  className="w-full border rounded px-3 py-1.5 text-sm"
                />
                {errors?.personalInfo?.[field] && (
                  <p className="text-red-500 text-xs mt-1">{errors.personalInfo[field].message}</p>
                )}
              </div>
            ))}
          </>
        );

      case 1:
        return (
          <>
            <h3 className="text-lg font-semibold mb-2">Edit Employee Details</h3>
            {['company', 'status', 'income', 'experience', 'taxId'].map((field) => (
              <div key={field}>
                <label className="block font-semibold mb-1 capitalize">{field}</label>
                <input
                  {...register(`employeeDetails.${field}`, { required: `${field} is required` })}
                  className="w-full border rounded px-3 py-1.5 text-sm"
                />
                {errors?.employeeDetails?.[field] && (
                  <p className="text-red-500 text-xs mt-1">{errors.employeeDetails[field].message}</p>
                )}
              </div>
            ))}
          </>
        );

      case 2:
        return (
          <>
            <h3 className="text-lg font-semibold mb-2">Edit Loan Details</h3>
            {['amount', 'type', 'repaymentTerm', 'emiDate'].map((field) => (
              <div key={field}>
                <label className="block font-semibold mb-1 capitalize">
                  {field.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  {...register(`loanDetails.${field}`, { required: `${field} is required` })}
                  className="w-full border rounded px-3 py-1.5 text-sm"
                />
                {errors?.loanDetails?.[field] && (
                  <p className="text-red-500 text-xs mt-1">{errors.loanDetails[field].message}</p>
                )}
              </div>
            ))}
          </>
        );

      case 3:
        return (
          <>
            <h3 className="text-lg font-semibold mb-2">Edit Document Updates</h3>
            <label className="block font-semibold mb-1">ID Updated</label>
            <select
              {...register('documentUpdates.isUpdated', {
                required: 'Selection is required',
              })}
              className="w-full border rounded px-3 py-1.5 text-sm"
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors?.documentUpdates?.isUpdated && (
              <p className="text-red-500 text-xs mt-1">{errors.documentUpdates.isUpdated.message}</p>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>

      {/* Toggle Theme Button */}
      <div className="max-w-3xl mx-auto mb-2 flex justify-end">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-3 py-1.5 bg-yellow-400 text-black rounded text-sm"
        >
          Toggle Theme
        </button>
      </div>

      {/* Step indicator */}
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
            const isActive = stepNumber >= 6; // Steps 6,7,8 colored
            return (
              <div
                key={stepLabel}
                className={`flex flex-col items-center w-full ${
                  isActive ? 'text-indigo-600 font-bold' : ''
                }`}
                style={{ minWidth: '70px' }}
              >
                <div
                  className={`rounded-full w-6 h-6 flex items-center justify-center mb-1 border ${
                    isActive ? 'border-indigo-600 bg-indigo-100' : 'border-gray-300 bg-gray-100'
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
      <div className="w-full max-w-md mx-auto">
        <div className="relative pt-1 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-teal-600 uppercase bg-teal-200 rounded-full">
              Step 6 of 8
            </span>
            <span className="text-xs font-semibold text-teal-600">60%</span>
          </div>
          <div className="flex h-2 overflow-hidden text-xs bg-teal-200 rounded">
            <div
              style={{ width: '60%' }}
              className="flex flex-col justify-center text-center text-white transition-all duration-500 bg-green-500 shadow-none whitespace-nowrap"
            />
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div
        className={`max-w-3xl mx-auto p-4 rounded-xl shadow ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
        } space-y-5`}
      >
        <h2 className="text-2xl font-bold text-center">Summary</h2>

        {isEditing ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`p-4 border rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} space-y-4`}
          >
            <h2 className="text-center font-semibold text-lg">{stepTitles[editStep]}</h2>
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
                className="px-4 py-1.5 bg-gray-400 text-white rounded text-sm"
              >
                Back
              </button>
              {editStep < stepTitles.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setEditStep((prev) => prev + 1)}
                  className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm"
                >
                  Next
                </button>
              ) : (
                <button type="submit" className="px-4 py-1.5 bg-green-600 text-white rounded text-sm">
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
                    labelColor: 'text-purple-700',
                    valueColor: 'text-purple-900',
                  },
                  { label: 'Date of Birth', value: personalInfo?.dob || 'N/A', labelColor: 'text-blue-600', valueColor: 'text-blue-800' },
                  { label: 'Phone', value: personalInfo?.phone || 'N/A', labelColor: 'text-yellow-700', valueColor: 'text-yellow-900' },
                  { label: 'Email', value: personalInfo?.email || 'N/A', labelColor: 'text-green-700', valueColor: 'text-green-900' },
                ],
              },
              {
                title: 'Employee Details',
                content: [
                  { label: 'Company', value: employeeDetails?.company || 'N/A', labelColor: 'text-red-600', valueColor: 'text-red-800' },
                  { label: 'Status', value: employeeDetails?.status || 'N/A', labelColor: 'text-orange-600', valueColor: 'text-orange-800' },
                  { label: 'Income', value: employeeDetails?.income || 'N/A', labelColor: 'text-pink-600', valueColor: 'text-pink-800' },
                  { label: 'Experience', value: employeeDetails?.experience || 'N/A', labelColor: 'text-teal-600', valueColor: 'text-teal-800' },
                  { label: 'Tax ID', value: employeeDetails?.taxId || 'N/A', labelColor: 'text-indigo-600', valueColor: 'text-indigo-800' },
                ],
              },
              {
                title: 'Loan Details',
                content: [
                  { label: 'Amount', value: loanDetails?.amount || 'N/A', labelColor: 'text-cyan-700', valueColor: 'text-cyan-900' },
                  { label: 'Type', value: loanDetails?.type || 'N/A', labelColor: 'text-lime-700', valueColor: 'text-lime-900' },
                  { label: 'Repayment Term', value: loanDetails?.repaymentTerm || 'N/A', labelColor: 'text-fuchsia-700', valueColor: 'text-fuchsia-900' },
                  { label: 'EMI Date', value: loanDetails?.emiDate || 'N/A', labelColor: 'text-rose-700', valueColor: 'text-rose-900' },
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
                    labelColor: 'text-gray-700',
                    valueColor: 'text-gray-900',
                  },
                ],
              },
            ].map(({ title, content }) => (
              <div key={title} className="border rounded p-4 mb-4">
                <h3 className="text-xl font-semibold mb-2 text-indigo-700">{title}</h3>
                <div className="space-y-1">
                  {content.map(({ label, value, labelColor, valueColor }) => (
                    <p key={label} className="text-sm">
                      <span className={`font-semibold ${labelColor}`}>{label}:</span>{' '}
                      <span className={`${valueColor}`}>{value}</span>
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-between mt-6">
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className="px-4 py-2 rounded bg-red-600 text-white font-semibold"
              >
                Back
              </button>

              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded bg-purple-600 text-white font-semibold"
              >
                View Full Summary
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Summary;

