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
    // Render logic omitted for brevity
    return null;
  };

  return (
    <div className={`min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      
      <div className="max-w-3xl mx-auto mb-2 flex justify-end">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-3 py-1.5 bg-indigo-600 text-white rounded text-sm"
        >
          Toggle Theme
        </button>
      </div>

      <div className="max-w-3xl mx-auto mb-2">
        <div className="flex justify-between text-xs font-semibold text-gray-500 dark:text-gray-400">
          {[
            'Apply', 'Personal Info', 'Employee Details', 'Loan Details',
            'Document Updates', 'Summary', 'Review', 'Thank you',
          ].map((stepLabel, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === 6;
            return (
              <div
                key={stepLabel}
                className={`flex flex-col items-center w-full ${isActive ? 'text-indigo-600 font-bold' : ''}`}
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

      <div className={`max-w-3xl mx-auto p-4 rounded-xl shadow ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} space-y-5`}>
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
            {/* Summary display logic here */}
            <div className="flex flex-wrap gap-2 justify-between mt-4">
              <button
                onClick={() => navigate('/apply/document-updates')}
                className="px-4 py-1.5 bg-gray-400 text-white rounded text-sm"
              >
                Back
              </button>

              <button
                onClick={() => navigate('/apply/full-summary')}
                className="px-4 py-1.5 bg-gray-700 text-white rounded text-sm"
              >
                View Full Summary
              </button>

              <button
                onClick={() => navigate('/apply/review')}
                className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm"
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
