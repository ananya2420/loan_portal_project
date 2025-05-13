// src/components/TogglePage.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice'; // Assuming this is where your theme toggle action is

const TogglePage = () => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    // Dispatch the action to toggle the theme
    dispatch(toggleTheme());
  };

  return (
    <div className="toggle-page">
      <h2>Toggle Page</h2>
      <p>Click the button below to toggle the theme:</p>
      <button onClick={handleToggle}>Toggle Theme</button>
    </div>
  );
};

export default TogglePage;
