import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { FromProvider } from './context/FormContext.jsx';
import { persistor, store } from './store/store.jsx';

import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';

import App from './App.jsx'; // Root layout component
import Review from './components/review.jsx';
//import Thankyou from './pages/Thankyou.jsx';
import Thankyou from './components/thank-you.jsx';
//import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx'; // Optional

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App is the root layout with <Outlet />
    children: [
      {
        index: true,
        element: <Home />, // Home page component
      },
      {
        path: 'review',
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
        path: 'thank-you',
        element: <Thankyou />, // Thank you page after form submission
      },
      {
        path: '*',
        element: <NotFound />, // Optional 404 page
      },
    ],
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
