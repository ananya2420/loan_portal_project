// store/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalInfo: {},
  loanDetails: { amount: '', type: '', term: '', emiDate: '' },
  documentUpdates: {
    isUpdated: false,
    fileName: '',
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
        ...action.payload,
      };
    },
    setEmployeeDetails: (state, action) => {
      state.EmployeeDetails = action.payload;
    },
    clearLoanDetails: (state) => {
      state.loanDetails = { amount: '', type: '', term: '', emiDate: '' };
    },
    clearFormData: () => initialState,
  },
});

export const {
  setPersonalInfo,
  setLoanDetails,
  setDocumentUpdates,
  setEmployeeDetails,
  clearLoanDetails,
  clearFormData,
} = formSlice.actions;

export default formSlice.reducer;
