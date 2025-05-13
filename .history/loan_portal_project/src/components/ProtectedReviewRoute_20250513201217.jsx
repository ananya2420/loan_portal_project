import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedReviewRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn); // Check if the user is logged in

  if (!isLoggedIn) {
    return <Navigate to="/apply/review" replace />; // Redirect if not logged in
  }

  return children; // Render children (Review) if logged in
};

export default ProtectedReviewRoute;





