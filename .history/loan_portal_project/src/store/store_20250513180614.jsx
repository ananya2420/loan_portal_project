// src/redux-store.jsx
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Local storage
import formReducer from './formSlice';
//import themeReducer from './redux-slice-themeSlice';  // Correct import for theme slice
import themeReducer from '../'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['formData'], // Persist only the form data, not the entire state
};

const persistedFormReducer = persistReducer(persistConfig, formReducer);

const store = configureStore({
  reducer: {
    formData: persistedFormReducer,
    theme: themeReducer, // Add theme reducer to the store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // Disable serializable check for non-serializable data
});

const persistor = persistStore(store);

export { store, persistor };
