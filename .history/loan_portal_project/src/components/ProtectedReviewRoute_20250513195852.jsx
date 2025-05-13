import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedReviewRoute = ({ children }) => {
  // Safely access the isLoggedIn property using optional chaining
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);

  if (isLoggedIn === undefined) {
    // Optional: Handle loading or undefined state gracefully
    return <div>Loading...</div>; // Or any other loading indicator
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // Redirect to login page if not logged in
  }

  return children; // Return children (Review page) if logged in
};

export default ProtectedReviewRoute;





