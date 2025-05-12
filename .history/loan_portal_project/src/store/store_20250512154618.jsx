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
  key: "form",
  storage,
};

const themePersistConfig = {
  key: "theme",
  storage,
};

// Combine reducers and apply persist only to needed slices
const rootReducer = combineReducers({
  portfolio: portfolioReducer,
  form: persistReducer(formPersistConfig, formReducer),   // persisted
  theme: persistReducer(themePersistConfig, themeReducer), // persisted
  session: sessionReducer, // NOT persisted
});

// No persistConfig at root level now — we persist selectively above
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

