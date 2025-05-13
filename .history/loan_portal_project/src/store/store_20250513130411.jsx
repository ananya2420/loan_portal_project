//persist data using redux
//use Redux toolkit for  form state,theme state and smulated user session



import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';

// Your form reducer
//import formReducer from './formSlice';

import formSlice from '../redux/'

const persistConfig = {
  key: 'root',
  storage, // This uses localStorage to persist the data
  whitelist: ['formData'], // Persist only the 'formData' slice
};

const rootReducer = combineReducers({
  formData: formReducer,
  // Add other reducers if needed
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);


