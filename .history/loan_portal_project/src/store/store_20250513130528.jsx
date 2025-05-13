//persist data using redux
//use Redux toolkit for  form state,theme state and smulated user session



// src/redux/store-stor.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';

// Import formSlice reducer
//import formSlice from './formSlice'; // Correct import for formSlice
import formSlice

const persistConfig = {
  key: 'root',
  storage, // This uses localStorage to persist the data
  whitelist: ['formData'], // Persist only the 'formData' slice
};

// Combine reducers
const rootReducer = combineReducers({
  formData: formSlice,  // Use formSlice as the reducer for formData
  // Add other reducers if needed
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);


