import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice'; // make sure this path is correct

const store = configureStore({
  reducer: {
    formData: formReducer, // "formData" key MUST match your selector
  },
});

export default store;

