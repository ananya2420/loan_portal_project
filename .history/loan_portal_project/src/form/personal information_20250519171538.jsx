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
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: { name: '', dob: '', phone: '', email: '' },
  });

  const watchFields = watch();

  const totalFields = 4;
  const validFieldsCount = Object.keys(watchFields).filter(
    (field) => !errors[field] && watch(field)
  ).length;

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
      {/* Theme Toggle */}
      <div className="w-full max-w-md flex justify-end mb-4">
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
          className={`w-full px-6 py-2 rounded mt-6 font-semibold transition ${
            isValid
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-300 text-white cursor-not-allowed'
          }`}
          disabled={!isValid}
        >
          Next
        </button>

        {/* Live Preview of Name & Email */}
        {(watchFields.name || watchFields.email) && (
          <div className="mt-6 text-left">
            <h3 className="font-semibold text-lg mb-2">Live Preview:</h3>
            {watchFields.name && (
              <p>
                <span className="font-medium">Full Name:</span> {watchFields.name}
              </p>
            )}
            {watchFields.email && (
              <p>
                <span className="font-medium">Email:</span> {watchFields.email}
              </p>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default PersonalInformation;
