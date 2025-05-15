import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toggleTheme } from '../redux/slices/themeSlice';
import { setConfirmation } from '../redux/slices/formSlice';

const Review = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const confirmation = useSelector((state) => state.formData.confirmation);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      confirmation: confirmation || false,
    },
  });

  const onSubmit = (data) => {
    dispatch(setConfirmation(data.confirmation));
    navigate('/thank-you');
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleBack = () => {
    navigate('/apply/summary'); // ✅ Navigate to summary
  };

  const handleNext = () => {
    navigate('/apply/updated-picture'); // ✅ Navigate to updated picture
  };

  return (
    <>
      {/* Progress Indicator */}
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="relative pt-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="inline-block px-2 py-1 text-xs font-semibold text-teal-600 uppercase bg-teal-200 rounded-full">
                Step 6 of 6
              </span>
            </div>
            <div className="text-right">
              <span className="inline-block text-xs font-semibold text-teal-600">
                100%
              </span>
            </div>
          </div>
          <div className="flex h-2 mb-4 overflow-hidden text-xs bg-teal-200 rounded">
            <div
              style={{ width: isSubmitting ? '100%' : '0%' }}
              className={`transition-all duration-500 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                isSubmitting ? 'bg-green-500' : 'bg-teal-500'
              }`}
            ></div>
          </div>
        </div>
      </div>

      <div
        className={`max-w-4xl mx-auto p-6 shadow-md rounded-lg ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        }`}
      >
        <h1 className="mb-4 text-3xl font-bold text-center">Review and Confirm</h1>
        <p className="mb-6 text-lg">Summary of your input</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
