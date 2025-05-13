// src/store/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employeeDetails: { company: '', status: '', income: 0, taxId: '' }, // Initial state for employeeDetails
  // Other state properties...
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // Action to set employee details
    setEmployeeDetails: (state, action) => {
      state.employeeDetails = action.payload; // Update employeeDetails in the state
    },

    // Optionally, you can still keep updateField and resetForm
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },

    resetForm: () => initialState,
  },
});

// Export the actions including setEmployeeDetails
export const { setEmployeeDetails, updateField, resetForm } = formSlice.actions;

export default formSlice.reducer;
