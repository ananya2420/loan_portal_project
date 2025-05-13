import { createSlice } from '@reduxjs/toolkit';

// Initial state for form data
const initialState = {
  documentUpdates: { isUpdated: false },
};

const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setDocumentUpdates: (state, action) => {
      state.documentUpdates = action.payload;
    },
  },
});

// ✅ Export action correctly
export const { setDocumentUpdates } = formSlice.actions;

// ✅ Export reducer for use in store
export default formSlice.reducer;

