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

  const watchCity = watch('city');
  const watchState = watch('state');
  const allFields = watch();
  const totalFields = 4;

  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);

  // Autocomplete filtering
  useEffect(() => {
    setFilteredCities(
      watchCity
        ? cities.filter((c) =>
            c.toLowerCase().includes(watchCity.toLowerCase())
          )
        : []
    );
  }, [watchCity]);

  useEffect(() => {
    setFilteredStates(
      watchState
        ? states.filter((s) =>
            s.toLowerCase().includes(watchState.toLowerCase())
          )
        : []
    );
  }, [watchState]);

  const handleCitySelect = (city) => {
    setValue('city', city);
    setFilteredCities([]);
  };

  const handleStateSelect = (state) => {
    setValue('state', state);
    setFilteredStates([]);
  };

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
      {/* Toggle Theme */}
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
        <ProgressBar currentStep={validFieldsCount} totalSteps={totalFields} />
        <h2 className="mb-4 text-2xl font-bold text-center">Personal Information</h2>

        {/* First Name */}
        <div className="mb-4 text-left">
          <input
            placeholder="First Name"
            {...register('firstName', { required: 'First name is required' })}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-black placeholder-gray-500'
            }`}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
          )}
        </div>

        {/* City with Autocomplete */}
        <div className="mb-4 text-left relative">
          <input
            placeholder="City"
            {...register('city', { required: 'City is required' })}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-black placeholder-gray-500'
            }`}
          />
          {errors.city && (
            <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>
          )}
          {filteredCities.length > 0 && (
            <ul
              className={`absolute z-10 w-full max-h-40 overflow-auto mt-1 bg-white border border-gray-300 rounded shadow-lg ${
                theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
              }`}
            >
              {filteredCities.map((city, index) => (
                <li
                  key={index}
                  className="cursor-pointer px-3 py-2 hover:bg-blue-500 hover:text-white"
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* State with Autocomplete */}
        <div className="mb-4 text-left relative">
          <input
            placeholder="State"
            {...register('state', { required: 'State is required' })}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-black placeholder-gray-500'
            }`}
          />
          {errors.state && (
            <p className="text-sm text-red-500 mt-1">{errors.state.message}</p>
          )}
          {filteredStates.length > 0 && (
            <ul
              className={`absolute z-10 w-full max-h-40 overflow-auto mt-1 bg-white border border-gray-300 rounded shadow-lg ${
                theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
              }`}
            >
              {filteredStates.map((state, index) => (
                <li
                  key={index}
                  className="cursor-pointer px-3 py-2 hover:bg-blue-500 hover:text-white"
                  onClick={() => handleStateSelect(state)}
                >
                  {state}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Phone Number */}
        <div className="mb-4 text-left">
          <input
            placeholder="Phone Number"
            type="tel"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Enter a valid 10-digit phone number',
              },
            })}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-black placeholder-gray-500'
            }`}
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;

