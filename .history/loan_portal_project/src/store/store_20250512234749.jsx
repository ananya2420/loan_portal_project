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


const rootReducer = combineReducers({
  portfolio: portfolioReducer,
  form: persistReducer(formPersistConfig, formReducer),   
  theme: persistReducer(themePersistConfig, themeReducer), 
  session: sessionReducer, 
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  
    }),
});


export const persistor = persistStore(store);

