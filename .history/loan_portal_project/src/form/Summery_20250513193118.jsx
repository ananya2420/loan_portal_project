//Application For Structure
//show a read only summary of all user input with edts otion ad final submission
//react-hook-form 
//add progress bar

//Application For Structure
//show a read only summary of all user input with edts otion ad final submission

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate

const Summery = ({ userData, onEdit, onSubmit, mode }) => {
  const { personalInfo, EmployeeDetails = {}, loanDetails, DocumentUpdates } = userData;
  const navigate = useNavigate(); // ✅ Hook to navigate

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: personalInfo
  });

  const submitUpdatedInfo = (data) => {
    console.log('Updated Personal Info:', data);
    onSubmit(data);
  };

  const handleGoToReview = () => {
    navigate('/review'); // ✅ Go to review page
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center mb-4">User Summary</h2>

      {mode === 'edit' ? (
        <form onSubmit={handleSubmit(submitUpdatedInfo)} className="bg-gray-50 p-4 rounded-lg space-y-4">
          {/* ... form fields ... */}
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={onEdit}
              className="px-5 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <>
          {/* ... summary sections ... */}

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={onEdit}
              className="px-5 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={onSubmit}
              className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit
            </button>
            <button
              onClick={handleGoToReview}
              className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go to Review
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Summery;
