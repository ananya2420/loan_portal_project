//Application For Structure
//add react-hook-form 
//add form progress bar

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';
import { setDocumentUpdates } from '../redux/slices/formSlice';
import ProgressBar from '../components/progressbar';

const UpdatedPicture = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const formData = useSelector((state) => state.formData);

  const { control, handleSubmit } = useForm();
  const [currentStep] = useState(5);
  const totalSteps = 5;

  const isFormComplete = () => {
    return (
      formData?.personalInfo?.name &&
      formData?.employeeDetails?.status &&
      formData?.loanDetails?.amount &&
      formData?.loanDetails?.type
    );
  };

  const onSubmit = (data) => {
    if (!isFormComplete()) {
      alert('Please complete all required steps before continuing.');
      return;
    }

    dispatch(setDocumentUpdates({ uploaded: true, file: data.picture[0] }));
    navigate('/apply/summary');
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  // Navigate to Summary Page
  const handleShowSummary = () => {
    navigate('/apply/summary');
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          <button
            onClick={handleToggleTheme}
            className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
          >
            Toggle Theme
          </button>
        </div>

        <div
          className={`rounded-2xl shadow-md p-8 text-center transition ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">Upload Updated Picture</h2>
          <p className="text-gray-500 dark:text-gray-300 mb-6">
            Please upload your updated picture
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="picture"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  type="file"
                  accept="image/*"
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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

          {/* Show Summary Button */}
          <button
            onClick={handleShowSummary}
            className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
          >
            Show Summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatedPicture;



