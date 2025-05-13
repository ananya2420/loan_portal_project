// src/routes/ProtectedReviewRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedReviewRoute = ({ children }) => {
  const userData = useSelector((state) => state.userData); // Access your user data from the Redux store

  const { personalInfo, EmployeeDetails, loanDetails, DocumentUpdates } = userData || {};

  // Check if all the required fields are filled
  const isFormComplete =
    personalInfo?.name &&
    personalInfo?.dob &&
    personalInfo?.phone &&
    personalInfo?.email &&
    EmployeeDetails?.status &&
    loanDetails?.amount &&
    DocumentUpdates?.isUpdated;

  // If the form is incomplete, redirect the user
  if (!isFormComplete) {
    return <Navigate to="/apply/review" replace />;
  }

  // If the form is complete, allow the user to access the Review page
  return children;
};

export default ProtectedReviewRoute;
