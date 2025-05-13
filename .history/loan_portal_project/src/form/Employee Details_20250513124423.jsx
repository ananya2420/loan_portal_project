//Application For Structure
//add react-hook-form
//conditional logic in forms 


import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const EmployeeDetails = ({ userData, setUserData }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: userData.employeeDetails || {} // Use existing data as default
  });
  const navigate = useNavigate();

  // Watch the status field to determine whether to show the Tax ID
  const employmentStatus = watch('status');

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
          {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
        </div>

        {/* Employment Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employment Status</label>
          <select
            name="status"
            {...register('status', { required: "Employment status is required" })}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Status</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="self-employed">Self-employed</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
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
          {errors.income && <p className="text-red-500 text-sm mt-1">{errors.income.message}</p>}
        </div>

        {/* Conditionally render Tax ID field if 'self-employed' */}
        {employmentStatus === 'self-employed' && (
          <div>
            <input
              name="taxId"
              placeholder="Tax ID"
              {...register('taxId', { required: "Tax ID is required for self-employed individuals" })}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.taxId && <p className="text-red-500 text-sm mt-1">{errors.taxId.message}</p>}
          </div>
        )}

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


