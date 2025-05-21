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
    const fieldNames = {
      0: ['name', 'dob', 'phone', 'email'],
      1: ['status', 'company', 'income', 'experience', 'taxId'],
      2: ['amount', 'type', 'repaymentTerm', 'emiDate'],
    };

    if (editStep === 3) {
      return (
        <>
          <h3 className="text-xl font-semibold mb-4">Edit Document Updates</h3>
          <label className="block font-semibold mb-1">ID Updated</label>
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
    }

    return (
      <>
        <h3 className="text-xl font-semibold mb-4">{stepTitles[editStep]}</h3>
        {fieldNames[editStep].map((field) => {
          const name = `${['personalInfo', 'employeeDetails', 'loanDetails'][editStep]}.${field}`;
          const isNumber = ['income', 'experience', 'amount', 'repaymentTerm'].includes(field);
          return (
            <div key={field} className="mb-4">
              <label className="block font-semibold mb-1 capitalize">{field}</label>
              <input
                {...register(name, { required: `${field} is required` })}
                type={isNumber ? 'number' : 'text'}
                className="w-full border rounded px-4 py-2"
              />
              {errors?.[name.split('.')[0]]?.[field] && (
                <p className="text-red-500 text-sm mt-1">{errors[name.split('.')[0]][field].message}</p>
              )}
            </div>
          );
        })}
      </>
    );
  };

  const renderMultipleValues = (value) => {
    if (!value) return 'N/A';
    const values = value.split(/[\/,"]/).map((v) => v.trim()).filter(Boolean);
    return (
      <ul className="list-disc list-inside ml-4">
        {values.map((val, idx) => (
          <li key={idx}>{val}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className={`min-h-screen p-6 transition-all duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="max-w-4xl mx-auto mb-4 flex justify-end">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
        >
          Toggle Theme
        </button>
      </div>

      {/* Stepper */}
      <div className="flex justify-between max-w-4xl mx-auto mb-6 px-4">
        {steps.map((label, index) => {
          const isActive = label === 'Summary';
          return (
            <div key={label} className="flex flex-col items-center w-1/8">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>{index + 1}</div>
              <div className={`text-xs text-center ${isActive ? 'font-bold text-blue-600' : 'text-gray-600'}`}>{label}</div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md mx-auto mb-6">
        <div className="relative pt-1">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-teal-600 uppercase bg-teal-200 rounded-full">Step 6 of 8</span>
            <span className="text-xs font-semibold text-teal-600">75%</span>
          </div>
          <div className="flex h-2 overflow-hidden text-xs bg-teal-200 rounded">
            <div style={{ width: '75%' }} className="flex flex-col justify-center text-center text-white transition-all duration-500 bg-green-500" />
          </div>
        </div>
      </div>

      {/* Main Summary Box */}
      <div className="max-w-4xl mx-auto p-6 rounded-xl shadow-lg space-y-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-6">Summary</h2>

        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="border p-5 rounded-lg space-y-5 max-w-lg mx-auto bg-gray-50 border-gray-200">
            {renderStepForm()}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                disabled={editStep === 0}
                onClick={() => setEditStep((prev) => prev - 1)}
                className="px-6 py-2 bg-gray-400 text-white rounded disabled:opacity-50"
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
            {[
              { title: 'Personal Information', data: personalInfo },
              { title: 'Employee Details', data: employeeDetails },
              { title: 'Loan Details', data: loanDetails },
              {
                title: 'Document Updates',
                data: { 'ID Updated': documentUpdates?.isUpdated === 'false' ? 'No' : 'Yes' },
              },
            ].map((section, i) => (
              <section key={i} className="p-5 rounded-lg border bg-gray-50 border-gray-200">
                <h3 className="text-xl font-semibold mb-3">{section.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(section.data || {}).map(([label, value], j) => (
                    <div key={j} className="text-sm">
                      <strong>{label}:</strong> {renderMultipleValues(value)}
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <div className="flex justify-between mt-6">
              <button
                onClick={() => navigate('/apply/document-updates')}
                className="px-5 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Back
              </button>

              <button
                onClick={() => {
                  setIsEditing(true);
                  setEditStep(0);
                }}
                className="px-6 py-2 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600"
              >
                Edit Summary
              </button>

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
