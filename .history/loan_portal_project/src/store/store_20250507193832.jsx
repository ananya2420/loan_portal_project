//persist data using redux
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//import portfolioReducer from "../redux/actions/portfolioSlice";
import 

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  portfolio: portfolioReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Turn off serializable check
    }),
});

export const persistor = persistStore(store);
