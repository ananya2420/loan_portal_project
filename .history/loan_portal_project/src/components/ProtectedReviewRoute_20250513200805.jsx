import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedReviewRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn); // Ensure this value is correct

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children; // Render children if the user is logged in
};

export default ProtectedReviewRoute;




