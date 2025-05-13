//Application For Structure
//add react-hook-form 
//add form progress bar

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { toggleTheme } from '../store/themeSlice';
import {}
import ProgressBar from '../components/progressbar';

const UpdatedPicture = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme); // Redux theme state

  const { control, handleSubmit } = useForm();
  const [currentStep] = useState(5);
  const totalSteps = 5;

  const onSubmit = (data) => {
    setUserData((prev) => ({
      ...prev,
      updatedPicture: { uploaded: true, file: data.picture[0] },
    }));
    navigate('/apply/summary');
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div className="w-full max-w-md">
        {/* Header with progress and toggle */}
        <div className="flex justify-between items-center mb-4">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          <button
            onClick={handleToggleTheme}
            className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
          >
            Toggle Theme
          </button>
        </div>

        {/* Main card */}
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
        </div>
      </div>
    </div>
  );
};

export default UpdatedPicture;




