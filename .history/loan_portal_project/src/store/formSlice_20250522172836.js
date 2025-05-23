import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalInfo: {
    name: '',
    dob: '',
    phone: '',
    email: '',
  },
  employeeDetails: {
    company: '',
    status: '',
    income: '',
    experience: '',
    taxId: '',
  },
  loanDetails: {
    amount: '',
    type: '',
    repaymentTerm: '',
    emiDate: '',
  },
  documentUpdates: {
    isUpdated: '',
  },
};

const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setPersonalInfo(state, action) {
      state.personalInfo = action.payload;
    },
    setEmployeeDetails(state, action) {
      state.employeeDetails = action.payload;
    },
    setLoanDetails(state, action) {
      state.loanDetails = action.payload;
    },
    setDocumentUpdates(state, action) {
      state.documentUpdates = action.payload;
    },
    resetForm(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setPersonalInfo,
  setEmployeeDetails,
  setLoanDetails,
  setDocumentUpdates,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;

