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

const stepTitles = ['Personal Info', 'Employee Details', 'Loan Details', 'Document Updates'];

const Summary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { personalInfo, employeeDetails, loanDetails, documentUpdates } = useSelector(
    (state) => state.formData || {}
  );
  const theme = useSelector((state) => state.theme.theme);

  // Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editStep, setEditStep] = useState(0);

  // Local states for editing forms
  const [localPersonalInfo, setLocalPersonalInfo] = useState({});
  const [localEmployeeDetails, setLocalEmployeeDetails] = useState({});
  const [localLoanDetails, setLocalLoanDetails] = useState({});
  const [localDocumentUpdates, setLocalDocumentUpdates] = useState({});

  const { reset, handleSubmit } = useForm();

  // Initialize/reset form on mount or personalInfo changes
  useEffect(() => {
    if (!personalInfo?.name) {
      alert('No user data available. Please complete the form steps before accessing the summary.');
      navigate('/apply/document-updates');
      return;
    }
    // Reset form (react-hook-form) with default empty values - optional if you want to use RHF on edit
    reset({
      personalInfo: { name: '', dob: '', phone: '', email: '' },
      employeeDetails: { status: '', company: '', income: '', experience: '', taxId: '' },
      loanDetails: { amount: '', type: '', repaymentTerm: '', emiDate: '' },
      documentUpdates: { isUpdated: '' },
    });
  }, [personalInfo, navigate, reset]);

  // Save changes on submit
  const onSubmit = () => {
    dispatch(setPersonalInfo(localPersonalInfo));
    dispatch(setEmployeeDetails(localEmployeeDetails));
    dispatch(setLoanDetails(localLoanDetails));
    dispatch(setDocumentUpdates(localDocumentUpdates));
    alert('Changes saved!');
    setIsEditing(false);
    setEditStep(0);
  };

  // Render form inputs for each edit step
  const renderStepForm = () => {
    switch (editStep) {
      case 0:
        return ['name', 'dob', 'phone', 'email'].map((field) => (
          <div key={field} className="mb-4">
            <label className="block font-semibold mb-1 capitalize">{field}</label>
            <input
              list={`${field}-options`}
              value={localPersonalInfo[field] || ''}
              onChange={(e) =>
                setLocalPersonalInfo((prev) => ({ ...prev, [field]: e.target.value }))
              }
              className="w-full border rounded px-4 py-2"
              type={field === 'email' ? 'email' : 'text'}
            />
            <datalist id={`${field}-options`}>
              {field === 'name' && <>
                <option value="gourab" />
                <option value="bob" />
              </>}
              {field === 'dob' && <>
                <option value="21.05.2025" />
                <option value="22.05.2025" />
              </>}
              {field === 'phone' && <>
                <option value="01700" />
                <option value="01654" />
              </>}
              {field === 'email' && <>
                <option value="aborty@gmail.com" />
                <option value="a@gmail.com" />
              </>}
            </datalist>
          </div>
        ));
      case 1:
        return ['status', 'company', 'income', 'experience', 'taxId'].map((field) => (
          <div key={field} className="mb-4">
            <label className="block font-semibold mb-1 capitalize">{field}</label>
            <input
              list={`${field}-options`}
              value={localEmployeeDetails[field] || ''}
              onChange={(e) =>
                setLocalEmployeeDetails((prev) => ({ ...prev, [field]: e.target.value }))
              }
              type={['income', 'experience'].includes(field) ? 'number' : 'text'}
              className="w-full border rounded px-4 py-2"
            />
            <datalist id={`${field}-options`}>
              {field === 'status' && <>
                <option value="Full-Time" />
                <option value="Part-Time" />
                <option value="Contract" />
              </>}
              {field === 'company' && <>
                <option value="Google" />
                <option value="Amazon" />
                <option value="Facebook" />
              </>}
              {field === 'income' && <>
                <option value="2000" />
                <option value="3000" />
                <option value="4000" />
              </>}
              {field === 'experience' && <>
                <option value="1" />
                <option value="2" />
                <option value="3" />
                <option value="5" />
              </>}
              {field === 'taxId' && <>
                <option value="TIN1234" />
                <option value="TIN5678" />
              </>}
            </datalist>
          </div>
        ));
      case 2:
        return ['amount', 'type', 'repaymentTerm', 'emiDate'].map((field) => (
          <div key={field} className="mb-4">
            <label className="block font-semibold mb-1 capitalize">{field}</label>
            <input
              value={localLoanDetails[field] || ''}
              onChange={(e) =>
                setLocalLoanDetails((prev) => ({ ...prev, [field]: e.target.value }))
              }
              type={['amount', 'repaymentTerm'].includes(field) ? 'number' : 'text'}
              className="w-full border rounded px-4 py-2"
            />
          </div>
        ));
      case 3:
        return (
          <div className="mb-4">
            <label className="block font-semibold mb-1">ID Updated</label>
            <select
              value={localDocumentUpdates.isUpdated || ''}
              onChange={(e) =>
                setLocalDocumentUpdates((prev) => ({ ...prev, isUpdated: e.target.value }))
              }
              className="w-full border rounded px-4 py-2"
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  // Helper to render comma-separated values as bullet list or N/A if empty
  const renderMultipleValues = (value) => {
    if (!value) return 'N/A';
    const values = value.split(',').map((v) => v.trim()).filter(Boolean);
    if (values.length === 0) return 'N/A';
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

      {/* Progress bar */}
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
          // Display summary sections with edit buttons
          stepTitles.map((title, idx) => {
            let content;
            switch (title) {
              case 'Personal Info':
                content = [
                  { label: 'Name', value: personalInfo?.name },
                  { label: 'Date of Birth', value: personalInfo?.dob },
                  { label: 'Phone', value: personalInfo?.phone },
                  { label: 'Email', value: personalInfo?.email },
                ];
                break;
              case 'Employee Details':
                content = [
                  { label: 'Status', value: employeeDetails?.status },
                  { label: 'Company', value: employeeDetails?.company },
                  { label: 'Monthly Income', value: employeeDetails?.income },
                  { label: 'Experience', value: employeeDetails?.experience },
                  { label: 'Tax ID', value: employeeDetails?.taxId },
                ];
                break;
              case 'Loan Details':
                content = [
                  { label: 'Amount', value: loanDetails?.amount },
                  { label: 'Type', value: loanDetails?.type },
                  { label: 'Term', value: loanDetails?.repaymentTerm },
                  { label: 'EMI Date', value: loanDetails?.emiDate },
                ];
                break;
              case 'Document Updates':
                content = [
                  {
                    label: 'ID Updated',
                    value: documentUpdates?.isUpdated === 'false' ? 'No' : 'Yes',
                  },
                ];
                break;
              default:
                content = [];
            }

            return (
              <div key={title} className="border rounded p-5 bg-gray-50 shadow-sm">
                <h3 className="font-semibold text-xl mb-3">{title}</h3>
                <ul className="space-y-2">
                  {content.map(({ label, value }) => (
                    <li key={label} className="flex justify-between border-b pb-1">
                      <span>{label}:</span>
                      <span>{renderMultipleValues(value)}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setEditStep(idx);
                    // Initialize local state with current values on edit
                    if (title === 'Personal Info') setLocalPersonalInfo(personalInfo || {});
                    if (title === 'Employee Details') setLocalEmployeeDetails(employeeDetails || {});
                    if (title === 'Loan Details') setLocalLoanDetails(loanDetails || {});
                    if (title === 'Document Updates') setLocalDocumentUpdates(documentUpdates || {});
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit {title}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Summary;
