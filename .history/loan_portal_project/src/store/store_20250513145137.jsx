import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import formReducer from './formSlice'; // Import the formReducer from formSlice

// Redux Persist configuration
const persistConfig = {
  key: 'formData', // Key used in localStorage
  storage, // Use localStorage for persistence
};

// Persist the formReducer
const persistedReducer = persistReducer(persistConfig, formReducer);

// Create the Redux store
const store = configureStore({
  reducer: {
    formData: persistedReducer, // Use the persisted reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for Redux Persist
    }),
});

// Create persistor to persist data
const persistor = persistStore(store);

// Export store and persistor for use in the app
export { store, persistor };
