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
    switch (editStep) {
      case 0:
        return (
          <>
            <h3 className="text-lg font-semibold mb-2">Edit Personal Information</h3>
            {['name', 'dob', 'phone', 'email'].map((field) => (
              <div key={field} className="mb-4">
                <label className="block font-semibold mb-1 capitalize">{field}</label>
                <input
                  {...register(`personalInfo.${field}`, { required: `${field} is required` })}
                  className="w-full border rounded px-3 py-2 text-sm"
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
              <div key={field} className="mb-4">
                <label className="block font-semibold mb-1 capitalize">{field}</label>
                <input
                  {...register(`employeeDetails.${field}`, { required: `${field} is required` })}
                  className="w-full border rounded px-3 py-2 text-sm"
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
              <div key={field} className="mb-4">
                <label className="block font-semibold mb-1 capitalize">
                  {field.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  {...register(`loanDetails.${field}`, { required: `${field} is required` })}
                  className="w-full border rounded px-3 py-2 text-sm"
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
              className="w-full border rounded px-3 py-2 text-sm"
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

  // New Step Routes and Step Number
  const currentStep = 6;
  const totalSteps = 8;

  const stepRoutes = {
    1: '/apply/apply',
    2: '/apply/personal-info',
    3: '/apply/employee-details',
    4: '/apply/loan-details',
    5: '/apply/document-updates',
    6: '/apply/summary',
    7: '/apply/review',
    8: '/apply/thank-you',
  };

  return (
    <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>

      {/* Toggle Theme Button */}
      <div className="max-w-3xl mx-auto mb-4 flex justify-end">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded shadow"
        >
          Toggle Theme
        </button>
      </div>

      {/* Step Indicator - same style as DocumentUpdates */}
      <div className="max-w-3xl mx-auto mb-6 grid grid-cols-8 gap-x-3 gap-y-2 text-xs font-semibold text-center">
        {[
          { step: 1, label: 'Apply' },
          { step: 2, label: <>Personal<br />Info</> },
          { step: 3, label: <>Employee<br />Details</> },
          { step: 4, label: <>Loan<br />Details</> },
          { step: 5, label: <>Document<br />Updates</> },
          { step: 6, label: 'Summary' },
          { step: 7, label: 'Review' },
          { step: 8, label: 'Thank you' },
        ].map(({ step, label }) => (
          <div
            key={step}
            className="flex flex-col items-center col-span-1 cursor-pointer"
            onClick={() => navigate(stepRoutes[step])}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') navigate(stepRoutes[step]);
            }}
          >
            <span
              className={`w-7 h-7 flex items-center justify-center rounded-full font-bold ${
                step === currentStep
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {step}
            </span>
            <span className="mt-1 truncate" title={typeof label === 'string' ? label : undefined}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="max-w-md mx-auto mb-6">
        <div className="relative pt-1">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-teal-600 uppercase bg-teal-200 rounded-full">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-xs font-semibold text-teal-600">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="flex h-2 overflow-hidden text-xs bg-teal-200 rounded">
            <div
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              className="bg-green-500 shadow-none transition-all duration-500"
            />
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div
        className={`max-w-3xl mx-auto p-6 rounded-lg shadow-md ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
        } space-y-6`}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Summary</h2>

        {isEditing ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`p-6 border rounded-lg ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            }`}
          >
            {renderStepForm()}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditStep(0);
                }}
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <>
            {/* Personal Info */}
            <section className="space-y-1">
              <h3 className="text-xl font-semibold flex justify-between items-center">
                Personal Information
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setEditStep(0);
                  }}
                  className="text-emerald-600 hover:underline text-sm"
                >
                  Edit
                </button>
              </h3>
              <p>Name: {personalInfo?.name || '-'}</p>
              <p>Date of Birth: {personalInfo?.dob || '-'}</p>
              <p>Phone: {personalInfo?.phone || '-'}</p>
              <p>Email: {personalInfo?.email || '-'}</p>
            </section>

            {/* Employee Details */}
            <section className="space-y-1">
              <h3 className="text-xl font-semibold flex justify-between items-center">
                Employee Details
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setEditStep(1);
                  }}
                  className="text-emerald-600 hover:underline text-sm"
                >
                  Edit
                </button>
              </h3>
              <p>Company: {employeeDetails?.company || '-'}</p>
              <p>Status: {employeeDetails?.status || '-'}</p>
              <p>Income: {employeeDetails?.income || '-'}</p>
              <p>Experience: {employeeDetails?.experience || '-'}</p>
              <p>Tax ID: {employeeDetails?.taxId || '-'}</p>
            </section>

            {/* Loan Details */}
            <section className="space-y-1">
              <h3 className="text-xl font-semibold flex justify-between items-center">
                Loan Details
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setEditStep(2);
                  }}
                  className="text-emerald-600 hover:underline text-sm"
                >
                  Edit
                </button>
              </h3>
              <p>Amount: {loanDetails?.amount || '-'}</p>
              <p>Type: {loanDetails?.type || '-'}</p>
              <p>Repayment Term: {loanDetails?.repaymentTerm || '-'}</p>
              <p>EMI Date: {loanDetails?.emiDate || '-'}</p>
            </section>

            {/* Document Updates */}
            <section className="space-y-1">
              <h3 className="text-xl font-semibold flex justify-between items-center">
                Document Updates
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setEditStep(3);
                  }}
                  className="text-emerald-600 hover:underline text-sm"
                >
                  Edit
                </button>
              </h3>
              <p>ID Updated: {documentUpdates?.isUpdated === 'true' ? 'Yes' : 'No'}</p>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Summary;
