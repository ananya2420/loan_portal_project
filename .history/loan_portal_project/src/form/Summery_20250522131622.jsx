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

const Summary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { personalInfo, employeeDetails, loanDetails, documentUpdates } =
    useSelector((state) => state.formData || {});

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
            <h3 className="text-lg font-semibold mb-2">Edit Personal Information</h3>
            {['name', 'dob', 'phone', 'email'].map((field) => (
              <div key={field}>
                <label className="block font-semibold mb-1 capitalize">{field}</label>
                <select
                  {...register(`personalInfo.${field}`, { required: `${field} is required` })}
                  className="w-full border rounded px-3 py-1.5 text-sm"
                >
                  <option value="">Select {field}</option>
                  {field === 'name' && ['gourab', 'bob'].map((v) => <option key={v}>{v}</option>)}
                  {field === 'dob' && ['21.5.2025'].map((v) => <option key={v}>{v}</option>)}
                  {field === 'phone' && ['01700', '01654'].map((v) => <option key={v}>{v}</option>)}
                  {field === 'email' && ['aborty@gmail.com', 'a@gmail.com'].map((v) => <option key={v}>{v}</option>)}
                </select>
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
            {[
              { name: 'company', options: ['Brain station', 'tech solution'] },
              { name: 'status', options: ['part time', 'full time'] },
              { name: 'income', options: ['10000', '12000', '15000'] },
              { name: 'experience', options: ['5', '6'] },
            ].map(({ name, options }) => (
              <div key={name}>
                <label className="block font-semibold mb-1 capitalize">{name}</label>
                <select
                  {...register(`employeeDetails.${name}`, { required: `${name} is required` })}
                  className="w-full border rounded px-3 py-1.5 text-sm"
                >
                  <option value="">Select {name}</option>
                  {options.map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
                {errors?.employeeDetails?.[name] && (
                  <p className="text-red-500 text-xs mt-1">{errors.employeeDetails[name].message}</p>
                )}
              </div>
            ))}
            <div>
              <label className="block font-semibold mb-1 capitalize">Tax ID</label>
              <input
                {...register(`employeeDetails.taxId`, { required: 'Tax ID is required' })}
                type="text"
                className="w-full border rounded px-3 py-1.5 text-sm"
              />
              {errors?.employeeDetails?.taxId && (
                <p className="text-red-500 text-xs mt-1">{errors.employeeDetails.taxId.message}</p>
              )}
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h3 className="text-lg font-semibold mb-2">Edit Loan Details</h3>
            {[
              { name: 'amount', options: ['20000', '50000'] },
              { name: 'type', options: ['home loan', 'auto loan'] },
              { name: 'repaymentTerm', options: ['6', '12', '24'] },
              { name: 'emiDate', options: ['21.5.2025', '22.5.2025'] },
            ].map(({ name, options }) => (
              <div key={name}>
                <label className="block font-semibold mb-1 capitalize">{name.replace(/([A-Z])/g, ' $1')}</label>
                <select
                  {...register(`loanDetails.${name}`, { required: `${name} is required` })}
                  className="w-full border rounded px-3 py-1.5 text-sm"
                >
                  <option value="">Select {name}</option>
                  {options.map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
                {errors?.loanDetails?.[name] && (
                  <p className="text-red-500 text-xs mt-1">{errors.loanDetails[name].message}</p>
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
              <p className="text-red-500 text-xs mt-1">
                {errors.documentUpdates.isUpdated.message}
              </p>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="max-w-3xl mx-auto mb-4">
        <ProgressBar currentStep={5} totalSteps={5} />
      </div>

      <div className="max-w-3xl mx-auto mb-2 flex justify-end">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-3 py-1.5 bg-indigo-600 text-white rounded text-sm"
        >
          Toggle Theme
        </button>
      </div>

      <div className="flex justify-between max-w-md mx-auto mb-4 px-2">
        {[
          'Apply',
          'Personal Info',
          'Employee Details',
          'Loan Details',
          'Document Updates',
          'Summary',
          'Review',
          'Thank You',
        ].map((label, index) => {
          const isActive = label === 'Summary';
          return (
            <div key={label} className="flex flex-col items-center w-1/8">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs mb-1 ${
                  isActive ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              <div className={`text-[10px] text-center ${isActive ? 'font-bold text-blue-600' : 'text-gray-600'}`}>
                {label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full max-w-md mx-auto">
        <div className="relative pt-1 mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="px-2 py-1 text-xs font-semibold text-teal-600 uppercase bg-teal-200 rounded-full">
              Step 6 of 8
            </span>
            <span className="text-xs font-semibold text-teal-600">60%</span>
          </div>
          <div className="h-1.5 bg-teal-200 rounded">
            <div className="h-full bg-green-500 w-1/2 transition-all duration-500" />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 rounded-xl shadow bg-white space-y-5">
        <h2 className="text-2xl font-bold text-center">Summary</h2>

        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded bg-gray-50 space-y-4">
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
            {[
              {
                title: 'Personal Information',
                content: [
                  { label: 'Name', value: 'Gourab' },
                  { label: 'Date of Birth', value: '21.05.2025' },
                  { label: 'Phone', value: '01700' },
                  { label: 'Email', value: 'aborty@gmail.com' },
                ],
              },
              {
                title: 'Employee Details',
                content: [
                  { label: 'Status', value: 'Full time' },
                  { label: 'Company', value: 'Brain Station' },
                  { label: 'Monthly Income', value: '10,000' },
                  { label: 'Experience', value: '5 years' },
                  { label: 'Tax ID', value: 'tx555055' },
                ],
              },
              {
                title: 'Loan Details',
                content: [
                  { label: 'Amount', value: '20000' },
                  { label: 'Type', value: 'Home Loan' },
                  { label: 'Term', value: '6 months' },
                  { label: 'EMI Date', value: '21.5.25' },
                ],
              },
              {
                title: 'Document Updates',
                content: [{ label: 'ID Updated', value: documentUpdates?.isUpdated === 'false' ? 'No' : 'Yes' }],
              },
            ].map((section, i) => (
              <section key={i} className="p-4 rounded border bg-gray-50 space-y-2">
                <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {section.content.map((item, j) => (
                    <p key={j}>
                      <strong>{item.label}:</strong> {item.value || 'N/A'}
                    </p>
                  ))}
                </div>
              </section>
            ))}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => navigate('/apply/document-updates')}
                className="px-4 py-1.5 bg-gray-400 text-white rounded text-sm"
              >
                Back
              </button>
            {/*  <button
                onClick={() => {
                  setIsEditing(true);
                  setEditStep(0);
                }}
                className="px-4 py-1.5 bg-yellow-500 text-white rounded text-sm"
              >
                Edit Summary
              </button>
              */} 
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