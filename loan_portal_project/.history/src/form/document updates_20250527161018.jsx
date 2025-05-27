import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setDocumentUpdates } from '../redux/slices/formSlice';

const DocumentUpdates = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue('document', e.target.files);
    } else {
      setPreview(null);
    }
  };

  const onSubmit = (data) => {
    const file = data.document?.[0];
    const isUpdated = !!file;

    dispatch(
      setDocumentUpdates({
        isUpdated: isUpdated.toString(),
        fileName: file?.name || '',
        previewUrl: preview || '',
      })
    );

    navigate('/apply/summary');
  };

  const handleBack = () => {
    navigate('/apply/loan-details');
  };

  const currentStep = 5;
  const totalSteps = 8;

  const stepRoutes = {
    1: '/apply/apply',
    2: '/apply/personal-info',
    3: '/apply/employee-details',
    4: '/apply/loan-details',
    5: '/apply/document-updates',
    6: '/apply/summary',
    7: '/apply/review',
    8: '/apply/thank-you',
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div className="w-full max-w-md">

        {/* Theme Toggle */}
        <div className="flex items-center justify-end mb-4">
          <button
            onClick={() => dispatch({ type: 'theme/toggleTheme' })}
            className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
          >
            Toggle Theme
          </button>
        </div>

        {/* Step Indicator */}
        <div className="mb-6 grid grid-cols-8 gap-x-3 gap-y-2 text-xs font-semibold text-center">
         {[
  { step: 1, label: 'Apply', path: '/apply' },
  { step: 2, label: <>Personal<br />Info</>, path: '/apply/personal-info' },
  { step: 3, label: <>Employee<br />Details</>, path: '/apply/employee-details' },
  { step: 4, label: <>Loan<br />Details</>, path: '/apply/loan-details' },
  { step: 5, label: <>Document<br />Updates</>, path: '/apply/document-updates' },
  { step: 6, label: 'Summary', path: '/apply/summary' },
  { step: 7, label: 'Review', path: '/apply/review' },
  { step: 8, label: 'Thank you', path: '/thank-you' },
].map(({ step, label, path }) => (
  <div
    key={step}
    className="flex flex-col items-center col-span-1 cursor-pointer"
    onClick={() => {
      navigate(path); // 👈 THIS is where the navigation is triggered
}}
  

>

                <span
                  className={`w-7 h-7 flex items-center justify-center rounded-full font-bold ${
                    step === currentStep
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {step}
                </span>
                <span className="mt-1 truncate" title={typeof label === 'string' ? label : undefined}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto">
          <div className="relative pt-1 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-block px-2 py-1 text-xs font-semibold text-teal-600 uppercase bg-teal-200 rounded-full">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-xs font-semibold text-teal-600">50%</span>
            </div>
            <div className="flex h-2 overflow-hidden text-xs bg-teal-200 rounded">
              <div
                style={{ width: '50%' }}
                className="flex flex-col justify-center text-center text-white transition-all duration-500 bg-green-500 shadow-none whitespace-nowrap"
              />
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`p-8 rounded-lg shadow-md w-full text-center transition-all duration-300 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h1 className="text-3xl font-bold mb-6">Document Updates</h1>

          <div className="mb-6">
            <label
              htmlFor="document-upload"
              className={`px-4 py-2 rounded transition border ${
                theme === 'dark'
                  ? 'text-white border-gray-500 hover:bg-gray-700'
                  : 'text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              Upload Photo
            </label>
            <input
              id="document-upload"
              type="file"
              accept="image/*"
              {...register('document')}
              onChange={handleFileChange}
              className="hidden"
            />
            {errors.document && (
              <p className="text-red-600 text-sm mt-1">{errors.document.message}</p>
            )}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 mx-auto max-h-48 rounded border"
              />
            )}
          </div>

          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={handleBack}
              className={`px-4 py-2 rounded transition border ${
                theme === 'dark'
                  ? 'text-white border-gray-500 hover:bg-gray-700'
                  : 'text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
            >
              Submit Documents
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentUpdates;
