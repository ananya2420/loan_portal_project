import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalInfo: {},
  loanDetails: { amount: '', type: '' },
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
      state.loanDetails = action.payload;
    },
    setDocumentUpdates: (state, action) => {
      state.documentUpdates = action.payload;
    },
    clearFormData: () => initialState,
  },
});

export const {
  setPersonalInfo,
  setLoanDetails,
  setDocumentUpdates,
  clearFormData,
} = formSlice.actions;

export default formSlice.reducer;
