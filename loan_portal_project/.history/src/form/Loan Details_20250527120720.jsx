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
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: savedLoanDetails || { amount: '', type: '', repaymentTerm: '', emiDate: '' },
  });

  const currentStep = 4;
  const totalSteps = 8;

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

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div className="w-full max-w-md">
        {/* Header: Progress Bar + Theme Toggle */}
        <div className="flex items-center justify-between mb-4">
          {/* Simple Progress Bar */}
          <div className="flex-1 mr-4">
            <div className="relative pt-1">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-block px-2 py-1 text-xs font-semibold text-teal-600 uppercase bg-teal-200 rounded-full">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-xs font-semibold text-teal-600">
                  {(currentStep / totalSteps) * 100}%
                </span>
              </div>
              <div className="flex h-2 overflow-hidden text-xs bg-teal-200 rounded">
                <div
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  className="flex flex-col justify-center text-center text-white transition-all duration-500 bg-green-500 shadow-none whitespace-nowrap"
                />
              </div>
            </div>
          </div>
          {/* Theme Toggle */}
          <button
            onClick={handleToggleTheme}
            className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
          >
            Toggle Theme
          </button>
        </div>

        {/* Stepper */}
        <div className="mb-6 grid grid-cols-8 gap-2 text-xs font-semibold text-center">
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
                    ? 'bg-emerald-600 text-white'
                    : theme === 'dark'
                    ? 'bg-gray-300 text-black'
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

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className={`shadow-lg rounded-lg p-8 w-full space-y-4 transition-all duration-300 ${
            theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
          }`}
        >
          <h2 className="mb-4 text-2xl font-bold text-center">Loan Details</h2>

          {/* Loan Amount */}
          <div>
            {(watch('amount') || '') && <label className="block mb-1 text-sm font-medium">Loan Amount</label>}
            <input
              type="number"
              placeholder="Loan Amount"
              {...register('amount', { required: 'Loan amount is required' })}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'
              }`}
            />
            {errors.amount && <p className="text-sm text-red-500 mt-1">{errors.amount.message}</p>}
          </div>

          {/* Loan Type */}
          <div>
            <label className="block mb-1 mt-4 text-sm font-medium">
              Loan Type <span className="text-red-500">*</span>
            </label>
            <select
              {...register('type', { required: 'Loan type is required' })}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'
              }`}
            >
              <option value="">Select Loan Type</option>
              <option value="Home Loan">Home Loan</option>
              <option value="Auto Loan">Auto Loan</option>
            </select>
            {errors.type && <p className="text-sm text-red-500 mt-1">{errors.type.message}</p>}
          </div>

          {/* Repayment Term */}
          <div>
            <label className="block mb-1 mt-4 text-sm font-medium">
              Repayment Term <span className="text-red-500">*</span>
            </label>
            <select
              {...register('repaymentTerm', { required: 'Repayment term is required' })}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'
              }`}
            >
              <option value="">Select Repayment Term (months)</option>
              {repaymentTerms.map((term) => (
                <option key={term} value={term}>
                  {term} months
                </option>
              ))}
            </select>
            {errors.repaymentTerm && <p className="text-sm text-red-500 mt-1">{errors.repaymentTerm.message}</p>}
          </div>

          {/* Preferred EMI Date */}
          <div>
            <label className="block mb-1 mt-4 text-sm font-medium">
              Preferred EMI Date <span className="text-red-500">*</span>
            </label>
            <select
              {...register('emiDate', { required: 'EMI date is required' })}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'
              }`}
            >
              <option value="">Preferred EMI Date</option>
              <option value="21.5.25">21.5.25</option>
              <option value="22.5.25">22.5.25</option>
            </select>
            {errors.emiDate && <p className="text-sm text-red-500 mt-1">{errors.emiDate.message}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handleBack}
              className={`px-4 py-2 rounded border transition ${
                theme === 'dark' ? 'text-white border-gray-500 hover:bg-gray-700' : 'text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className={`px-6 py-3 rounded text-white transition duration-300 ${
                isValid ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-emerald-400 cursor-not-allowed'
              }`}
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










