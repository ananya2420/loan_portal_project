//Application For Structure
//add react-hook-form 
//add form progress bar

//Application For Structure

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDocumentUpdates } from '../store/formSlice';
import ProgressBar from '../components/progressbar';
import { toggleTheme } from '../redux/slices/themeSlice';

const UpdatedPicture = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const { control, handleSubmit } = useForm();
  const [currentStep] = useState(5);
  const totalSteps = 5;

  const [picture, setPicture] = useState(null);

  const formData = useSelector((state) => state.formData);

  const isFormComplete = () => {
    return (
      formData.personalInfo?.name &&
      formData.employeeDetails?.status &&
      formData.loanDetails?.amount &&
      formData.loanDetails?.type
    );
  };

  const onSubmit = (data) => {
    const file = data.picture[0];
    setPicture(URL.createObjectURL(file));

    if (!isFormComplete()) {
      alert('Please complete all previous steps before proceeding to summary.');
      navigate('/apply');
      return;
    }

    dispatch(setDocumentUpdates({ isUpdated: true, fileName: file.name }));
    navigate('/apply/summary');
  };

  const goBack = () => {
    navigate('/apply/document-updates');
  };

  const goToPreview = () => {
    if (picture) {
      navigate('/apply/picture-preview', { state: { picture } });
    } else {
      alert("Please upload a picture first.");
    }
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-6 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
      }`}
    >
      {/* Toggle Theme OUTSIDE main content, positioned top right */}
      <div className="w-full max-w-md flex justify-end mb-4">
        <button
          onClick={handleThemeToggle}
          className="px-4 py-2 font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition"
        >
          Toggle Theme
        </button>
      </div>

      <div className="w-full max-w-md">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <div
          className={`p-8 text-center shadow-md rounded-2xl transition-colors duration-300 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="mb-4 text-2xl font-semibold">Upload Updated Picture</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">Please upload your updated picture</p>

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
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            />

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={goBack}
                className="px-6 py-3 text-white transition duration-300 bg-gray-400 rounded-lg hover:bg-gray-500"
              >
                Back
              </button>

              <button
                type="button"
                onClick={goToPreview}
                className="px-6 py-3 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Go to picture
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatedPicture;
