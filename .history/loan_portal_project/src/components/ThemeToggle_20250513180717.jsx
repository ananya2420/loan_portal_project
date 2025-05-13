// src/components/ThemeToggle.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { toggleTheme } from '../redux-slice-themeSlice';  // Ensure correct import path
import 
const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme); // Get the current theme from the Redux store

  const handleToggle = () => {
    dispatch(toggleTheme()); // Dispatch the toggleTheme action to change the theme
  };

  return (
    <button
      onClick={handleToggle}
      className={`px-4 py-2 rounded-full transition-colors ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
