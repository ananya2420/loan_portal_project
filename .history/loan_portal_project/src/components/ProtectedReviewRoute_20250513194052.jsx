// ProtectedReviewRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedReviewRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Check if the user is logged in

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // Redirect to login page if not logged in
  }

  return children; // Return children (Review page) if logged in
};

export default ProtectedReviewRoute;



