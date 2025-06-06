import { createSlice } from '@reduxjs/toolkit';

// Initial state for form data
const initialState = {
  personalInfo: {},
  loanDetails: {},
  documentUpdates: { isUpdated: false },
};

const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setPersonalInfo: (state, action) => {
      state.personalInfo = action.payload;
    },
    setLoanDetails: (state, action) => {
      state.loanDetails = action.payload; // Store loan details in the state
    },
    setDocumentUpdates: (state, action) => {
      state.documentUpdates = action.payload;
    },
  },
});

export const { setPersonalInfo, setLoanDetails, setDocumentUpdates } = formSlice.actions;
export default formSlice.reducer;
