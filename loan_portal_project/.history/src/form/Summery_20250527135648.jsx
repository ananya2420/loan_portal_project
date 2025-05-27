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

  // Initialize react-hook-form with nested defaultValues
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    getValues,
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      personalInfo,
      employeeDetails,
      loanDetails,
      documentUpdates,
    },
  });

  // Reset form values whenever Redux store changes
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

  // Validate current step fields before going to next
  const handleNext = async () => {
    let fieldsToValidate = [];
    switch (editStep) {
      case 0:
        fieldsToValidate = [
          'personalInfo.name',
          'personalInfo.dob',
          'personalInfo.phone',
          'personalInfo.email',
        ];
        break;
      case 1:
        fieldsToValidate = [
          'employeeDetails.company',
          'employeeDetails.status',
          'employeeDetails.income',
          'employeeDetails.experience',
          'employeeDetails.taxId',
        ];
        break;
      case 2:
        fieldsToValidate = [
          'loanDetails.amount',
          'loanDetails.type',
          'loanDetails.repaymentTerm',
          'loanDetails.emiDate',
        ];
        break;
      case 3:
        fieldsToValidate = ['documentUpdates.isUpdated'];
        break;
      default:
        break;
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setEditStep(editStep + 1);
    }
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
                  {...register(`personalInfo.${field}`, {
                    required: `${field} is required`,
                    ...(field === 'email' && {
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email address',
                      },
                    }),
                  })}
                  className="w-full border rounded px-3 py-1.5 text-sm"
                  type={field === 'email' ? 'email' : field === 'dob' ? 'date' : 'text'}
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
                  type={field === 'income' ? 'number' : 'text'}
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
                  type={field === 'amount' ? 'number' : field === 'emiDate' ? 'date' : 'text'}
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
              defaultValue={documentUpdates.isUpdated === true ? 'true' : documentUpdates.isUpdated === false ? 'false' : ''}
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
          className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm shadow-md"
          type="button"
        >
          Toggle Theme
        </button>
      </div>

      {/* Step indicator */}
      <div className="max-w-3xl mx-auto mb-1">
        <div className="mb-6 grid grid-cols-8 gap-x-0 gap-y-0 text-xs font-semibold text-center">
          {[
            { step: 1, label: 'Apply' },
            { step: 2, label: <>Personal<br />Info</> },
            { step: 3, label: <>Employee<br />Details</> },
            { step: 4, label: <>Loan<br />Details</> },
            { step: 5, label: <>Document<br />Updates</> },
            { step: 6, label: 'Summary' },
            { step: 7, label: 'Review' },
            { step: 8, label: 'Thank You' },
          ].map((stepLabel, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === 6;
            return (
              <div
                key={stepLabel.step || stepLabel.label}
                onClick={() => {
                  if (stepNumber === 5) navigate('/apply/document-updates');
                  if (stepNumber === 7) navigate('/apply/review');
                }}
                className={`flex flex-col items-center cursor-pointer ${isActive ? 'text-indigo-600 font-bold' : 'text-gray-600'}`}
                style={{ minWidth: '70px' }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    if (stepNumber === 5) navigate('/apply/document-updates');
                    if (stepNumber === 7) navigate('/apply/review');
                  }
                }}
              >
                <div
                  className={`rounded-full w-6 h-6 flex items-center justify-center mb-1 border ${
                    isActive ? 'border-indigo-600 bg-indigo-100' : 'border-gray-300 bg-gray-100'
                  }`}
                >
                  {stepNumber}
                </div>
                <div className="whitespace-nowrap">{stepLabel.label}</div>
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
        className={`max-w-3xl mx-auto p-6 border rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
      >
        {!isEditing ? (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center">Summary</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Personal Info</h3>
                <ul className="text-sm text-gray-700">
                  <li><strong>Name:</strong> {personalInfo?.name || 'N/A'}</li>
                  <li><strong>Date of Birth:</strong> {personalInfo?.dob || 'N/A'}</li>
                  <li><strong>Phone:</strong> {personalInfo?.phone || 'N/A'}</li>
                  <li><strong>Email:</strong> {personalInfo?.email || 'N/A'}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Employee Details</h3>
                <ul className="text-sm text-gray-700">
                  <li><strong>Company:</strong> {employeeDetails?.company || 'N/A'}</li>
                  <li><strong>Status:</strong> {employeeDetails?.status || 'N/A'}</li>
                  <li><strong>Income:</strong> {employeeDetails?.income || 'N/A'}</li>
                  <li><strong>Experience:</strong> {employeeDetails?.experience || 'N/A'}</li>
                  <li><strong>Tax ID:</strong> {employeeDetails?.taxId || 'N/A'}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Loan Details</h3>
                <ul className="text-sm text-gray-700">
                  <li><strong>Amount:</strong> {loanDetails?.amount || 'N/A'}</li>
                  <li><strong>Type:</strong> {loanDetails?.type || 'N/A'}</li>
                  <li><strong>Repayment Term:</strong> {loanDetails?.repaymentTerm || 'N/A'}</li>
                  <li><strong>EMI Date:</strong> {loanDetails?.emiDate || 'N/A'}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Document Updates</h3>
                <p>{documentUpdates?.isUpdated === 'true' || documentUpdates?.isUpdated === true ? 'ID Updated' : 'No ID update'}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setEditStep(0);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                type="button"
              >
                Edit
              </button>
              <button
                onClick={() => navigate('/apply/review')}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                type="button"
              >
                Continue
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {renderStepForm()}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => {
                  if (editStep > 0) {
                    setEditStep(editStep - 1);
                  } else {
                    setIsEditing(false);
                    setEditStep(0);
                    reset({
                      personalInfo,
                      employeeDetails,
                      loanDetails,
                      documentUpdates,
                    });
                  }
                }}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Back
              </button>

              {editStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save Changes
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Summary;
