// src/redux-slice-themeSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

// Load the initial theme from localStorage if available, else default to 'light'
const initialState = {
  theme: localStorage.getItem('theme') || 'light', // Default to 'light' theme if no theme is stored
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      // Toggle the theme value
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      // Save the new theme to localStorage
      localStorage.setItem('theme', state.theme);
    },
  },
});

// Export actions
export const { toggleTheme } = themeSlice.actions;

// Export reducer as default
export default themeSlice.reducer;
