//persist data using redux



import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import portfolioReducer from "../redux/actions/portfolioSlice"
import formReducer from "../redux/slices/formSlice"         
import sessionReducer from "../redux/slices/sessionSlice"
import themeReducer from "../"   

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
