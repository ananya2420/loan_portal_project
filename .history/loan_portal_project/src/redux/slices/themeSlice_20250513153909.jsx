import { createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  theme: 'light', // default theme is light
};

// Create the theme slice
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

// Export the action
export const { toggleTheme } = themeSlice.actions;

// Export the reducer
export default themeSlice.reducer;
