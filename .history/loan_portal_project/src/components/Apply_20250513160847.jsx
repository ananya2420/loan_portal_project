//pages and routes
//Apply component-redirect to- Review page
//use React-hook-form

// src/components/Apply.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';

const Apply = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme); // Access current theme

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    navigate('/apply/personal-info');
  };

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`max-w-md w-full p-6 shadow-md rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-center flex-1">
            Loan Application
          </h1>
          <button
            type="button"
            onClick={handleToggle}
            className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
          >
            Toggle Theme
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            {...register('name', { required: 'Full name is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Start Application
        </button>
      </form>
    </div>
  );
};

export default Apply;
