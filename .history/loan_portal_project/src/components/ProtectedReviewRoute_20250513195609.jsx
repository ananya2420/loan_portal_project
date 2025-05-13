// ProtectedReviewRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedReviewRoute = ({ children }) => {
  // Use optional chaining to prevent errors when state.auth is undefined
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedReviewRoute;




