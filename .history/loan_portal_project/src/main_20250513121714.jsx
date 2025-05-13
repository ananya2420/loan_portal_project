
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { FromProvider } from './context/FormContext.jsx';
import { persistor, store } from './store/store.jsx';

import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom';

import Review from './pages/Review.jsx';
import Thankyou from './pages/Thankyou.jsx';
import Home from './pages/Home.jsx'; // optional
import NotFound from './pages/NotFound.jsx'; // optional

const router = createBrowserRouter([
  {
    path: '/',
    element: <Review />,
    action: async ({ request }) => {
      const formData = await request.formData();
      const confirm = formData.get('confirm');
      if (confirm === 'on') {
        return redirect('/thank-you');
      }
      return null;
    },
  },
  {
    path: '/thank-you',
    element: <Thankyou />,
  },
  {
    path: '*',
    element: <NotFound />, // Optional fallback
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FromProvider>
          <RouterProvider router={router} />
        </FromProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
