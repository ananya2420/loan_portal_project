// src/main.jsx
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { FromProvider } from './context/FormContext.jsx'; // Assuming you have a FormContext
import { store, persistor } from './store/store.jsx'; // Correct import for store and persistor

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <FromProvider>
        <App />
      </FromProvider>
    </PersistGate>
  </Provider>
);
