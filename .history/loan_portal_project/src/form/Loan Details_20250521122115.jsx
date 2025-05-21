import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoanDetails } from '../store/formSlice';
import { toggleTheme } from '../redux/slices/themeSlice';

const repaymentTerms = [6, 12, 24, 36, 48, 60];
const loanAmountSuggestions = [20000, 50000, 150000];

const LoanDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);
  const savedData = useSelector((state) => state.formData?.loanDetails);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: savedData || { amount: '', type: '', repaymentTerm: '', emiDate: '' },
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

  const currentStep = 3;
  const totalSteps = 8;

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div className="w-full max-w-md flex justify-end mb-4 px-0">
        <button
          onClick={handleToggleTheme}
          className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
        >
          Toggle Theme
        </button>
      </div>

      <div className="mb-6 grid grid-cols-8 gap-2 text-xs font-semibold text-center w-full max-w-md mx-auto">
        {[
          { step: 0, label: 'Apply' },
          { step: 1, label: <>Personal<br />Info</> },
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
              Step 4 of 8
            </span>
            <span className="text-xs font-semibold text-teal-600">40%</span>
          </div>
          <div className="flex h-2 overflow-hidden text-xs bg-teal-200 rounded">
            <div
              style={{ width: '40%' }}
              className="flex flex-col justify-center text-center text-white transition-all duration-500 bg-green-500 shadow-none whitespace-nowrap"
            />
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className={`p-8 rounded-lg shadow-md w-full max-w-md text-center transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h2 className="mb-4 text-2xl font-bold text-center">Loan Details</h2>

        {/* Loan Amount (with hover suggestions) */}
        <div
          className="relative text-left"
          onMouseEnter={() => setShowAmountSuggestions(true)}
          onMouseLeave={() => setShowAmountSuggestions(false)}
        >
          <input
            type="number"
            placeholder="Loan Amount"
            {...register('amount', { required: 'Loan amount is required' })}
            className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-black'
            }`}
          />
          {errors.amount && (
            <p className="text-sm text-red-500 mt-1">{errors.amount.message}</p>
          )}
          {showAmountSuggestions && (
            <ul
              className={`absolute z-10 w-full mt-1 border border-gray-300 rounded shadow-lg ${
                theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white'
              }`}
            >
              {loanAmountSuggestions.map((amount, idx) => (
                <li
                  key={idx}
                  className="cursor-pointer px-3 py-2 hover:bg-blue-500 hover:text-white"
                  onClick={() => {
                    setValue('amount', amount);
                    setShowAmountSuggestions(false);
                  }}
                >
                  {`$${amount}`}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Loan Type */}
        <select
          {...register('type', { required: 'Loan type is required' })}
          className={`w-full p-3 border rounded mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
        <select
          {...register('repaymentTerm', { required: 'Repayment term is required' })}
          className={`w-full p-3 border rounded mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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

        {/* EMI Date */}
        <input
          type="date"
          placeholder="EMI Date"
          {...register('emiDate', { required: 'EMI date is required' })}
          className={`w-full p-3 border rounded mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-black'
          }`}
        />
        {errors.emiDate && (
          <p className="text-sm text-red-500 mt-1">{errors.emiDate.message}</p>
        )}

        {/* Buttons */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanDetails;

