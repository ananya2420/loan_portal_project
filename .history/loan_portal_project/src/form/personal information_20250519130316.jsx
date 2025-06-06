//Application For Structure
//add  react hook form 

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/progressbar';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice'; // adjust path as needed

const PersonalInformation = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', dob: '', phone: '', email: '' },
  });

  const onSubmit = (data) => {
    setUserData((prev) => ({ ...prev, personalInfo: data }));
    navigate('/apply/employee-details');
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-6 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      {/* Toggle Theme Button outside the form */}
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
        className={`w-full max-w-md p-8 space-y-4 rounded-lg shadow-lg transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <ProgressBar currentStep={1} totalSteps={5} />
        <h2 className="mb-4 text-2xl font-bold text-center">Personal Information</h2>

        <input
          placeholder="Full Name"
          {...register('name', { required: 'Full Name is required' })}
          className={`w-full px-4 py-2 border rounded focus:outline-none ${
            theme === 'dark'
              ? 'border-gray-600 bg-gray-700 text-white'
              : 'border-gray-300 bg-white text-black'
          }`}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}

        <input
          type="date"
          {...register('dob', { required: 'Date of Birth is required' })}
          className={`w-full px-4 py-2 border rounded focus:outline-none ${
            theme === 'dark'
              ? 'border-gray-600 bg-gray-700 text-white'
              : 'border-gray-300 bg-white text-black'
          }`}
        />
        {errors.dob && <p className="text-sm text-red-500">{errors.dob.message}</p>}

        <input
          placeholder="Phone Number"
          {...register('phone', { required: 'Phone Number is required' })}
          className={`w-full px-4 py-2 border rounded focus:outline-none ${
            theme === 'dark'
              ? 'border-gray-600 bg-gray-700 text-white'
              : 'border-gray-300 bg-white text-black'
          }`}
        />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: 'Email is required' })}
          className={`w-full px-4 py-2 border rounded focus:outline-none ${
            theme === 'dark'
              ? 'border-gray-600 bg-gray-700 text-white'
              : 'border-gray-300 bg-white text-black'
          }`}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default PersonalInformation;
