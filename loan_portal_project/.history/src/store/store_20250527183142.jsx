import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import formReducer from './formSlice';
import themeReducer from '../redux/slices/themeSlice';

import createFilter from 'redux-persist-transform-filter';

// Create a filter to persist everything except `file` inside documentUpdates
const saveSubsetFilter = createFilter(
  'formData',
  [
    'personalInfo',
    'loanDetails',
    'documentUpdates', // We want to persist documentUpdates, but will filter file inside below
    'employeeDetails',
  ],
  [] // no blacklist at this level, we'll filter file next
);

// Create a filter specifically for documentUpdates to exclude `file`
const documentUpdatesFilter = createFilter(
  'documentUpdates',
  ['isUpdated', 'fileName'], // whitelist these only, exclude file
  []
);

// Combine both filters in persist config transforms
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['formData', 'theme'],
  transforms: [saveSubsetFilter, documentUpdatesFilter],
};

const rootReducer = combineReducers({
  formData: formReducer,
  theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // still disabled because file object may exist in state but not persisted
    }),
});

const persistor = persistStore(store);

export { store, persistor };
