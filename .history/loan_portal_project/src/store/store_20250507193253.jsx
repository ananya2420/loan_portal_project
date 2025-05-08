//persist data using redux
import { configureStore, combineReducers } from "@reduxjs/toolkit";
//import portfolioReducer from './redux/portfolioSlice'; 

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//import portfolioReducer from "../redux/portfolioSlice";

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  portfolio: portfolioReducer,
});

// Wrap root reducer with persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
});

// Create persistor
export const persistor = persistStore(store);