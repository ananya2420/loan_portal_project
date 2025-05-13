
//use react-hook-form
//Add progresbar

// src/pages/DocumentUpdates.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDocumentUpdates } from '../store/formSlice'; // Ensure this import is correct
import ProgressBar from '../components/ProgressBar';

const DocumentUpdates = () => {
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();

  const documentUpdates = useSelector((state) => state.formData.documentUpdates);
  const [currentStep] = useState(4); // 4th step
  const totalSteps = 5;

  const onSubmit = () => {
    dispatch(setDocumentUpdates({ isUpdated: true }));
    navigate('/apply/updated-picture');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md">
        {/* Progress Step Text */}
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





