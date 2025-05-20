
//form rogress indicator 


// src/components/ProgressBar.jsx
import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  // Render the progress bar based on the current step and total steps
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
    </div>
  );
};

export default ProgressBar;  
