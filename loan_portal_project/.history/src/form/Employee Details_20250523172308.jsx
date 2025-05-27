// src/pages/EmployeeDetails.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setEmployeeDetails } from '../store/formSlice';
import { toggleTheme } from '../redux/slices/themeSlice';
import ProgressBar from '../components/progressbar';

const EmployeeDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme.theme);
  const savedData = useSelector((state) => state.formData.employeeDetails);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: savedData || {
      company: '',
      income: '',
      status: '',
      experience: '',
      taxId: '',
    },
  });

  const [currentStep] = useState(3);
  const totalSteps = 8;

  const [focusedField, setFocusedField] = useState('');
  const [hoverField, setHoverField] = useState('');

  const validCompanies = ['Google', 'Amazon', 'Microsoft', 'Apple', 'Meta'];

  useEffect(() => {
    if (savedData) {
      Object.entries(savedData).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [savedData, setValue]);

  const onSubmit = (data) => {
    dispatch(setEmployeeDetails(data));
    navigate('/apply/loan-details');
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleBack = () => {
    navigate('/apply/personal-info');
  };

  const inputTextClass = theme === 'dark' ? 'text-white' : 'text-black';

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div className="w-full max-w-md">
        {/* Theme Toggle and Progress Bar */}
        <div className="flex items-center justify-between mb-4">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          <button
            onClick={handleToggleTheme}
            className="px-3 py-1 ml-4 text-sm text-white transition bg-emerald-600 rounded hover:bg-emerald-700"
          >
            Toggle Theme
          </button>
        </div>

        {/* Step Indicator */}
        <div className="mb-6 grid grid-cols-8 gap-x-3 gap-y-2 text-xs font-semibold text-center text-purple-600">
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
            <div key={step} className="flex flex-col items-center col-span-1">
              <span
                className={`w-7 h-7 flex items-center justify-center rounded-full font-bold ${
                  step === currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-purple-200 text-purple-600'
                }`}
              >
                {step}
              </span>
              <span
                className="mt-1 truncate"
                title={typeof label === 'string' ? label : undefined}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Info */}
        <div className="relative pt-1 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-purple-700 uppercase bg-purple-200 rounded-full">
              Step 3 of 8
            </span>
            <span className="text-xs font-semibold text-purple-700">30%</span>
          </div>
          <div className="flex h-2 overflow-hidden text-xs bg-purple-200 rounded">
            <div
              style={{ width: '30%' }}
              className="flex flex-col justify-center text-center text-white transition-all duration-500 bg-green-500 shadow-none whitespace-nowrap"
            />
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className={`shadow-lg rounded-lg p-8 w-full space-y-4 transition-all duration-300 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="mb-4 text-2xl font-bold text-center">Employment Details</h2>

          {/* Company Name */}
          <div className="relative">
            <label className="text-blue-600 font-semibold text-sm">  Company Name</label>
            <input
              placeholder="Company Name"
              autoComplete="off"
              {...register('company', {
                required: 'Company name is required',
                validate: (value) =>
                  validCompanies.includes(value) || 'Please enter a valid company name',
              })}
              onFocus={() => setFocusedField('company')}
              onBlur={() => setFocusedField('')}
              className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputTextClass}`}
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-500">{errors.company.message}</p>
            )}
          </div>

          {/* Employment Status */}
          <div>
            <label className="block text-green-600 font-semibold text-sm">
               Employment Status <span className="text-red-500">*</span>
            </label>
            <select
              autoComplete="off"
              {...register('status', { required: 'Employment status is required' })}
              className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputTextClass}`}
            >
              <option value="">Select Status</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="self-employed">Self-employed</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
            )}
          </div>

          {/* Monthly Income */}
          <div className="relative">
            <label className="text-yellow-600 font-semibold text-sm"> Monthly Income</label>
            <input
              type="number"
              placeholder="Monthly Income"
              autoComplete="off"
              {...register('income', {
                required: 'Income is required',
                valueAsNumber: true,
              })}
              onFocus={() => setFocusedField('income')}
              onBlur={() => setFocusedField('')}
              className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputTextClass}`}
            />
            {errors.income && (
              <p className="mt-1 text-sm text-red-500">{errors.income.message}</p>
            )}
          </div>

          {/* Years of Experience */}
          <div className="relative">
            <label className="text-orange-500 font-semibold text-sm"> Years of Experience</label>
            <input
              placeholder="Years of Experience"
              autoComplete="off"
              {...register('experience', {
                required: 'Experience is required',
              })}
              onFocus={() => setFocusedField('experience')}
              onBlur={() => setFocusedField('')}
              className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputTextClass}`}
            />
            {errors.experience && (
              <p className="mt-1 text-sm text-red-500">{errors.experience.message}</p>
            )}
          </div>

          {/* Tax ID */}
          <div className="relative">
            <label className="text-red-500 font-semibold text-sm"> Tax Identification Number</label>
            <input
              placeholder="Tax Identification Number"
              autoComplete="off"
              {...register('taxId')}
              onFocus={() => setFocusedField('taxId')}
              onBlur={() => setFocusedField('')}
              className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputTextClass}`}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-2 font-semibold text-white bg-pink-500 rounded hover:bg-pink-600"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2 font-semibold text-white bg-purple-600 rounded hover:bg-purple-700"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeDetails;



