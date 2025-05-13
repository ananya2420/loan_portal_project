// src/store/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employeeDetails: {}, // Ensure this is defined as an empty object
};

const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setEmployeeDetails: (state, action) => {
      state.employeeDetails = action.payload;
    },
  },
});

export const { setEmployeeDetails } = formSlice.actions;

export default formSlice.reducer;

