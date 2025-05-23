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
      employeeDetails?.company ||
      loanDetails?.amount;
    if (!hasAnyData) {
      alert('Please complete the form before viewing the summary.');
      navigate('/apply');
    } else {
      reset({ personalInfo, employeeDetails, loanDetails, documentUpdates });
    }
  }, [personalInfo, employeeDetails, loanDetails, documentUpdates, reset, navigate]);

  const onSubmit = (data) => {
    dispatch(setPersonalInfo(data.personalInfo));
    dispatch(setEmployeeDetails(data.employeeDetails));
    dispatch(setLoanDetails(data.loanDetails));
    dispatch(setDocumentUpdates(data.documentUpdates));
    alert('Changes saved!');
    setIsEditing(false);
  };

  const stepTitles = ['Personal Info', 'Employee Details', 'Loan Details', 'Document Updates'];

  const renderStepForm = () => {
    const fields = {
      0: ['name', 'dob', 'phone', 'email'],
      1: ['company', 'status', 'income', 'experience', 'taxId'],
      2: ['amount', 'type', 'repaymentTerm', 'emiDate'],
      3: ['isUpdated'],
    };

    return (
      <>
        <h3 className="text-lg font-semibold mb-2">{stepTitles[editStep]}</h3>
        {fields[editStep].map((field) => (
          <div key={field}>
            <label className="block font-semibold mb-1 capitalize">{field}</label>
            {editStep === 3 ? (
              <select
                {...register(`documentUpdates.${field}`, { required: true })}
                className="w-full border px-3 py-2"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            ) : (
              <input
                {...register(
                  `${['personalInfo', 'employeeDetails', 'loanDetails'][editStep]}.${field}`,
                  { required: true }
                )}
                className="w-full border px-3 py-2"
              />
            )}
          </div>
        ))}
      </>
    );
  };

  return (
    <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="flex justify-between mb-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold">Summary</h2>
        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Toggle Theme
        </button>
      </div>

      <div className="max-w-3xl mx-auto">
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {renderStepForm()}
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => (editStep > 0 ? setEditStep(editStep - 1) : setIsEditing(false))}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Back
              </button>
              {editStep < stepTitles.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setEditStep(editStep + 1)}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Next
                </button>
              ) : (
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                  Save
                </button>
              )}
            </div>
          </form>
        ) : (
          <>
            {[personalInfo, employeeDetails, loanDetails, documentUpdates].map((section, i) => (
              <div key={i} className="mb-6 p-4 bg-white rounded shadow">
                <h3 className="text-xl font-semibold mb-2">{stepTitles[i]}</h3>
                <ul>
                  {Object.entries(section).map(([key, value]) => (
                    <li key={key} className="mb-1">
                      <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</strong>{' '}
                      {value?.toString() || 'N/A'}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setEditStep(i);
                  }}
                  className="mt-2 text-sm text-blue-600 underline"
                >
                  Edit
                </button>
              </div>
            ))}
            <div className="flex justify-between">
              <button
                onClick={() => navigate('/apply/document-updates')}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Back
              </button>
              <button
                onClick={() => navigate('/apply/review')}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Continue to Review
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Summary;

