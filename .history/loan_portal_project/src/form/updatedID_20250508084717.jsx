//Application For Structure


import React, { useState } from 'react';
import incomeproof from "../assets/incomeproof.png";

const UpdatedPicture = () => {
  const [picture, setPicture] = useState('');

  const handleChangePicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-center">Upload Updated Picture</h2>
      
      <input
        type="file"
        accept="image/*"
        onChange={handleChangePicture}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />

      <div className="text-center mt-4">
        <h4 className="font-medium mb-2">Preview</h4>
        <img
          src={picture || incomeproof}
          alt="Updated Preview"
          className="w-52 h-auto mx-auto rounded-md border"
        />
      </div>
    </div>
  );
};

export default UpdatedPicture;
