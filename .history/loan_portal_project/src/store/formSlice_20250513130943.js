// src/store/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalInfo: {},
  employeeDetails: {},
  loanDetails: {},
  documentUpdates: {},
  updatedPicture: {},
};

const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setPersonalInfo: (state, action) => {
      state.personalInfo = action.payload;
    },
    setEmployeeDetails: (state, action) => {
      state.employeeDetails = action.payload;
    },
    setLoanDetails: (state, action) => {
      state.loanDetails = action.payload;
    },
    setDocumentUpdates: (state, action) => {
      state.documentUpdates = action.payload;
    },
    setUpdatedPicture: (state, action) => {
      state.updatedPicture = action.payload;
    },
  },
});

export const {
  setPersonalInfo,
  setEmployeeDetails,
  setLoanDetails,
  setDocumentUpdates,
  setUpdatedPicture,
} = formSlice.actions;

export default formSlice.reducer;
