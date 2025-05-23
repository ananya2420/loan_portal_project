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

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div className="w-full max-w-md mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`p-8 rounded-lg shadow-md w-full text-center ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h1 className="text-3xl font-bold mb-6">Document Updates</h1>

          <div className="mb-6">
            <label
              htmlFor="document-upload"
              className="cursor-pointer inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
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
              className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
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
