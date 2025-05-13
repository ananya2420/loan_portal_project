import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedReviewRoute = ({ children }) => {
  const userData = useSelector((state) => state.userData); // update this if your state is named differently

  const { personalInfo, EmployeeDetails, loanDetails, DocumentUpdates } = userData || {};

  const isFormComplete =
    personalInfo?.name &&
    personalInfo?.dob &&
    personalInfo?.phone &&
    personalInfo?.email &&
    EmployeeDetails?.status &&
    loanDetails?.amount &&
    DocumentUpdates?.isUpdated;

  if (!isFormComplete) {
    return <Navigate to="/" replace />; // Redirect to start or desired page
  }

  return children;
};

export default ProtectedReviewRoute;
