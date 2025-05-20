//Application For Structure
//add  react hook form 

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';
import ProgressBar from '../components/progressbar';

const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
const states = ['California', 'Texas', 'New York', 'Florida', 'Illinois'];

const PersonalInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const allFields = watch();

  const totalFields = 5; // total steps for personal info
  const stepsLabels = ['First Name', 'Last Name', 'City', 'State', 'Phone'];

  // Count valid fields filled without errors
  const validFieldsCount = Object.keys(allFields).filter(
    (field) => allFields[field] && !errors[field]
  ).length;

  const onSubmit = (data) => {
    console.log('Personal Info:', data);
    navigate('/apply/employee-details');
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div className="w-full max-w-md flex justify-end mb-4">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
        >
          Toggle Theme
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className={`p-8 rounded-lg shadow-md w-full max-w-md transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {/* Progress Bar */}
        <ProgressBar
          currentStep={validFieldsCount}
          totalSteps={totalFields}
          stepsLabels={stepsLabels}
        />

        {/* Your form inputs go here... */}
      </form>
    </div>
  );
};

export default PersonalInfo;




