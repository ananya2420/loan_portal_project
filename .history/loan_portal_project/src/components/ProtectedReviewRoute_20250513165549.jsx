import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedReviewRoute = ({ children }) => {
  const navigate = useNavigate();
  const personalInfo = useSelector((state) => state.formData.personalInfo); // Assuming this is where the data is stored

  // Check if the form data is incomplete
  if (!personalInfo || !personalInfo.username) {
    // If incomplete, redirect to the home page or any other page
    navigate('/');
    return null;
  }

  return children;
};

export default ProtectedReviewRoute;
