//Application For Structure
//add react-hook-form
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const EmployeeDetails = ({ userData, setUserData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: userData.employeeDetails || {} // Use existing data as default
  });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setUserData((prev) => ({ ...prev, employeeDetails: data }));
    navigate('/apply/loan-details');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Employment Details
        </h2>

        {/* Company Name Input */}
        <div>
          <input
            name="company"
            placeholder="Company Name"
            {...register('company', { required: "Company name is required" })}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.company && (
            <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
          )}
        </div>

        {/* Monthly Income Input */}
        <div>
          <input
            name="income"
            type="number"
            placeholder="Monthly Income"
            {...register('income', { required: "Income is required", valueAsNumber: true })}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.income && (
            <p className="text-red-500 text-sm mt-1">{errors.income.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default EmployeeDetails;

