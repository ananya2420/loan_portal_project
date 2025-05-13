
//use react-hook-form
//Add progresbar

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDocumentUpdates } from '../store/formSlice';
import ProgressBar from '../components/progressbar';

const DocumentUpdates = () => {
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();

  const documentUpdates = useSelector(
    (state) => state.formData?.documentUpdates || { isUpdated: false }
  );

  const [currentStep] = useState(4);
  const totalSteps = 5;

  const onSubmit = () => {
    dispatch(setDocumentUpdates({ isUpdated: true }));
    navigate('/apply/updated-picture'); // next step
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-2 text-sm text-gray-600 font-medium">
          Step {currentStep} of {totalSteps}
        </div>

        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Document Updates</h2>
          <p className="text-gray-700 mb-6">
            {documentUpdates.isUpdated
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


