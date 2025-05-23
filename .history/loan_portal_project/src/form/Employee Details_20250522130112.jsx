import React, { useState } from 'react';
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
  const savedData = useSelector((state) => state.formData?.employeeDetails);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: savedData || {
      company: '',
      income: '',
    },
  });

  const [currentStep, setCurrentStep] = useState(2);
  const totalSteps = 8;
  const employmentStatus = watch('status');

  const [focusedField, setFocusedField] = useState('');
  const [hoverField, setHoverField] = useState('');

  const companySuggestions = ['Brain station', 'Enosis solution', 'Tech solution'];
  const incomeSuggestions = [5000, 10000, 12000, 15000];
  const experienceSuggestions = ['5 years', '6 years'];
  const taxIdSuggestions = ['tx555005', 'tx583006'];

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

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div className="w-full max-w-md">
        <div className="mb-6 grid grid-cols-8 gap-2 text-xs font-semibold text-center">
          {[
            { step: 1, label: 'Apply' },
            { step: 2, label: <>Personal<br />Info</> },
            { step: 2, label: <>Employee<br />Details</> },
            { step: 3, label: <>Loan<br />Details</> },
            { step: 4, label: <>Document<br />Updates</> },
            { step: 5, label: 'Summary' },
            { step: 6, label: 'Reiew' },
            { step: 7, label: 'Thank you' },
          ].map(({ step, label }) => (
            <div key={step} className="flex flex-col items-center col-span-1">
              <span
                className={`w-7 h-7 flex items-center justify-center rounded-full font-bold ${
                  step === currentStep
                    ? 'bg-blue-600 text-white'
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

        <div className="w-full max-w-md mx-auto">
          <div className="relative pt-1 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-block px-2 py-1 text-xs font-semibold text-teal-600 uppercase bg-teal-200 rounded-full">
                Step 3 of 8
              </span>
              <span className="text-xs font-semibold text-teal-600">30%</span>
            </div>
            <div className="flex h-2 overflow-hidden text-xs bg-teal-200 rounded">
              <div
                style={{ width: '30%' }}
                className="flex flex-col justify-center text-center text-white transition-all duration-500 bg-green-500 shadow-none whitespace-nowrap"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          <button
            onClick={handleToggleTheme}
            className="px-3 py-1 ml-4 text-sm text-white transition bg-indigo-500 rounded hover:bg-indigo-600"
          >
            Toggle Theme
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className={`shadow-lg rounded-lg p-8 w-full space-y-4 transition-all duration-300 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="mb-4 text-2xl font-bold text-center">Employment Details</h2>

          {/* Company Name */}
          <div
            className="relative"
            onMouseEnter={() => setHoverField('company')}
            onMouseLeave={() => setHoverField('')}
          >
            <input
              placeholder="Company Name"
              autoComplete="off"
              {...register('company', { required: 'Company name is required' })}
              onFocus={() => setFocusedField('company')}
              onBlur={() => setFocusedField('')}
              className="w-full px-4 py-2 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-500">{errors.company.message}</p>
            )}
            {hoverField === 'company' && focusedField !== 'company' && (
              <ul className="absolute z-10 w-full max-h-40 overflow-auto mt-1 border rounded shadow-lg bg-white">
                {companySuggestions.map((option) => (
                  <li
                    key={option}
                    className="cursor-pointer px-3 py-2 hover:bg-blue-500 hover:text-white"
                    onMouseDown={() => setValue('company', option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Employment Status */}
          <div>
            <label className="block mb-1 text-sm font-medium">Employment Status</label>
            <select
              autoComplete="off"
              {...register('status', { required: 'Employment status is required' })}
              className="w-full px-4 py-2 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div
            className="relative"
            onMouseEnter={() => setHoverField('income')}
            onMouseLeave={() => setHoverField('')}
          >
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
              className="w-full px-4 py-2 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.income && (
              <p className="mt-1 text-sm text-red-500">{errors.income.message}</p>
            )}
            {hoverField === 'income' && focusedField !== 'income' && (
              <ul className="absolute z-10 w-full max-h-40 overflow-auto mt-1 border rounded shadow-lg bg-white">
                {incomeSuggestions.map((option) => (
                  <li
                    key={option}
                    className="cursor-pointer px-3 py-2 hover:bg-blue-500 hover:text-white"
                    onMouseDown={() => setValue('income', option)}
                  >
                    {option.toLocaleString()}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Years of Experience */}
          <div
            className="relative"
            onMouseEnter={() => setHoverField('experience')}
            onMouseLeave={() => setHoverField('')}
          >
            <input
              placeholder="Years of Experience"
              autoComplete="off"
              {...register('experience', {
                required: 'Experience is required',
              })}
              onFocus={() => setFocusedField('experience')}
              onBlur={() => setFocusedField('')}
              className="w-full px-4 py-2 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.experience && (
              <p className="mt-1 text-sm text-red-500">{errors.experience.message}</p>
            )}
            {hoverField === 'experience' && focusedField !== 'experience' && (
              <ul className="absolute z-10 w-full max-h-40 overflow-auto mt-1 border rounded shadow-lg bg-white">
                {experienceSuggestions.map((option) => (
                  <li
                    key={option}
                    className="cursor-pointer px-3 py-2 hover:bg-blue-500 hover:text-white"
                    onMouseDown={() => setValue('experience', option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Tax ID */}
          <div
            className="relative"
            onMouseEnter={() => setHoverField('taxId')}
            onMouseLeave={() => setHoverField('')}
          >
            <input
              placeholder="Tax ID"
              autoComplete="off"
              {...register('taxId', {
                required: 'Tax ID is required',
              })}
              onFocus={() => setFocusedField('taxId')}
              onBlur={() => setFocusedField('')}
              className="w-full px-4 py-2 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.taxId && (
              <p className="mt-1 text-sm text-red-500">{errors.taxId.message}</p>
            )}
            {hoverField === 'taxId' && focusedField !== 'taxId' && (
              <ul className="absolute z-10 w-full max-h-40 overflow-auto mt-1 border rounded shadow-lg bg-white">
                {taxIdSuggestions.map((option) => (
                  <li
                    key={option}
                    className="cursor-pointer px-3 py-2 hover:bg-blue-500 hover:text-white"
                    onMouseDown={() => setValue('taxId', option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
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

