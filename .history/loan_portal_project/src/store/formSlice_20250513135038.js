import { createSlice } from '@reduxjs/toolkit';

// Initial state of formData
const initialState = {
  documentUpdates: { isUpdated: false },
  employeeDetails: {}, // Initialize with an empty object
};

const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setDocumentUpdates: (state, action) => {
      state.documentUpdates = action.payload; // Update documentUpdates in the state
    },
    setEmployeeDetails: (state, action) => {
      state.employeeDetails = action.payload; // Update employeeDetails in the state
    },
    // Add other reducers as needed
  },
});

// Export actions
export const { setDocumentUpdates, setEmployeeDetails } = formSlice.actions;

export default formSlice.reducer;
