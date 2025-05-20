
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProgressBar from '../components/progressbar'; // Optional progress bar

const DocumentUpdates = () => {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Submitted Data:', data);
    navigate('/apply/summary', { state: { formData: data } });
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`rounded-lg shadow-lg p-8 transition-all duration-300 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <ProgressBar currentStep={4} totalSteps={5} />
          <h1 className="text-2xl font-bold mb-6 text-center">Document Updates</h1>

          {/* Loan Amount Input */}
          <div className="mb-4">
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
          <div className="mb-6">
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
              className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Submit Documents
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentUpdates;
