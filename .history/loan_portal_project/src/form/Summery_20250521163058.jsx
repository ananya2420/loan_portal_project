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

  const [localPersonalInfo, setLocalPersonalInfo] = useState({});
  const [localEmployeeDetails, setLocalEmployeeDetails] = useState({});
  const [localLoanDetails, setLocalLoanDetails] = useState({});
  const [localDocumentUpdates, setLocalDocumentUpdates] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!personalInfo?.name) {
      alert('No user data available. Please complete the form steps before accessing the summary.');
      navigate('/apply/document-updates');
    } else {
      reset({
        personalInfo: {
          name: '',
          dob: '',
          phone: '',
          email: '',
        },
        employeeDetails: {
          status: '',
          company: '',
          income: '',
          experience: '',
          taxId: '',
        },
        loanDetails: {
          amount: '',
          type: '',
          repaymentTerm: '',
          emiDate: '',
        },
        documentUpdates: {
          isUpdated: '',
        },
      });
    }
  }, [personalInfo, employeeDetails, loanDetails, documentUpdates, reset, navigate]);

  const stepTitles = ['Personal Info', 'Employee Details', 'Loan Details', 'Document Updates'];

  const onSubmit = () => {
    dispatch(setPersonalInfo(localPersonalInfo));
    dispatch(setEmployeeDetails(localEmployeeDetails));
    dispatch(setLoanDetails(localLoanDetails));
    dispatch(setDocumentUpdates(localDocumentUpdates));
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
            {['name', 'dob', 'phone', 'email'].map((field) => (
              <div key={field} className="mb-4">
                <label className="block font-semibold mb-1 capitalize">{field}</label>
                <input
                  {...(field === 'name' ? { list: 'name-options' } : {})}
                  {...(field === 'dob' ? { list: 'dob-options' } : {})}
                  {...(field === 'phone' ? { list: 'phone-options' } : {})}
                  {...(field === 'email' ? { list: 'email-options' } : {})}
                  value={localPersonalInfo[field] || ''}
                  onChange={(e) =>
                    setLocalPersonalInfo({ ...localPersonalInfo, [field]: e.target.value })
                  }
                  className="w-full border rounded px-4 py-2"
                  type={field === 'email' ? 'email' : 'text'}
                />
                {field === 'name' && (
                  <datalist id="name-options">
                    <option value="gourab" />
                    <option value="bob" />
                  </datalist>
                )}
                {field === 'dob' && (
                  <datalist id="dob-options">
                    <option value="21.05.2025" />
                    <option value="22.05.2025" />
                  </datalist>
                )}
                {field === 'phone' && (
                  <datalist id="phone-options">
                    <option value="01700" />
                    <option value="01654" />
                  </datalist>
                )}
                {field === 'email' && (
                  <datalist id="email-options">
                    <option value="aborty@gmail.com" />
                    <option value="a@gmail.com" />
                  </datalist>
                )}
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
            {['status', 'company', 'income', 'experience', 'taxId'].map((field) => (
              <div key={field} className="mb-4">
                <label className="block font-semibold mb-1 capitalize">{field}</label>
                <input
                  list={field === 'status' ? 'status-options' : undefined}
                  value={localEmployeeDetails[field] || ''}
                  onChange={(e) =>
                    setLocalEmployeeDetails({ ...localEmployeeDetails, [field]: e.target.value })
                  }
                  type={['income', 'experience'].includes(field) ? 'number' : 'text'}
                  className="w-full border rounded px-4 py-2"
                />
                {field === 'status' && (
                  <datalist id="status-options">
                    <option value="Full Time" />
                    <option value="Part Time" />
                    <option value="Contract" />
                    <option value="Intern" />
                    <option value="Freelancer" />
                  </datalist>
                )}
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
            {['amount', 'type', 'repaymentTerm', 'emiDate'].map((field) => (
              <div key={field}>
                <label className="block font-semibold mb-1 capitalize">{field}</label>
                <input
                  value={localLoanDetails[field] || ''}
                  onChange={(e) =>
                    setLocalLoanDetails({ ...localLoanDetails, [field]: e.target.value })
                  }
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
            <label className="block font-semibold mb-1">ID Updated</label>
            <select
              value={localDocumentUpdates.isUpdated || ''}
              onChange={(e) =>
                setLocalDocumentUpdates({ ...localDocumentUpdates, isUpdated: e.target.value })
              }
              className="w-full border rounded px-4 py-2"
            >
              <option value="">Select</option>
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
    const values = value.split(/[,]/).map((v) => v.trim()).filter((v) => v.length > 0);
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
            {[{
              title: 'Personal Info',
              content: [
                { label: 'Name', value: personalInfo?.name || 'N/A' },
                { label: 'Date of Birth', value: personalInfo?.dob || 'N/A' },
                { label: 'Phone', value: personalInfo?.phone || 'N/A' },
                { label: 'Email', value: personalInfo?.email || 'N/A' },
              ],
            },
            {
              title: 'Employee Details',
              content: [
                { label: 'Status', value: employeeDetails?.status || 'N/A' },
                { label: 'Company', value: employeeDetails?.company || 'N/A' },
                { label: 'Monthly Income', value: employeeDetails?.income || 'N/A' },
                { label: 'Experience', value: employeeDetails?.experience || 'N/A' },
                { label: 'Tax ID', value: employeeDetails?.taxId || 'N/A' },
              ],
            },
            {
              title: 'Loan Details',
              content: [
                { label: 'Amount', value: loanDetails?.amount || 'N/A' },
                { label: 'Type', value: loanDetails?.type || 'N/A' },
                { label: 'Term', value: loanDetails?.repaymentTerm || 'N/A' },
                { label: 'EMI Date', value: loanDetails?.emiDate || 'N/A' },
              ],
            },
            {
              title: 'Document Updates',
              content: [
                {
                  label: 'ID Updated',
                  value: documentUpdates?.isUpdated === 'false' ? 'No' : 'Yes',
                },
              ],
            }].map(({ title, content }) => (
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
                    setEditStep(steps.indexOf(title));
                    if (title === 'Personal Info') setLocalPersonalInfo(personalInfo);
                    if (title === 'Employee Details') setLocalEmployeeDetails(employeeDetails);
                    if (title === 'Loan Details') setLocalLoanDetails(loanDetails);
                    if (title === 'Document Updates') setLocalDocumentUpdates(documentUpdates);
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit {title}
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Summary;
