//Application For Structure
//add react-hook-form

import React from 'react';
import { useForm } from 'react-hook-form';

const EmployeeDetails = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const selectedTax = watch('tax');

  const onSubmit = (data) => {
    console.log('Form Submitted:', data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <p className="text-2xl font-semibold text-gray-800 mb-6">Employee Details</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Employee Status */}
        <div>
          <label htmlFor="status" className="block text-gray-700 font-semibold mb-2">Employee Status</label>
          <select
            id="status"
            {...register('status', { required: 'Employee status is required' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Status --</option>
            <option value="Married">Married</option>
            <option value="Unmarried">Unmarried</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
        </div>

        {/* Company Name */}
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Company Name</label>
          <select
            id="name"
            {...register('name', { required: 'Company name is required' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Company --</option>
            <option value="Brain Station">Brain Station</option>
            <option value="Inosis Solution">Inosis Solution</option>
          </select>
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Years of Experience */}
        <div>
          <label htmlFor="years" className="block text-gray-700 font-semibold mb-2">Years of Experience</label>
          <select
            id="years"
            {...register('years', { required: 'Experience is required' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Experience --</option>
            <option value="2">2 years of experience</option>
            <option value="5">5 years of experience</option>
          </select>
          {errors.years && <p className="text-red-500 text-sm mt-1">{errors.years.message}</p>}
        </div>

        {/* Tax ID */}
        <div>
          <label htmlFor="tax" className="block text-gray-700 font-semibold mb-2">Tax Status</label>
          <select
            id="tax"
            {...register('tax', { required: 'Tax status is required' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Tax Option --</option>
            <option value="employee">Employee</option>
            <option value="self-employed">Self-Employed</option>
          </select>
          {errors.tax && <p className="text-red-500 text-sm mt-1">{errors.tax.message}</p>}

          {/* Conditionally Show Tax ID Input */}
          {selectedTax === 'self-employed' && (
            <div className="mt-4">
              <label htmlFor="taxId" className="block text-gray-700 font-semibold mb-2">Enter Tax ID</label>
              <input
                type="text"
                id="taxId"
                {...register('taxId', { required: 'Tax ID is required for self-employed' })}
                placeholder="Enter your tax ID"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.taxId && <p className="text-red-500 text-sm mt-1">{errors.taxId.message}</p>}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployeeDetails;

