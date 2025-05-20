//Application For Structure
//add  react hook form 
//add form  progress bar

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoanDetails } from '../store/formSlice';
import { toggleTheme } from '../redux/slices/themeSlice';
import ProgressBar from '../components/progressbar';

// Sample loan data for autocomplete
const sampleLoans = [
  { amount: 50000, type: 'Home Loan' },
  { amount: 20000, type: 'Auto Loan' },
  { amount: 75000, type: 'Home Loan' },
  { amount: 15000, type: 'Auto Loan' },
];



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

  const watchedAmount = watch('amount');
  const watchedType = watch('type');

  // Filter loans based on typed amount or selected type
  const [filteredLoans, setFilteredLoans] = useState([]);

  useEffect(() => {
    if (watchedAmount || watchedType) {
      const filtered = sampleLoans.filter(
        (loan) =>
          (watchedAmount ? loan.amount.toString().startsWith(watchedAmount.toString()) : true) &&
          (watchedType ? loan.type.toLowerCase().includes(watchedType.toLowerCase()) : true)
      );
      setFilteredLoans(filtered);
    } else {
      setFilteredLoans([]);
    }
  }, [watchedAmount, watchedType]);

  // Required fields on this step (added repaymentTerm and emiDate)
  const requiredFields = ['amount', 'type', 'repaymentTerm', 'emiDate'];

  // Get all current field values
  const watchedValues = watch();

  // Count how many required fields are valid & filled (no errors and has value)
  const validFieldsCount = requiredFields.filter(
    (field) => !errors[field] && watchedValues[field]
  ).length;

  const totalSteps = requiredFields.length;

  // Fill fields when user clicks a suggestion
  const handleSelectLoan = (loan) => {
    setValue('amount', loan.amount);
    setValue('type', loan.type);
    setFilteredLoans([]); // hide suggestions
  };

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
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      {/* Theme Toggle Button */}
      <div className="w-full max-w-md flex justify-end mb-4 px-0">
        <button
          onClick={handleToggleTheme}
          className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
        >
          Toggle Theme
        </button>
      </div>

      {/* Loan Details Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className={`p-8 rounded-lg shadow-md w-full max-w-md text-center transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <ProgressBar currentStep={validFieldsCount} totalSteps={totalSteps} />

        <h2 className="mb-4 text-2xl font-bold text-center">Loan Details</h2>

        {/* Loan Amount with autocomplete suggestions */}
        <div className="relative text-left">
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

          {filteredLoans.length > 0 && (
            <ul
              className={`absolute z-10 w-full max-h-40 overflow-auto mt-1 bg-white border border-gray-300 rounded shadow-lg ${
                theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
              }`}
            >
              {filteredLoans.map((loan, idx) => (
                <li
                  key={idx}
                  className="cursor-pointer px-3 py-2 hover:bg-blue-500 hover:text-white"
                  onClick={() => handleSelectLoan(loan)}
                >
                  {`$${loan.amount} - ${loan.type}`}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Loan Type dropdown */}
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

        {/* Repayment Term (in months) */}
        <input
          type="number"
          placeholder="Repayment Term (months)"
          {...register('repaymentTerm', {
            required: 'Repayment term is required',
            min: { value: 1, message: 'Term must be at least 1 month' },
          })}
          className={`w-full p-3 border rounded mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-black'
          }`}
        />
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

        {/* Navigation Buttons */}
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
