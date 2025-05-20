//Application For Structure
//add  react hook form 

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/progressbar';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';

const PersonalInformation = ({ setUserData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: { name: '', dob: '', phone: '', email: '' },
  });

  // Total required fields here = 4
  const totalFields = 4;

  // Calculate how many fields are valid (no errors and field is dirty)
  // OR just count how many fields are currently filled correctly
  const validFieldsCount = Object.keys(watch()).filter(
    (field) => !errors[field] && watch(field)
  ).length;

  const progressPercent = (validFieldsCount / totalFields) * 100;

  const onSubmit = (data) => {
    setUserData((prev) => ({ ...prev, personalInfo: data }));
    navigate('/apply/employee-details');
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      {/* Toggle Theme Button */}
      <div className="w-full max-w-md flex justify-end mb-4 px-0">
        <button
          onClick={handleToggleTheme}
          className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
        >
          Toggle Theme
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className={`p-8 rounded-lg shadow-md w-full max-w-md text-center transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <ProgressBar currentStep={validFieldsCount} totalSteps={totalFields} />
        <h2 className="mb-4 text-2xl font-bold text-center">Personal Information</h2>

        <input
          placeholder="Full Name"
          {...register('name', { required: 'Full Name is required' })}
          className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-black'
          }`}
        />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}

        <input
          type="date"
          {...register('dob', { required: 'Date of Birth is required' })}
          className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 ${
            theme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-black'
          }`}
        />
        {errors.dob && <p className="text-sm text-red-500 mt-1">{errors.dob.message}</p>}

        <input
          placeholder="Phone Number"
          {...register('phone', { required: 'Phone Number is required' })}
          className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 ${
            theme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-black'
          }`}
        />
        {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: 'Email is required' })}
          className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 ${
            theme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-black'
          }`}
        />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-6"
          disabled={!isValid} // disable submit if form not valid
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default PersonalInformation;
