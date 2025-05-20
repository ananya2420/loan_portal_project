import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Summary = ({ userData = {}, onSubmit }) => {
  const navigate = useNavigate();
  const [isEditingEmployee, setIsEditingEmployee] = useState(false);

  const {
    personalInfo = {},
    employeeDetails = {},
    loanDetails = {},
    documentUpdates = {},
  } = userData;

  // Use useForm hook with defaultValues from employeeDetails
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: employeeDetails,
  });

  // Reset form values when employeeDetails prop changes (important!)
  useEffect(() => {
    reset(employeeDetails);
  }, [employeeDetails, reset]);

  // When save button clicked
  const submitEmployeeDetails = (data) => {
    // Call parent's onSubmit to update userData
    onSubmit({ ...userData, employeeDetails: data });
    // Exit edit mode to show updated summary
    setIsEditingEmployee(false);
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

      {isEditingEmployee ? (
        <form
          onSubmit={handleSubmit(submitEmployeeDetails)}
          className="bg-gray-50 border border-gray-200 p-5 rounded-lg space-y-5 max-w-lg mx-auto"
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Edit Employee Details</h3>

          {/* Employee fields */}
          {/* ... same inputs with validation as before ... */}

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setIsEditingEmployee(false)}
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
      ) : (
        <>
          {/* Summary Sections */}

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
            <p className="text-gray-600"><strong>ID Updated:</strong> {documentUpdates?.isUpdated ? 'Yes' : 'No'}</p>
          </section>

          {/* Buttons side-by-side at bottom */}
          <div className="flex justify-between mt-6 max-w-4xl mx-auto">
            <button
              onClick={() => setIsEditingEmployee(true)}
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
      )}
    </div>
  );
};

export default Summary;
