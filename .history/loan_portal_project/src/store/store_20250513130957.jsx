//persist data using redux
//use Redux toolkit for  form state,theme state and smulated user session


// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import formSlice from './formSlice'; // 👈 Make sure path is correct

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['formData'], // 👈 Only persist formData
};

const rootReducer = combineReducers({
  formData: formSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);


