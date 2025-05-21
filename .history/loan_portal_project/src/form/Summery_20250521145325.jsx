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
  'Apply',
  'Personal Info',
  'Employee Details',
  'Loan Details',
  'Document Updates',
  'Summary',
  'Review',
  'Thank You',
];

const Summary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { personalInfo, employeeDetails, loanDetails, documentUpdates } = useSelector(
    (state) => state.formData || {}
  );

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
    if (!personalInfo?.name) {
      alert('No user data available. Please complete the form steps before accessing the summary.');
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
            <h3 className="text-xl font-semibold mb-4">Edit Personal Information</h3>
            {[
              { field: 'name', tip: 'Try: Gourab / Bob' },
              { field: 'dob', tip: 'Try: 21.5.25' },
              { field: 'phone', tip: 'Try: 01700 / 01654' },
              { field: 'email', tip: 'Try: aborty@gmail.com / a@gmail.com' },
            ].map(({ field, tip }) => (
              <div key={field}>
                <label className="block font-semibold mb-1 capitalize" title={tip}>
                  {field}
                </label>
                <input
                  {...register(`personalInfo.${field}`, { required: `${field} is required` })}
                  className="w-full border rounded px-4 py-2"
                />
                {errors?.personalInfo?.[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors.personalInfo[field].message}</p>
                )}
              </div>
            ))}
          </>
        );
      case 1:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Edit Employee Details</h3>
            {[
              { field: 'status', tip: 'Select: Full-time / Part-time' },
              { field: 'company', tip: 'Try: Brain Station / Tech Solution / Enosis Solution' },
              { field: 'income', tip: 'Try: 10000 / 12000 / 15000' },
              { field: 'experience', tip: 'Try: 5 years / 6 years' },
              { field: 'taxId', tip: 'Try: TX55505 / TX58306' },
            ].map(({ field, tip }) => (
              <div key={field}>
                <label className="block font-semibold mb-1 capitalize" title={tip}>
                  {field}
                </label>
                <input
                  {...register(`employeeDetails.${field}`, {
                    required: `${field} is required`,
                  })}
                  type={['income', 'experience'].includes(field) ? 'number' : 'text'}
                  className="w-full border rounded px-4 py-2"
                />
                {errors?.employeeDetails?.[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors.employeeDetails[field].message}</p>
                )}
              </div>
            ))}
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Edit Loan Details</h3>
            {[
              { field: 'amount', tip: 'Try: 20000 / 50000' },
              { field: 'type', tip: 'Select: Home Loan / Auto Loan' },
              { field: 'repaymentTerm', tip: 'Select: 6 / 12 / 24 / 36 / 48 months' },
              { field: 'emiDate', tip: 'Try: 21.5.25 / 22.5.25' },
            ].map(({ field, tip }) => (
              <div key={field}>
                <label className="block font-semibold mb-1 capitalize" title={tip}>
                  {field}
                </label>
                <input
                  {...register(`loanDetails.${field}`, {
                    required: `${field} is required`,
                  })}
                  type={['amount', 'repaymentTerm'].includes(field) ? 'number' : 'text'}
                  className="w-full border rounded px-4 py-2"
                />
                {errors?.loanDetails?.[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors.loanDetails[field].message}</p>
                )}
              </div>
            ))}
          </>
        );
      case 3:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Edit Document Updates</h3>
            <label className="block font-semibold mb-1" title="ID updated status">
              ID Updated
            </label>
            <select
              {...register('documentUpdates.isUpdated', {
                required: 'Selection is required',
              })}
              className="w-full border rounded px-4 py-2"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors?.documentUpdates?.isUpdated && (
              <p className="text-red-500 text-sm mt-1">{errors.documentUpdates.isUpdated.message}</p>
            )}
          </>
        );
      default:
        return null;
    }
  };

  const renderMultipleValues = (value) => {
    if (!value) return 'N/A';
    const values = value.split(/[\/,]/).map((v) => v.trim()).filter((v) => v.length > 0);
    return (
      <ul className="list-disc list-inside ml-4">
        {values.map((val, idx) => (
          <li key={idx}>{val}</li>
        ))}
      </ul>
    );
  };

  return (
    <div
      className={`min-h-screen p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div className="max-w-4xl mx-auto mb-4 flex justify-end">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
        >
          Toggle Theme
        </button>
      </div>

      <div className="flex justify-between max-w-4xl mx-auto mb-6 px-4">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = label === 'Summary';

          return (
            <div key={label} className="flex flex-col items-center w-1/8">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  isActive ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {stepNumber}
              </div>
              <div
                className={`text-xs text-center ${
                  isActive ? 'font-bold text-blue-600' : 'text-gray-600'
                }`}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full max-w-md mx-auto mb-6">
        <div className="relative pt-1">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-teal-600 uppercase bg-teal-200 rounded-full">
              Step 6 of 8
            </span>
            <span className="text-xs font-semibold text-teal-600">75%</span>
          </div>
          <div className="flex h-2 overflow-hidden text-xs bg-teal-200 rounded">
            <div
              style={{ width: '75%' }}
              className="flex flex-col justify-center text-center text-white transition-all duration-500 bg-green-500 shadow-none whitespace-nowrap"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 rounded-xl shadow-lg space-y-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-6">Summary</h2>

        {isEditing ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border p-5 rounded-lg space-y-5 max-w-lg mx-auto bg-gray-50 border-gray-200"
          >
            <h2 className="text-center font-bold text-xl mb-4">{stepTitles[editStep]}</h2>
            {renderStepForm()}

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => {
                  if (editStep === 0) {
                    setIsEditing(false);
                    setEditStep(0);
                  } else {
                    setEditStep((prev) => prev - 1);
                  }
                }}
                className="px-6 py-2 bg-gray-400 text-white rounded"
              >
                Back
              </button>

              {editStep < stepTitles.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setEditStep((prev) => prev + 1)}
                  className="px-6 py-2 bg-blue-600 text-white rounded"
                >
                  Next
                </button>
              ) : (
                <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded">
                  Submit
                </button>
              )}
            </div>
          </form>
        ) : (
          <>
            {[/* Summary content unchanged */]}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => navigate('/apply/document-updates')}
                className="px-5 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Back
              </button>
              <div className="relative group">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setEditStep(0);
                  }}
                  className="px-6 py-2 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600"
                >
                  Edit Summary
                </button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-2 px-3 z-10 whitespace-nowrap">
                  Fullname: {personalInfo?.name || 'N/A'}<br />
                  Phone: {personalInfo?.phone || 'N/A'}<br />
                  Email: {personalInfo?.email || 'N/A'}
                </div>
              </div>
              <button
                onClick={() => navigate('/apply/review')}
                className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
