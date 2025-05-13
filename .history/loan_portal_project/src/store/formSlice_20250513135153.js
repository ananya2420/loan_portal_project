// in your redux slice (formSlice.js)
const initialState = {
  employeeDetails: {}, // Ensure this is properly initialized
};

const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setEmployeeDetails: (state, action) => {
      state.employeeDetails = action.payload;
    },
  },
});

export const { setEmployeeDetails } = formSlice.actions;
export default formSlice.reducer;
