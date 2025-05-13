import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedReviewRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Replace as per your logic

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedReviewRoute;

