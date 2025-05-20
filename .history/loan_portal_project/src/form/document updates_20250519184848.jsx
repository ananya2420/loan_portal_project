import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProgressBar from '../components/progressbar';
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
    defaultValues: savedData || { isUpdated: false, fileName: 'Gourab' },
  });

  const requiredFields = ['isUpdated']; // or any fields you want to validate
  const watchedValues = watch();

  const validFieldsCount = requiredFields.filter(
    (field) => !errors[field] && watchedValues[field]
  ).length;

  const totalSteps = requiredFields.length;

  const onSubmit = () => {
    //dispatch(setDocumentUpdates(data)); // Save form data to Redux
    navigate('/apply/summary'); // Navigate to summary page
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
      <div className="w-full max-w-md flex justify-end mb-4 px-0">
        <button
          onClick={handleToggleTheme}
          className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
        >
          Toggle Theme
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`w-full max-w-md rounded-lg shadow-lg p-8 transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <ProgressBar currentStep={validFieldsCount} totalSteps={totalSteps} />

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

        <div className="flex justify-center">
          <button
            type={onSubmit}
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
