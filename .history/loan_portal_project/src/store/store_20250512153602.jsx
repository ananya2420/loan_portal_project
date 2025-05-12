//persist data using redux



import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import portfolioReducer from "./redux/actions/portfolioSlice"; // ✅ uncomment and correct
import formReducer from "./redux/slices/formSlice";           // ✅ uncomment and correct
import themeReducer from "./redux/slices/themeSlice";         // ✅ already correct
import sessionReducer from "./redux/slices/sessionSlice";     // ✅ already correct

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  portfolio: portfolioReducer,
  form: formReducer,
  theme: themeReducer,
  session: sessionReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
