//persist data using redux
//use Redux toolkit for  form state,theme state and smulated user session

// src/store/store.jsx
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import formReducer from './formSlice'; // Adjust the path if needed

// Set up the Redux Persist configuration
const persistConfig = {
  key: 'formData', // Name of the key in localStorage
  storage, // Use localStorage for persistence
};

// Persist the formReducer
const persistedReducer = persistReducer(persistConfig, formReducer);

// Create the Redux store
const store = configureStore({
  reducer: {
    formData: persistedReducer, // Attach the persisted reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializableCheck for Redux Persist
    }),
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor }; // Export both store and persistor for use in the app



