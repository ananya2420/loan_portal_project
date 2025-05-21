// Summary.js
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
import ProgressBar from '../components/progressbar';

const fieldGroups = [
  {
    title: 'Edit Personal Information',
    stepKey: 'personalInfo',
    fields: [
      { name: 'name', label: 'Name', type: 'select', options: ['gourab', 'bob'] },
      { name: 'dob', label: 'Date of Birth', type: 'select', options: ['21.5.2025'] },
      { name: 'phone', label: 'Phone', type: 'select', options: ['01700', '01654'] },
      { name: 'email', label: 'Email', type: 'select', options: ['aborty@gmail.com', 'a@gmail.com'] },
    ],
  },
  {
    title: 'Edit Employee Details',
    stepKey: 'employeeDetails',
    fields: [
      { name: 'company', label: 'Company', type: 'select', options: ['Brain station', 'tech solution'] },
      { name: 'status', label: 'Status', type: 'select', options: ['part time', 'full time'] },
      { name: 'income', label: 'Monthly Income', type: 'select', options: ['10000', '12000', '15000'] },
      { name: 'experience', label: 'Experience (years)', type: 'select', options: ['5', '6'] },
      { name: 'taxId', label: 'Tax ID', type: 'input' },
    ],
  },
  {
    title: 'Edit Loan Details',
    stepKey: 'loanDetails',
    fields: [
      { name: 'amount', label: 'Amount', type: 'select', options: ['20000', '50000'] },
      { name: 'type', label: 'Type', type: 'select', options: ['home loan', 'auto loan'] },
      { name: 'repaymentTerm', label: 'Repayment Term (months)', type: 'select', options: ['6', '12', '24'] },
      { name: 'emiDate', label: 'Preferred EMI Date', type: 'select', options: ['21.5.2025', '22.5.2025'] },
    ],
  },
  {
    title: 'Edit Document Updates',
    stepKey: 'documentUpdates',
    fields: [
      {
        name: 'isUpdated',
        label: 'ID Updated',
        type: 'select',
        options: ['true', 'false'],
      },
    ],
  },
];

const FormField = ({ register, errors, stepKey, field }) => {
  const fieldPath = `${stepKey}.${field.name}`;
  const commonProps = {
    className: 'w-full border rounded px-4 py-2',
    ...register(fieldPath, { required: `${field.label} is required` }),
  };

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1 capitalize">{field.label}</label>
      {field.type === 'select' ? (
        <select {...commonProps}>
          <option value="">Select {field.label}</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input {...commonProps} type="text" />
      )}
      {errors?.[stepKey]?.[field.name] && (
        <p className="text-red-500 text-sm mt-1">{errors[stepKey][field.name].message}</p>
      )}
    </div>
  );
};

const Summary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { personalInfo, employeeDetails, loanDetails, documentUpdates } = useSelector((state) => state.formData || {});
  const theme = useSelector((state) => state.theme.theme);

  const [isEditing, setIsEditing] = useState(false);
  const [editStep, setEditStep] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { personalInfo, employeeDetails, loanDetails, documentUpdates },
  });

  useEffect(() => {
    if (!personalInfo?.name) {
      alert('No user data available. Please complete the form steps before accessing the summary.');
      navigate('/apply/document-updates');
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
    setEditStep(0);
  };

  const stepData = fieldGroups[editStep];

  return (
    <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="max-w-4xl mx-auto mb-6">
        <ProgressBar currentStep={5} totalSteps={5} />
      </div>

      <div className="max-w-4xl mx-auto mb-4 flex justify-end">
        <button onClick={() => dispatch(toggleTheme())} className="px-4 py-2 bg-indigo-600 text-white rounded text-sm">
          Toggle Theme
        </button>
      </div>

      {/* Summary content */}
      <div className="max-w-4xl mx-auto p-6 rounded-xl shadow-lg space-y-6 bg-white">
        <h2 className="text-3xl font-bold text-center">Summary</h2>

        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto bg-gray-50 p-5 border rounded-lg">
            <h3 className="text-xl font-semibold text-center">{stepData.title}</h3>
            {stepData.fields.map((field) => (
              <FormField key={field.name} stepKey={stepData.stepKey} field={field} register={register} errors={errors} />
            ))}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => {
                  if (editStep > 0) setEditStep((prev) => prev - 1);
                  else {
                    setIsEditing(false);
                    setEditStep(0);
                    navigate('/apply/summary');
                  }
                }}
                className="px-6 py-2 bg-gray-400 text-white rounded"
              >
                Back
              </button>

              {editStep < fieldGroups.length - 1 ? (
                <button type="button" onClick={() => setEditStep((prev) => prev + 1)} className="px-6 py-2 bg-blue-600 text-white rounded">
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
            {/* Summary display (unchanged) */}
            {/* ... insert the mapped summary sections from your original code here ... */}

            <div className="flex justify-between mt-6">
              <button onClick={() => navigate('/apply/document-updates')} className="px-5 py-2 bg-gray-400 text-white rounded">
                Back
              </button>
              <button
                onClick={() => {
                  setIsEditing(true);
                  setEditStep(0);
                }}
                className="px-6 py-2 bg-yellow-500 text-white font-medium rounded"
              >
                Edit Summary
              </button>
              <button onClick={() => navigate('/apply/review')} className="px-5 py-2 bg-blue-600 text-white rounded">
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
