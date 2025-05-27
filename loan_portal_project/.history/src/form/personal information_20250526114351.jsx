import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';
import ProgressBar from '../components/progressbar';
import { setPersonalInfo } from '../store/formSlice';

const sampleUsers = [];

const PersonalInformation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const personalInfo = useSelector((state) => state.formData.personalInfo);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: personalInfo || { name: '', dob: '', phone: '', email: '' },
  });

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [focusedField, setFocusedField] = useState('');
  const [hoverField, setHoverField] = useState('');
  const currentStep = 2;
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

  const onSubmit = (data) => {
    dispatch(setPersonalInfo(data));
    navigate('/apply/employee-details');
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
    navigate('/apply');
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          <button
            onClick={handleToggleTheme}
            className="px-3 py-1 ml-4 text-sm text-white transition bg-fuchsia-600 rounded hover:bg-fuchsia-700"
          >
            Toggle Theme
          </button>
        </div>

        <div className="mb-6 grid grid-cols-8 gap-2 text-xs font-semibold text-center">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
            <div key={step} className="flex flex-col items-center col-span-1">
              <span
                className={`w-7 h-7 flex items-center justify-center rounded-full font-bold ${
                  step === currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-purple-600'
                }`}
              >
                {step}
              </span>
              <span className="mt-1 truncate text-purple-600">
                {{
                  1: 'Apply',
                  2: (
                    <>
                      Personal<br />Info
                    </>
                  ),
                  3: (
                    <>
                      Employee<br />Details
                    </>
                  ),
                  4: (
                    <>
                      Loan<br />Details
                    </>
                  ),
                  5: (
                    <>
                      Document<br />Updates
                    </>
                  ),
                  6: 'Summary',
                  7: 'Review',
                  8: 'Thank you',
                }[step]}
              </span>
            </div>
          ))}
        </div>

        <div className="relative pt-1 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-orange-700 uppercase rounded-full bg-lime-200">
              Step 2 of 8
            </span>
            <span className="text-xs font-semibold text-orange-700 bg-lime-200 px-1 rounded">
              20%
            </span>
          </div>
          <div className="flex h-2 overflow-hidden text-xs bg-orange-200 rounded">
            <div
              style={{ width: '20%' }}
              className="flex flex-col justify-center text-center text-white transition-all duration-500 bg-green-500 shadow-none whitespace-nowrap"
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className={`shadow-lg rounded-lg p-8 w-full space-y-4 transition-all duration-300 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="mb-4 text-2xl font-bold text-center">Personal Information</h2>

          <div
            className="relative"
            onMouseEnter={() => setHoverField('name')}
            onMouseLeave={() => setHoverField('')}
          >
            {(allFields.name || focusedField === 'name') && (
              <label className="block mb-1 text-sm font-medium text-blue-600">
                Full Name
              </label>
            )}
            <input
              placeholder="Full Name"
              {...register('name', { required: 'Full Name is required' })}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField('')}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
            {hoverField === 'name' && focusedField !== 'name' && (
              <ul className="absolute z-10 w-full max-h-40 overflow-auto mt-1 border rounded shadow-lg bg-white" />
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

          <div>
            <label className="block mb-1 text-sm font-medium text-pink-600">
              Date of Birth<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register('dob', { required: 'Date of Birth is required' })}
              placeholder="Date of Birth"
              onFocus={() => setFocusedField('dob')}
              onBlur={() => setFocusedField('')}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            />
            {errors.dob && (
              <p className="text-sm text-red-500 mt-1">{errors.dob.message}</p>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setHoverField('phone')}
            onMouseLeave={() => setHoverField('')}
          >
            <label className="block mb-1 text-sm font-medium text-green-600">
              Phone Number
            </label>
            <input
              placeholder="Phone Number"
              {...register('phone', {
                required: 'Phone Number is required',
                pattern: {
                  value: /^\d{11}$/,
                  message: 'Phone Number must be exactly 11 digits',
                },
              })}
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField('')}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            />
            {errors.phone && (
              <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setHoverField('email')}
            onMouseLeave={() => setHoverField('')}
          >
            <label className="block mb-1 text-sm font-medium text-purple-600">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField('')}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 text-white transition duration-300 bg-outline-500 rounded-lg hover:bg-rose-600"
            >
              Back
            </button>
            <button
              type="submit"
              className={`px-6 py-3 text-white transition duration-300 rounded-lg ${
                isValid
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-emerald-400 cursor-not-allowed'
              }`}
              disabled={!isValid}
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




