import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalInfo: {},
  loanDetails: { amount: '', type: '', repaymentTerm: '', emiDate: '' },
  documentUpdates: {
    isUpdated: false,
    fileName: '',
  },
  employeeDetails: {},
  confirmation: false,
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
      state.employeeDetails = action.payload;
    },
    setConfirmation: (state, action) => {
      state.confirmation = action.payload;
    },
    clearFormData: () => initialState,
  },
});

export const {
  setPersonalInfo,
  setLoanDetails,
  setDocumentUpdates,
  setEmployeeDetails,
  setConfirmation,
  clearFormData,
} = formSlice.actions;

export default formSlice.reducer;