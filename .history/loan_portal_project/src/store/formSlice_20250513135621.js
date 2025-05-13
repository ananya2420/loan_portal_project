// src/store/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for form data
const initialState = {
  documentUpdates: { isUpdated: false }, // Default state for document updates
};

const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    // Action to update the document updates state
    setDocumentUpdates: (state, action) => {
      state.documentUpdates = action.payload; // Update documentUpdates with payload
    },
  },
});

// Exporting the action for use in components
export const { setDocumentUpdates } = formSlice.actions;

// Exporting the reducer to be used in the store
export default formSlice.reducer;
