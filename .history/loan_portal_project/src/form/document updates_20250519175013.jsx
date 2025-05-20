import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProgressBar from '../components/progressbar';
import { toggleTheme } from '../redux/slices/themeSlice';
//import { setDocumentUpdates } from '../store/formSlice'; // Make sure this action exists in your slice
//import { setDocumentUpdates } from '../redux/slices/formSlice';
const DocumentUpdates = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const savedData = useSelector((state) => state.formData?.documentUpdates);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: savedData || { loanAmount: 50000, loanType: 'Home Loan' },
    
  });

  // Required fields for this form step
  const requiredFields = ['loanAmount', 'loanType'];

  const watchedValues = watch();

  // Count how many required fields are valid and filled (no errors and has value)
  const validFieldsCount = requiredFields.filter(
    (field) => !errors[field] && watchedValues[field]
  ).length;

  const totalSteps = requiredFields.length;

 const onSubmit = (data) => {
    console.log('Submitted Data:', data);
    // After form submission, navigate to the summary page
    navigate('/apply/summary', { state: { formData: data } }); // Passing data as state to the summary page
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
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

      {/* Form Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`w-full max-w-md rounded-lg shadow-lg p-8 transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {/* Dynamic ProgressBar */}
        <ProgressBar currentStep={validFieldsCount} totalSteps={totalSteps} />

        <h1 className="text-2xl font-bold mb-6 text-center">Document Updates</h1>

        {/* Loan Amount Input */}
        <div className="mb-4 text-left">
          <label htmlFor="loanAmount" className="block font-semibold mb-2">
            Loan Amount
          </label>
          <input
            type="number"
            id="loanAmount"
            placeholder="Enter Loan Amount"
            {...register('loanAmount', { required: 'Loan amount is required' })}
            className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-black'
            }`}
          />
          {errors.loanAmount && (
            <p className="text-red-500 text-sm mt-1">{errors.loanAmount.message}</p>
          )}
        </div>

        {/* Loan Type Select */}
        <div className="mb-6 text-left">
          <label htmlFor="loanType" className="block font-semibold mb-2">
            Loan Type
          </label>
          <select
            id="loanType"
            {...register('loanType', { required: 'Loan type is required' })}
            className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-black'
            }`}
          >
            <option value="">Select a type</option>
            <option value="Home Loan">Home Loan</option>
            <option value="Auto Loan">Auto Loan</option>
          </select>
          {errors.loanType && (
            <p className="text-red-500 text-sm mt-1">{errors.loanType.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
         <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit Documents
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentUpdates;




