//persist data using redux
//use Redux toolkit for  form state,theme state and smulated user session


// src/redux/store-stor.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';

// ✅ IMPORT your formSlice reducer
import formSlice from './formSlice'; // Adjust path if needed

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['formData'],
};

const rootReducer = combineReducers({
  formData: formSlice, // ✅ Correctly defined now
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);



