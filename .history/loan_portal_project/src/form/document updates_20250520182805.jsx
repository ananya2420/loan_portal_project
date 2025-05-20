import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';
import { setDocumentUpdates } from '../redux/slices/formSlice';

const DocumentUpdates = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const savedData = useSelector((state) => state.formData?.documentUpdates);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: savedData || { isUpdated: false, fileName: '' },
  });

  const watchedValues = watch();

  const onSubmit = (data) => {
    dispatch(setDocumentUpdates(data));
    navigate('/apply/summary');
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleBack = () => {
    navigate('/apply/loan-details');
  };

  // 8-step labels
  const steps = [
    'Personal Info',
    'Employee Details',
    'Loan Details',
    'Document Updates',
    'Summary',
    'Review',
    'Thank You',
    'Final Step',
  ];

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      {/* Theme Toggle Button */}
      <div className="w-full max-w-md flex justify-end mb-4 px-0">
        <button
          onClick={handleToggleTheme}
          className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
        >
          Toggle Theme
        </button>
      </div>

      {/* 8-step Progress Bar with Document Updates active */}
      <div className="flex justify-between max-w-md mx-auto mb-6 px-4 w-full">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = label === 'Document Updates';

          return (
            <div key={label} className="flex flex-col items-center w-1/8">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1
                  ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}
              >
                {stepNumber}
              </div>
              <div
                className={`text-xs text-center ${isActive ? 'font-bold text-blue-600' : 'text-gray-600'}`}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`w-full max-w-md rounded-lg shadow-lg p-8 transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Document Updates</h1>

        <div className="mb-4 text-left">
          <label htmlFor="isUpdated" className="block font-semibold mb-2">
            Have you updated documents?
          </label>
          <input
            type="checkbox"
            id="isUpdated"
            {...register('isUpdated')}
            className="mr-2"
          />
        </div>

        <div className="mb-6 text-left">
          <label htmlFor="fileName" className="block font-semibold mb-2">
            File Name
          </label>
          <input
            type="text"
            id="fileName"
            placeholder="Enter file name"
            {...register('fileName', {
              required: watchedValues.isUpdated ? 'File name is required' : false,
            })}
            className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-black'
            }`}
          />
          {errors.fileName && (
            <p className="text-red-500 text-sm mt-1">{errors.fileName.message}</p>
          )}
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-400 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-500 transition duration-300"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit Documents
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentUpdates;
