//Application For Structure
//add  react hook form 

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/progressbar';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';

const existingUsers = [
  { name: 'Alice Johnson', dob: '1990-05-15', phone: '1234567890', email: 'alice@example.com' },
  { name: 'Bob Smith', dob: '1985-08-22', phone: '0987654321', email: 'bob@example.com' },
  { name: 'Charlie Brown', dob: '1992-12-10', phone: '5555555555', email: 'charlie@example.com' },
  // Add more mock users here
];

const PersonalInformation = ({ setUserData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: { name: '', dob: '', phone: '', email: '' },
  });

  const totalFields = 4;
  const allFields = watch();

  // Filtered users based on input
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Watch name and email changes and filter users accordingly
  useEffect(() => {
    const nameInput = allFields.name.toLowerCase();
    const emailInput = allFields.email.toLowerCase();

    if (!nameInput && !emailInput) {
      setFilteredUsers([]);
      return;
    }

    const matches = existingUsers.filter(
      (user) =>
        (nameInput && user.name.toLowerCase().includes(nameInput)) ||
        (emailInput && user.email.toLowerCase().includes(emailInput))
    );

    setFilteredUsers(matches);
  }, [allFields.name, allFields.email]);

  // Autofill form with selected user data
  const handleSelectUser = (user) => {
    setValue('name', user.name);
    setValue('dob', user.dob);
    setValue('phone', user.phone);
    setValue('email', user.email);
    setFilteredUsers([]);
  };

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
        <div className="text-left relative">
          <label
            htmlFor="nameInput"
            className={`block text-sm font-medium mb-1 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`}
          >
            Full Name
          </label>
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

          {/* Suggestions dropdown */}
          {filteredUsers.length > 0 && (
            <ul
              className={`absolute z-10 w-full max-h-40 overflow-auto mt-1 bg-white border border-gray-300 rounded shadow-lg ${
                theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
              }`}
            >
              {filteredUsers.map((user, idx) => (
                <li
                  key={idx}
                  className="cursor-pointer px-3 py-2 hover:bg-blue-500 hover:text-white"
                  onClick={() => handleSelectUser(user)}
                >
                  {user.name} — {user.email}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Date of Birth */}
        <div className="text-left mt-4">
          <label
            htmlFor="dobInput"
            className={`block text-sm font-medium mb-1 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`}
          >
            Date of Birth
          </label>
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
          <label
            htmlFor="phoneInput"
            className={`block text-sm font-medium mb-1 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`}
          >
            Phone Number
          </label>
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
        <div className="text-left mt-4 relative">
          <label
            htmlFor="emailInput"
            className={`block text-sm font-medium mb-1 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`}
          >
            Email
          </label>
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

          {/* Suggestions dropdown */}
          {filteredUsers.length > 0 && (
            <ul
              className={`absolute z-10 w-full max-h-40 overflow-auto mt-1 bg-white border border-gray-300 rounded shadow-lg ${
                theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
              }`}
            >
              {filteredUsers.map((user, idx) => (
                <li
                  key={idx}
                  className="cursor-pointer px-3 py-2 hover:bg-blue-500 hover:text-white"
                  onClick={() => handleSelectUser(user)}
                >
                  {user.name} — {user.email}
                </li>
              ))}
            </ul>
          )}
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
