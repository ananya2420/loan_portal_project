// src/redux/store.js
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
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export { store, persistor };
