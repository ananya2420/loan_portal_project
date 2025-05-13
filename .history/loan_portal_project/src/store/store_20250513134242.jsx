//persist data using redux
//use Redux toolkit for  form state,theme state and smulated user session

// src/main.jsx
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './App.jsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { FromProvider } from './context/FormContext.jsx';
import store, { persistor } from './store/store.jsx'; // Correct import

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <FromProvider>
        <App />
      </FromProvider>
    </PersistGate>
  </Provider>
);

