//Theming a theme toggle (Light/dark) using redux state.
//Theme reference must persist

import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { updateTheme } from '../redux/actions/theme';

function TogglePage() {
  const [isDarkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const initialTheme = localStorage.getItem('theme') || 'light';
    dispatch(updateTheme(initialTheme));
  }, [dispatch]);

  const toggle = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setDarkMode(!isDarkMode);
    dispatch(updateTheme(newTheme));
    localStorage.setItem('theme', newTheme);  // Save theme to localStorage
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Toggle Theme Page
        </h1>
        <div className="flex justify-center">
          {!isDarkMode ? (
            <FaSun
              onClick={toggle}
              className="text-yellow-500 cursor-pointer text-3xl"
            />
          ) : (
            <FaMoon
              onClick={toggle}
              className="text-blue-500 cursor-pointer text-3xl"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TogglePage;
