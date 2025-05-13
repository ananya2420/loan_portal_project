
//use react-hook-form
//Add progresbar

// src/pages/DocumentUpdates.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDocumentUpdates } from '../store/formSlice'; // Import the setDocumentUpdates action
import ProgressBar from '../components/ProgressBar'; // Assuming you have this component

const DocumentUpdates = () => {
  const navigate = useNavigate(); // Navigate to the next page
  const { handleSubmit } = useForm(); // Hook for handling form submissions
  const dispatch = useDispatch(); // Dispatch action to update Redux store

  // Select the documentUpdates state from Redux store
  const documentUpdates = useSelector((state) => state.formData.documentUpdates);

  const [currentStep] = useState(4); // Current step (step 4)
  const totalSteps = 5; // Total number of steps in the form

  // Form submission handler
  const onSubmit = () => {
    // Dispatch action to update document updates state
    dispatch(setDocumentUpdates({ isUpdated: true }));
    
    // Navigate to the next page after submission
    navigate('/apply/updated-picture');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md">
        {/* Step Text */}
        <div className="text-center mb-2 text-sm text-gray-600 font-medium">
          Step {currentStep} of {totalSteps}
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Document Updates</h2>
          <p className="text-gray-700 mb-6">
            {documentUpdates?.isUpdated
              ? 'Documents are marked as updated.'
              : 'Assuming documents are up-to-date.'}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpdates;




