
//form rogress indicator 



// src/index.js or src/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
//import { store, persistor } from './store/store'; // Import the store and persistor
import { store,persistor } from '../store/store';
//import App from './App'; // Import your main App component
import App from '../App';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

