//persist data using redux
//use Redux toolkit for  form state,theme state and smulated user session


// src/store/store.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
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
  middleware: getDefaultMiddleware({
    serializableCheck: false, // Disable serializable check for Redux Persist
  }),
});

export const persistor = persistStore(store);
export default store;


