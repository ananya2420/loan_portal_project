
//use react-hook-form
//Add progresbar
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDocumentUpdates } from '../store/formSlice';
import ProgressBar from '../components/progressbar';

const UpdatedPicture = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const [currentStep] = useState(5); // Current step
  const totalSteps = 5;

  // Get form data from Redux
  const formData = useSelector((state) => state.formData);

  // Check if form is complete
  const isFormComplete = () => {
    return (
      formData.personalInfo?.name &&
      formData.EmployeeDetails?.status &&
      formData.loanDetails?.amount &&
      formData.loanDetails?.type
    );
  };

  const onSubmit = (data) => {
    const file = data.picture[0];

    if (!isFormComplete()) {
      alert('Please complete all previous steps before proceeding to review.');
      navigate('/apply'); // or navigate to the first incomplete step
      return;
    }

    dispatch(setDocumentUpdates({ isUpdated: true, fileName: file.name }));

    // Proceed only if form is complete
    navigate('/apply/summary');
  };

  const goBack = () => {
    navigate('/apply/document-details');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Upload Updated Picture</h2>
          <p className="text-gray-600 mb-6">Please upload your updated picture</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="picture"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  type="file"
                  accept="image/*"
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            />

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={goBack}
                className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-300"
              >
                Back
              </button>

              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Go to Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatedPicture;






