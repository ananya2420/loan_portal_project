//persist data using redux
//use Redux toolkit for  form state,theme state and smulated user session


import { configureStore } from '@reduxjs/toolkit'; // Importing directly from toolkit
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
export default store;
