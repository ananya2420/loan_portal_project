import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalInfo: {},
  loanDetails: { amount: '', type: '', term: '', emiDate: '' },
  documentUpdates: {
    isUpdated: false,
    fileName: '',      // Add file name for tracking
    // fileData: '',    // Optional: base64 if you want to preview/store image
  },
  EmployeeDetails: {},
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
      state.documentUpdates = {
        ...state.documentUpdates,
        ...action.payload, // Merge new fields
      };
    },
    setEmployeeDetails: (state, action) => {
      state.EmployeeDetails = action.payload;
    },
    clearFormData: () => initialState,
  },
});

export const {
  setPersonalInfo,
  setLoanDetails,
  setDocumentUpdates,
  setEmployeeDetails,
  clearFormData,
} = formSlice.actions;

export default formSlice.reducer;