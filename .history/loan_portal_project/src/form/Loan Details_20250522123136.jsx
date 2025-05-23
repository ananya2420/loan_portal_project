import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoanDetails } from '../store/formSlice'; // Make sure this action exists

const LoanDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get previously saved loan and employee details
  const savedLoanData = useSelector((state) => state.formData?.loanDetails);
  const savedEmployeeData = useSelector((state) => state.formData?.employeeDetails);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: savedLoanData || {
      amount: '',
      term: '',
    },
  });

  const onSubmit = (data) => {
    dispatch(setLoanDetails(data));
    navigate('/apply/document-updates'); // Go to next step
  };

  const handleBack = () => {
    navigate('/apply/employee-details'); // Go back without clearing Redux state
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <h2 className="text-2xl mb-4 text-center font-bold">Loan Details</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Loan Amount
          </label>
          <input
            type="number"
            {...register('amount', { required: 'Amount is required' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Enter loan amount"
          />
          {errors.amount && (
            <p className="text-red-500 text-xs italic">{errors.amount.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Loan Term (in months)
          </label>
          <input
            type="number"
            {...register('term', { required: 'Term is required' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Enter loan term"
          />
          {errors.term && (
            <p className="text-red-500 text-xs italic">{errors.term.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanDetails;
