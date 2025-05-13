//Application For Structure

import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpdatedPicture = ({ userData, setUserData }) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    setUserData((prev) => ({ ...prev, updatedPicture: { uploaded: true } }));
    navigate('/apply/summary');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Upload Updated Picture</h2>
        <p className="text-gray-600 mb-6">Imagine file upload here</p>
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Go to Review
        </button>
      </div>
    </div>
  );
};

export default UpdatedPicture;

