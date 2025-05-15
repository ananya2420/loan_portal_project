import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import incomeproof from '../assets/incomeproof.png'

const PicturePreview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { picture } = location.state || {}; // Get the picture from the passed state

  if (!picture) {
    // If no picture is found, redirect to the previous step or home
    navigate('/apply');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Picture Preview</h2>
        <div className="flex justify-center mb-4">
          <img src={incomeproof} alt="Uploaded" className="object-cover rounded-lg w-96 h-96" />
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigate('/apply/updated-picture')}
            className="px-6 py-2 text-white bg-gray-400 rounded-lg hover:bg-gray-500"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/apply/summary')}
            className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Proceed to Summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default PicturePreview;
