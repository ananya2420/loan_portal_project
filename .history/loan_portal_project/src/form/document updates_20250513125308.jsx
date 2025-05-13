
//use reac

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/progressbar';
const DocumentUpdates = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const [currentStep, setCurrentStep] = useState(4); // Assuming this is the 4th step in the process
  const totalSteps = 5; // Adjust this according to your total steps

  const onSubmit = () => {
    setUserData((prev) => ({ ...prev, documentUpdates: { isUpdated: true } }));
    navigate('/apply/updated-picture');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md">
        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Document Updates</h2>
          <p className="text-gray-700 mb-6">Assuming documents are up-to-date.</p>

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


