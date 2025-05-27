import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoanDetails } from '../store/formSlice';
import { toggleTheme } from '../redux/slices/themeSlice';

const repaymentTerms = [2, 4, 5, 6];

const LoanDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);
  const savedLoanDetails = useSelector((state) => state.formData.loanDetails);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: savedLoanDetails,
  });

  const [showAmountSuggestions, setShowAmountSuggestions] = useState(false);

  const onSubmit = (data) => {
    dispatch(setLoanDetails(data));
    navigate('/apply/document-updates');
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleBack = () => {
    navigate('/apply/employee-details');
  };

  const currentStep = 4;
  const totalSteps = 8;

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div className="w-full max-w-md">
        {/* Toggle Theme */}
        <div className="flex items-center justify-end mb-4">
          <button
            onClick={handleToggleTheme}
            className="px-3 py-1 ml-4 text-sm font-semibold transition bg-yellow-500 text-black rounded hover:bg-yellow-600"
          >
            Toggle Theme
          </button>
        </div>

        {/* Step Indicator */}
        <div className="mb-6 grid grid-cols-8 gap-x-3 gap-y-2 text-xs font-semibold text-center">
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
                className={`w-7 h-7 flex items-center justify-center rounded-full font-bold transition-all duration-300 ${
                  step === currentStep
                    ? 'bg-green-600 text-white shadow-md scale-105'
                    : 'bg-gray-200 text-gray-500'
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

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto">
          <div className="relative pt-1 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-700 uppercase bg-blue-100 rounded-full">
                Step 4 of 8
              </span>
              <span className="text-xs font-semibold text-blue-700">40%</span>
            </div>
            <div className="flex h-2 overflow-hidden text-xs bg-blue-200 rounded">
              <div
                style={{ width: '40%' }}
                className="flex flex-col justify-center text-center text-white transition-all duration-500 bg-green-500 shadow-none whitespace-nowrap"
              />
            </div>
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
          <h2 className="mb-4 text-2xl font-bold text-center">Loan Details</h2>

          {/* Loan Amount */}
          <label className="block text-sm font-medium mb-1 text-purple-700">Loan Amount</label>
          <div
            className="relative text-left"
            onMouseEnter={() => setShowAmountSuggestions(false)}
            onMouseLeave={() => setShowAmountSuggestions(false)}
          >
            <input
              type="number"
              placeholder="Loan Amount"
              {...register('amount', { required: 'Loan amount is required' })}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-black'
              }`}
            />
            {errors.amount && (
              <p className="text-sm text-red-500 mt-1">{errors.amount.message}</p>
            )}
          </div>

          {/* Loan Type */}
          <label className="block text-sm font-medium mb-1 mt-4 text-indigo-700">
            Loan Type <span className="text-red-500">*</span>
          </label>
          <select
            {...register('type', { required: 'Loan type is required' })}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-black'
            }`}
          >
            <option value="">Select Loan Type</option>
            <option value="Home Loan">Home Loan</option>
            <option value="Auto Loan">Auto Loan</option>
          </select>
          {errors.type && (
            <p className="text-sm text-red-500 mt-1">{errors.type.message}</p>
          )}

          {/* Repayment Term */}
          <label className="block text-sm font-medium mb-1 mt-4 text-teal-700">
            Repayment Term <span className="text-red-500">*</span>
          </label>
          <select
            {...register('repaymentTerm', { required: 'Repayment term is required' })}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-black'
            }`}
          >
            <option value="">Select Repayment Term (months)</option>
            {repaymentTerms.map((term) => (
              <option key={term} value={term}>
                {term} months
              </option>
            ))}
          </select>
          {errors.repaymentTerm && (
            <p className="text-sm text-red-500 mt-1">{errors.repaymentTerm.message}</p>
          )}

          {/* Preferred EMI Date */}
          <label className="block text-sm font-medium mb-1 mt-4 text-rose-700">
            Preferred EMI Date <span className="text-red-500">*</span>
          </label>
          <select
            {...register('emiDate', { required: 'EMI date is required' })}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-black'
            }`}
          >
            <option value="">Preferred EMI Date</option>
            <option value="21.5.25">21.5.25</option>
            <option value="22.5.25">22.5.25</option>
          </select>
          {errors.emiDate && (
            <p className="text-sm text-red-500 mt-1">{errors.emiDate.message}</p>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanDetails;




