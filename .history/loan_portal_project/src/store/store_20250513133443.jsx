//persist data using redux
//use Redux toolkit for  form state,theme state and smulated user session

// src/store/store.jsx
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import formReducer from './formSlice';

const persistConfig = {
  key: 'formData',
  storage,
};

const persistedReducer = persistReducer(persistConfig, formReducer);

const store = configureStore({
  reducer: {
    formData: persistedReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for Redux Persist
    }),
});

export const persistor = persistStore(store);
export default store; // Ensure this line exports the store properly
