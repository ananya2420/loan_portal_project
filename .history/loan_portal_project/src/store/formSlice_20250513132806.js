// src/store/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state of formData, including documentUpdates
const initialState = {
  documentUpdates: { isUpdated: false }, // Initialize with a default value
  // Other states here...
};

const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setDocumentUpdates: (state, action) => {
      state.documentUpdates = action.payload; // Update documentUpdates in the state
    },
    // Other reducers here...
  },
});

// Export the action so it can be dispatched in components
export const { setDocumentUpdates } = formSlice.actions;

export default formSlice.reducer;


