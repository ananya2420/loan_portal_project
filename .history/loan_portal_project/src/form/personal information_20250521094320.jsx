//Application For Structure
//add  react hook form 
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/progressbar';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';

const sampleUsers = [
  { name: 'Gourab Sen', dob: '1990-01-01', phone: '1234567890', email: 'gourab@gmail.com' },
  { name: 'Alice Johnson', dob: '1985-05-15', phone: '9876543210', email: 'alice@example.com' },
  { name: 'Bob Smith', dob: '1978-10-20', phone: '5555555555', email: 'bob@example.com' },
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

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [focusedField, setFocusedField] = useState('');

  const watchName = watch('name');
  const allFields = watch();

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

  const totalFields = 4;
  const validFieldsCount = Object.keys(allFields).filter(
    (field) => !errors[field] && allFields[field]
  ).length;

  const onSubmit = () => {
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
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
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
        <div className="w-full max-w-md mb-6 grid grid-cols-4 gap-2 text-sm font-semibold">
          {[
            { step: 0, label: 'Apply' },
            { step: 1, label: 'Personal Info' },
            { step: 2, label: 'Employee Details' },
            { step: 3, label: 'Loan Details' },
            { step: 4, label: 'Document Updates' },
            { step: 5, label: 'Summary' },
            { step: 6, label: 'Review' },
            { step: 7, label: 'Thank you' },
          ].map(({ step, label }) => (
            <div key={step} className="flex flex-col items-center col-span-1">
              <span
                className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                  step === 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step}
              </span>
              <span className="text-center">{label}</span>
            </div>
          ))}
        </div>

        <div className="w-full max-w-md mx-auto">
        <div className="relative pt-1 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-teal-600 uppercase bg-teal-200 rounded-full">
              Step 2 of 5
            </span>
            <span className="text-xs font-semibold text-teal-600">40%</span>
          </div>
          <div className="flex h-2 overflow-hidden text-xs bg-teal-200 rounded">
            <div
              style={{ width: '40%' }}
              className="flex flex-col justify-center text-center text-white transition-all duration-500 bg-green-500 shadow-none whitespace-nowrap"
            />
          </div>
        </div>
      </div>

        <ProgressBar currentStep={validFieldsCount} totalSteps={totalFields} />
        <h2 className="mb-4 text-2xl font-bold text-center">Personal Information</h2>

        {/* Full Name with suggestions */}
        <div className="text-left relative">
          {(allFields.name || focusedField === 'name') && (
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
            autoComplete="off"
            {...register('name', { required: 'Full Name is required' })}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField('')}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-black placeholder-gray-500'
            }`}
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}

          {filteredUsers.length > 0 && (
            <ul
              className={`absolute z-10 w-full max-h-40 overflow-auto mt-1 border rounded shadow-lg ${
                theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'
              }`}
            >
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

        {/* Date of Birth */}
        <div className="text-left mt-4">
          {(allFields.dob || focusedField === 'dob') && (
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
            onFocus={() => setFocusedField('dob')}
            onBlur={() => setFocusedField('')}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-black'
            }`}
          />
          {errors.dob && <p className="text-sm text-red-500 mt-1">{errors.dob.message}</p>}
        </div>

        {/* Phone Number */}
        <div className="text-left mt-4">
          {(allFields.phone || focusedField === 'phone') && (
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
            onFocus={() => setFocusedField('phone')}
            onBlur={() => setFocusedField('')}
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
          {(allFields.email || focusedField === 'email') && (
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
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField('')}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-black placeholder-gray-500'
            }`}
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleBack}
            className="w-1/3 p-3 rounded font-semibold text-gray-700 border border-gray-400 hover:bg-gray-200 transition"
          >
            Back
          </button>
          <button
            type="submit"
            className={`w-1/3 p-3 rounded font-semibold text-white transition ${
              isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;
