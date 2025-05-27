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

const steps = [
  { number: 1, label: 'Apply' },
  { number: 2, label: 'Personal\nInfo' },
  { number: 3, label: 'Employee\nDetails' },
  { number: 4, label: 'Loan\nDetails' },
  { number: 5, label: 'Document\nUpdates' },
  { number: 6, label: 'Summary' },
  { number: 7, label: 'Review' },
  { number: 8, label: 'Thank\nyou' },
];

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

  // Handler for clicking steps in navigation
  const handleStepClick = (stepNumber) => {
    switch (stepNumber) {
      case 5:
        navigate('/apply/document-updates');
        break;
      case 7:
        navigate('/apply/review');
        break;
      default:
        // You can add more navigation if you want here
        break;
    }
  };

  return (
    <div
      className={`min-h-screen p-4 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      {/* Toggle Theme Button */}
      <div className="max-w-3xl mx-auto mb-2 flex justify-end">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm shadow-md"
        >
          Toggle Theme
        </button>
      </div>

      {/* 8-Step Indicator like Document Updates */}
      <div className="max-w-3xl mx-auto mb-4 select-none">
        <nav
          aria-label="Progress"
          className="grid grid-cols-8 gap-4 text-center text-xs font-semibold"
        >
          {steps.map(({ number, label }) => {
            const isActive = number === 6;
            const isClickable = [5, 7].includes(number);
            return (
              <button
                key={number}
                type="button"
                onClick={() => isClickable && handleStepClick(number)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && isClickable) {
                    handleStepClick(number);
                  }
                }}
                className={`flex flex-col items-center gap-1 cursor-pointer rounded-lg py-2
                  ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }
                  ${!isClickable && !isActive ? 'cursor-default' : ''}
                  focus:outline-none focus:ring-2 focus:ring-emerald-500
                `}
                style={{ whiteSpace: 'pre-line' }}
                aria-current={isActive ? 'step' : undefined}
              >
                <div
                  className={`w-7 h-7 flex items-center justify-center rounded-full border ${
                    isActive
                      ? 'border-transparent'
                      : 'border-gray-400 dark:border-gray-500'
                  } ${
                    isActive ? 'bg-emerald-700' : 'bg-gray-200 dark:bg-gray-600'
                  } text-sm font-bold`}
                >
                  {number}
                </div>
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Progress Bar below the steps */}
      <div className="max-w-3xl mx-auto mb-6 px-1">
        <div className="relative pt-1">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-emerald-700 uppercase bg-emerald-200 rounded-full">
              Step 6 of 8
            </span>
            <span className="text-xs font-semibold text-emerald-700">60%</span>
          </div>
          <div className="flex h-2 overflow-hidden text-xs bg-emerald-200 rounded">
            <div
              style={{ width: '60%' }}
              className="flex flex-col justify-center text-center text-white bg-emerald-600 transition-all duration-500 rounded"
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
            className={`p-4 border rounded ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            } space-y-4`}
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
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-green-600 text-white rounded text-sm"
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
                  { label: 'Status', value: employeeDetails?.status || 'N/A' },
                  { label: 'Company', value: employeeDetails?.company || 'N/A' },
                  { label: 'Monthly Income', value: employeeDetails?.income || 'N/A' },
                  {
                    label: 'Experience',
                    value: employeeDetails?.experience ? `${employeeDetails.experience} years` : 'N/A',
                  },
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
                      documentUpdates?.isUpdated === true || documentUpdates?.isUpdated === 'true'
                        ? 'Yes'
                        : 'No',
                  },
                ],
              },
            ].map(({ title, content }, idx) => (
              <div
                key={title}
                className="border border-gray-300 rounded p-4 mb-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setEditStep(idx);
                    }}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {content.map(({ label, value }) => (
                    <div key={label} className="flex flex-col">
                      <span className="font-semibold">{label}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Summary;
