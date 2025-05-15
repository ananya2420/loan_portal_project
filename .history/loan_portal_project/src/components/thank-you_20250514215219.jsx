-//pages and routes
//thank-you  redirect back to the homepage or another page

// src/components/Thankyou.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice'; // Import the toggleTheme action

const Thankyou = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme); // Get the current theme from Redux state

  const handleGoHome = () => {
    navigate('/'); // Navigate to the homepage
  };

  const handleGoToLogin = () => {
    navigate('/login'); // Navigate to the login page
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme()); // Dispatch action to toggle theme
  };

  const handleBack = () => {
