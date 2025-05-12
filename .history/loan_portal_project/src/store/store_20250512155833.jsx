//persist data using redux
//use Redux toolkit for  form state,theme state and smulated user session


import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import portfolioReducer from "../redux/actions/portfolioSlice";
import formReducer from "../redux/slices/formSlice";
import sessionReducer from "../redux/slices/sessionSlice";
import themeReducer from "../redux/slices/themeSlice";

// Persist only specific slices
const formPersistConfig = {
  key: "form",      // This slice will be persisted
  storage,
};

const themePersistConfig = {
  key: "theme",     // This slice will be persisted
  storage,
};

// Combine reducers and apply persist only to needed slices
const rootReducer = combineReducers({
  portfolio: portfolioReducer,
  form: persistReducer(formPersistConfig, formReducer),   // Persisted
  theme: persistReducer(themePersistConfig, themeReducer), // Persisted
  session: sessionReducer, // NOT persisted
});

// Create the Redux store with persistedReducer
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  // Disable serializable state check (for redux-persist)
    }),
});


export const persistor = persistStore(store);

