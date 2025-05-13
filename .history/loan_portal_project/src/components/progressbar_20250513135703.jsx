
//form rogress indicator 



// src/components/ProgressBar.jsx
import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100; // Calculate the progress percentage

  return (
    <div className="w-full h-2 bg-gray-300 rounded-full">
      <div
        className="h-full bg-blue-600 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;

