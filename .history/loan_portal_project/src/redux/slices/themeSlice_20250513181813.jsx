// src/redux/slices/themeSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

// Load the initial theme from localStorage if available, else default to 'light'
const initialState = {
  theme: localStorage.getItem('theme') || 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

// ✅ Export both actions
export const { toggleTheme, setTheme } = themeSlice.actions;

// ✅ Export reducer as default
export default themeSlice.reducer;
