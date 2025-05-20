import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Summary = ({ userData = {}, onSubmit }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const {
    personalInfo = {},
    employeeDetails = {},
    loanDetails = {},
    documentUpdates = {}
  } = userData;

  useEffect(() => {
    console.log('User Data:', userData);
  }, [userData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ defaultValues: employeeDetails });

  const submitEmployeeDetails = (data) => {
    onSubmit({ ...userData, employeeDetails: data });
    setIsEditing(false);
  };

  const handleGoToReview = () => {
    navigate('/apply/review');
  };

  if (!personalInfo?.name) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        No user data available. Please complete the form steps before accessing the summary.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10 space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">User Summary</h2>

      {!isEditing ? (
        <>
          {/* Show all info sections */}
          <section className="bg-gray-50 border border-gray-200 p-5 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              <p><strong>Name:</strong> {personalInfo.name}</p>
              <p><strong>Date of Birth:</strong> {personalInfo.dob}</p>
              <p><strong>Phone:</strong> {personalInfo.phone}</p>
              <p><strong>Email:</strong> {personalInfo.email}</p>
            </div>
          </section>

          <section className="bg-gray-50 border border-gray-200 p-5 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Employee Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              <p><strong>Status:</strong> {employeeDetails.status || 'N/A'}</p>
              <p><strong>Company:</strong> {employeeDetails.company || 'N/A'}</p>
              <p><strong>Monthly Income:</strong> ${employeeDetails.income || 'N/A'}</p>
              <p><strong>Experience:</strong> {employeeDetails.experience || 'N/A'} years</p>
              <p><strong>Tax ID:</strong> {employeeDetails.taxId || 'N/A'}</p>
            </div>
          </section>

          <section className="bg-gray-50 border border-gray-200 p-5 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Loan Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              <p><strong>Amount:</strong> ${loanDetails.amount || 'N/A'}</p>
              <p><strong>Type:</strong> {loanDetails.type || 'N/A'}</p>
              <p><strong>Term:</strong> {loanDetails.term || 'N/A'}</p>
              <p><strong>EMI Date:</strong> {loanDetails.emiDate || 'N/A'}</p>
            </div>
          </section>

          <section className="bg-gray-50 border border-gray-200 p-5 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Document Updates</h3>
            <p className="text-gray-600">
              <strong>ID Updated:</strong> {documentUpdates?.isUpdated ? 'Yes' : 'No'}
            </p>
          </section>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => {
                reset(employeeDetails); // reset form data on edit
                setIsEditing(true);
              }}
              className="px-6 py-2 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600"
            >
              Edit Employee Details
            </button>
            <button
              onClick={handleGoToReview}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
            >
              Go to Review
            </button>
          </div>
        </>
      ) : (
        /* Edit mode for Employee Details only */
        <form onSubmit={handleSubmit(submitEmployeeDetails)} className="bg-gray-50 border border-gray-200 p-5 rounded-lg space-y-5">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Edit Employee Details</h3>

          <div>
            <label className="block font-semibold mb-1">Status</label>
            <input
              {...register('status', { required: 'Status is required' })}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Status"
            />
            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
          </div>

          <div>
            <label className="block font-semibold mb-1">Company</label>
            <input
              {...register('company', { required: 'Company is required' })}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Company"
            />
            {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
          </div>

          <div>
            <label className="block font-semibold mb-1">Monthly Income</label>
            <input
              type="number"
              {...register('income', { required: 'Monthly Income is required', valueAsNumber: true })}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Monthly Income"
            />
            {errors.income && <p className="text-red-500 text-sm mt-1">{errors.income.message}</p>}
          </div>

          <div>
            <label className="block font-semibold mb-1">Experience (years)</label>
            <input
              type="number"
              {...register('experience', { required: 'Experience is required', valueAsNumber: true })}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Experience"
            />
            {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>}
          </div>

          <div>
            <label className="block font-semibold mb-1">Tax ID</label>
            <input
              {...register('taxId', { required: 'Tax ID is required' })}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tax ID"
            />
            {errors.taxId && <p className="text-red-500 text-sm mt-1">{errors.taxId.message}</p>}
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Summary;
