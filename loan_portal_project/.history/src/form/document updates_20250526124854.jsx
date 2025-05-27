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
            className="px-3 py-1 ml-4 text-sm text-white transition bg-emerald-400 rounded hover:bg-emerald-500"
          >
            Toggle Theme
          </button>
        </div>

        {/* Step Indicator */}
        <div className="mb-6 grid grid-cols-8 gap-x-3 gap-y-2 text-xs font-semibold text-center">
          {[
            { step: 1, label: 'Apply' },
            { step: 2, label: <>Personal<br />Info</> },
            { step: 3, label: <>Employee<br />Details</> },
            { step: 4, label: <>Loan<br />Details</> },
            { step: 5, label: <>Document<br />Updates</> },
            { step: 6, label: 'Summary' },
            { step: 7, label: 'Review' },
            { step: 8, label: 'Thank you' },
          ].map(({ step, label }) => (
            <div key={step} className="flex flex-col items-center col-span-1">
              <span
                className={`w-7 h-7 flex items-center justify-center rounded-full font-bold ${
                  step === currentStep
                    ? theme === 'dark'
                      ? 'bg-yellow-400 text-black' // yellow bg + black text on dark
                      : 'bg-green-700 text-white' // green bg + white text on light
                    : theme === 'dark'
                      ? 'bg-yellow-600 text-yellow-200' // darker yellow bg + lighter yellow text dark
                      : 'bg-green-300 text-green-800'  // lighter green bg + dark green text light
                }`}
              >
                {step}
              </span>
              <span
                className="mt-1 truncate text-black"
                title={typeof label === 'string' ? label : undefined}
              >
                {label}
              </span>
            </div>
          ))}
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
              className={`cursor-pointer inline-block px-6 py-2 rounded transition ${
                'bg-green-600 text-white hover:bg-green-700'
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
            {errors.document && <p className="text-red-600 text-sm mt-1">{errors.document.message}</p>}

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
              className="px-6 py-2 rounded transition bg-outline-600 text-gray hover:bg-outline-700"
            >
              Back
            </button>
            <button
              type="submit"
              className={`cursor-pointer inline-block px-6 py-2 rounded transition ${
                'bg-green-600 text-white hover:bg-green-700'
              }`}
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
