//Application For Structure
//show a read only summary of all user input with edts otion ad final submission
//react-hook-form 
//add progress bar

// src/pages/Summary.js
import React from 'react';
import { useSelector } from 'react-redux';

const Summary = () => {
  const formData = useSelector((state) => state.formData);

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-900">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-4">Application Summary</h1>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Personal Info</h2>
          <p>Name: {formData?.personalInfo?.name}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Employee Details</h2>
          <p>Status: {formData?.employeeDetails?.status}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Loan Details</h2>
          <p>Amount: {formData?.loanDetails?.amount}</p>
          <p>Type: {formData?.loanDetails?.type}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Uploaded Picture</h2>
          {formData?.documentUpdates?.file ? (
            <img
              src={URL.createObjectURL(formData.documentUpdates.file)}
              alt="Uploaded"
              className="w-32 h-32 object-cover rounded-full mt-2"
            />
          ) : (
            <p>No picture uploaded</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary; 






