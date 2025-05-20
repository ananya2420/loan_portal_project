//Application For Structure
//add  react hook form 

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';
import ProgressBar from '../components/progressbar';

// Step labels with indexes explicitly
const stepsLabels = [
  'Apply',           // 0
  'Personal Info',   // 1
  'Employee Details',// 2
  'Loan Details',    // 3
  'Document Updates',// 4
  'Review'           // 5
];

const PersonalInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  // Current step number is 1 (Personal Info)
  const currentStep = 1;

  const onSubmit = (data) => {
    console.log('Personal Info data:', data);
    navigate('/apply/employee-details'); // Navigate to next step
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
        {/* Progress Bar with 6 steps (0-5) */}
        <ProgressBar
          currentStep={currentStep}
          totalSteps={stepsLabels.length - 1} // totalSteps=5 (max index)
          stepsLabels={stepsLabels}
          showStepNumbers={true} // Optional, if your progress bar supports it
        />

        {/* Example form inputs */}
        <div className="mt-6 flex flex-col gap-5">
          <div>
            <label htmlFor="firstname" className="block mb-1 font-semibold">
              First Name
            </label>
            <input
              id="firstname"
              {...register('firstname', { required: 'First Name is required' })}
              className={`w-full px-3 py-2 border rounded ${
                errors.firstname ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your first name"
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm mt-1">{errors.firstname.message}</p>
            )}
          </div>

          {/* Add more fields here as needed */}

          <button
            type="submit"
            className="mt-8 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;

