//Home component- redirect to- Apply page
//use react-hook-form
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

  const totalFields = 4;
  const allFields = watch();

  const validFieldsCount = Object.keys(allFields).filter(
    (field) => !errors[field] && allFields[field]
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
      {/* Toggle Theme */}
      <div className="w-full max-w-md flex justify-end mb-4">
        <button
          onClick={handleToggleTheme}
          className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
        >
          Toggle Theme
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className={`p-8 rounded-lg shadow-md w-full max-w-md text-center transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <ProgressBar currentStep={validFieldsCount} totalSteps={totalFields} />
        <h2 className="mb-4 text-2xl font-bold text-center">Personal Information</h2>

        {/* Full Name */}
        <div className="text-left">
          {(allFields.name || document.activeElement === document.getElementById('nameInput')) && (
            <label
              htmlFor="nameInput"
              className={`block text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Full Name
            </label>
          )}
          <input
            id="nameInput"
            placeholder="Full Name"
            {...register('name', { required: 'Full Name is required' })}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-black placeholder-gray-500'
            }`}
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        {/* Date of Birth */}
        <div className="text-left mt-4">
          {(allFields.dob || document.activeElement === document.getElementById('dobInput')) && (
            <label
              htmlFor="dobInput"
              className={`block text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Date of Birth
            </label>
          )}
          <input
            id="dobInput"
            type="date"
            {...register('dob', { required: 'Date of Birth is required' })}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-black placeholder-gray-500'
            }`}
          />
          {errors.dob && <p className="text-sm text-red-500 mt-1">{errors.dob.message}</p>}
        </div>

        {/* Phone Number */}
        <div className="text-left mt-4">
          {(allFields.phone || document.activeElement === document.getElementById('phoneInput')) && (
            <label
              htmlFor="phoneInput"
              className={`block text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Phone Number
            </label>
          )}
          <input
            id="phoneInput"
            placeholder="Phone Number"
            {...register('phone', { required: 'Phone Number is required' })}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-black placeholder-gray-500'
            }`}
          />
          {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
        </div>

        {/* Email */}
        <div className="text-left mt-4">
          {(allFields.email || document.activeElement === document.getElementById('emailInput')) && (
            <label
              htmlFor="emailInput"
              className={`block text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Email
            </label>
          )}
          <input
            id="emailInput"
            type="email"
            placeholder="Email"
            {...register('email', { required: 'Email is required' })}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-black placeholder-gray-500'
            }`}
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-6"
          disabled={!isValid}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default PersonalInformation;
