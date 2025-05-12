//persist data using redux


import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  portfolio: [], 
};


const portfolioReducer = createSlice({
  name: 'portfolio', 
  initialState, 
  reducers: {
    
    setPortfolio: (state, action) => {
      state.portfolio = action.payload;
    },
    addToPortfolio: (state, action) => {
      state.portfolio.push(action.payload);
    },
    removeFromPortfolio: (state, action) => {
      state.portfolio = state.portfolio.filter(item => item.id !== action.payload.id);
    },
    clearPortfolio: (state) => {
      state.portfolio = [];
    },
  },
});


export const { setPortfolio, addToPortfolio, removeFromPortfolio, clearPortfolio } = portfolioReducer.actions;


export default portfolioReducer.reducer;