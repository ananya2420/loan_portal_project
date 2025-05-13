// src/redux/slices/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for theme
const initialState = {
  theme: 'light', // Default theme is light
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'; // Toggle between light and dark
    },
  },
});

// Export actions
export const { toggleTheme } = themeSlice.actions;

// Export reducer
export default themeSlice.reducer; // This is what you import in the store
