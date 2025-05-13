//Application For Structure

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
//import ProgressBar from '../components/ProgressBar'; // Import ProgressBar component
import progres
const UpdatedPicture = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();
  const [currentStep, setCurrentStep] = useState(5); // This is the 5th step (you can adjust this if needed)
  const totalSteps = 5; // Total number of steps (you can adjust this if needed)

  const onSubmit = (data) => {
    // Handle the file upload (if necessary) and set the user data.
    setUserData((prev) => ({
      ...prev,
      updatedPicture: { uploaded: true, file: data.picture[0] } // Assuming picture is a file input
    }));
    navigate('/apply/summary');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md">
        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Upload Updated Picture</h2>
          <p className="text-gray-600 mb-6">Please upload your updated picture</p>
          
          {/* React Hook Form to handle form submission */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* File input handled by React Hook Form's Controller */}
            <Controller
              name="picture"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="file"
                  accept="image/*"
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            />

            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Go to Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatedPicture;



