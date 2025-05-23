import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';
import ProgressBar from '../components/progressbar';

const sampleUsers = [
  { name: 'Gourab', dob: '1990-01-01', phone: '01700-675328', email: 'gourab@example.com' },
  { name: 'Bob', dob: '1985-05-15', phone: '01654-235476', email: 'bob@example.com' },
];

const PersonalInformation = ({ setUserData, userData, onSubmit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: userData || { name: '', dob: '', phone: '', email: '' },
  });

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [focusedField, setFocusedField] = useState('');
  const [hoverField, setHoverField] = useState('');
  const currentStep = 2;  // Corrected from 1 to 2 because this is Personal Info step
  const totalSteps = 8;
  const allFields = watch();
  const watchName = watch('name');

  useEffect(() => {
    if (watchName || ['name', 'phone', 'email'].includes(focusedField)) {
      const filtered = sampleUsers.filter((user) =>
        user.name.toLowerCase().includes(watchName?.toLowerCase() || '')
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  }, [watchName, focusedField]);

  const submitHandler = (data) => {
    onSubmit(data); // Save data in parent
    reset({ name: '', dob: '', phone: '', email: '' }); // Clear form on Next
    navigate('/apply/employee-details'); // Navigate to next step (change as per your routing)
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleSelectUser = (user) => {
    setValue('name', user.name);
    setValue('dob', user.dob);
    setValue('phone', user.phone);
    setValue('email', user.email);
    setFilteredUsers([]);
  };

  const handleBack = () => {
    // Do NOT reset form, just navigate back to keep userData in parent
    navigate('/apply'); // change route as needed
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div className="w-full max-w-md">
        {/* Step Indicator */}
        <div className="mb-6 grid grid-cols-8 gap-2 text-xs font-semibold text-center">
          {[
            { step: 1, label: 'Apply' },
            { step: 2, label: (
              <>
                Personal
                <br />
                Info
              </>
            ) },
            { step: 3, label: (
              <>
                Employee
                <br />
                Details
              </>
            ) },
            { step: 4, label: (
              <>
                Loan
                <br />
                Details
              </>
            ) },
            { step: 5, label: (
              <>
                Document
                <br />
                Updates
              </>
            ) },
            { step: 6, label: 'Summary' },
            { step: 7, label: 'Review' },
            { step: 8, label: 'Thank you' },
          ].map(({ step, label }) => (
            <div key={step} className="flex flex-col items-center col-span-1">
              <span
                className={`w-7 h-7 flex items-center justify-center rounded-full font-bold ${
                  step === currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step}
              </span>
              <span
                className="mt-1 truncate"
                title={typeof label === 'string' ? label : undefined}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Info */}
        <div className="relative pt-1 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-teal-600 uppercase bg-teal-200 rounded-full">
              Step 2 of 8
            </span>
            <span className="text-xs font-semibold text-teal-600">20%</span>
          </div>
          <div className="flex h-2 overflow-hidden text-xs bg-teal-200 rounded">
            <div
              style={{ width: '20%' }}
              className="flex flex-col justify-center text-center text-white transition-all duration-500 bg-green-500 shadow-none whitespace-nowrap"
            />
          </div>
        </div>

        {/* Theme Toggle and ProgressBar */}
        <div className="flex items-center justify-between mb-4">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          <button
            onClick={handleToggleTheme}
            className="px-3 py-1 ml-4 text-sm text-white transition bg-indigo-500 rounded hover:bg-indigo-600"
          >
            Toggle Theme
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(submitHandler)}
          autoComplete="off"
          className={`shadow-lg rounded-lg p-8 w-full space-y-4 transition-all duration-300 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="mb-4 text-2xl font-bold text-center">
            Personal Information
          </h2>

          {/* Full Name */}
          <div
            className="relative"
            onMouseEnter={() => setHoverField('name')}
            onMouseLeave={() => setHoverField('')}
          >
            {(allFields.name || focusedField === 'name') && (
              <label className="block mb-1 text-sm font-medium">Full Name</label>
            )}
            <input
              placeholder="Full Name"
              {...register('name', { required: 'Full Name is required' })}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField('')}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
            {hoverField === 'name' && focusedField !== 'name' && (
              <ul className="absolute z-10 w-full max-h-40 overflow-auto mt-1 border rounded shadow-lg bg-white">
                {['gourab', 'bob'].map((option) => (
                  <li
                    key={option}
                    className="cursor-pointer px-3 py-2 hover:bg-blue-500 hover:text-white"
                    onMouseDown={() => setValue('name', option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
            {filteredUsers.length > 0 && focusedField === 'name' && (
              <ul className="absolute z-10 w-full max-h-40 overflow-auto mt-1 border rounded shadow-lg bg-white">
                {filteredUsers.map((user, idx) => (
                  <li
                    key={idx}
                    className="cursor-pointer px-3 py-2 hover:bg-blue-500 hover:text-white"
                    onMouseDown={() => handleSelectUser(user)}
                  >
                    {user.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* DOB with asterisk */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Date of Birth<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register('dob', { required: 'Date of Birth is required' })}
              placeholder="Date of Birth"
              onFocus={() => setFocusedField('dob')}
              onBlur={() => setFocusedField('')}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.dob && (
              <p className="text-sm text-red-500 mt-1">{errors.dob.message}</p>
            )}
          </div>

          {/* Phone */}
          <div
            className="relative"
            onMouseEnter={() => setHoverField('phone')}
            onMouseLeave={() => setHoverField('')}
          >
            <input
              placeholder="Phone Number"
              {...register('phone', { required: 'Phone Number is required' })}
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField('')}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && (
              <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
            )}
            {hoverField === 'phone' && focusedField !== 'phone' && (
              <ul className="absolute z-10 w-full max-h-40 overflow-auto mt-1 border rounded shadow-lg bg-white">
                {['01700-675328', '01654-235476'].map((option) => (
                  <li
                    key={option}
                    className="cursor-pointer px-3 py-2 hover:bg-blue-500 hover:text-white"
                    onMouseDown={() => setValue('phone', option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Email */}
          <div
            className="relative"
            onMouseEnter={() => setHoverField('email')}
            onMouseLeave={() => setHoverField('')}
          >
            <input
              type="email"
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField('')}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
            {hoverField === 'email' && focusedField !== 'email' && (
              <ul className="absolute z-10 w-full max-h-40 overflow-auto mt-1 border rounded shadow-lg bg-white">
                {['aborty@gmail.com', 'a@gmail.com'].map((option) => (
                  <li
                    key={option}
                    className="cursor-pointer px-3 py-2 hover:bg-blue-500 hover:text-white"
                    onMouseDown={() => setValue('email', option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 text-white transition duration-300 bg-gray-500 rounded-lg hover:bg-gray-600"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className={`px-6 py-3 text-white transition duration-300 rounded-lg ${
                isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInformation;
