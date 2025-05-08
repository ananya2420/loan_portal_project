
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//import { persistor, store } from './store/store.jsx'


import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './store/store.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={stor}>
    <PersistGate loading={null}  persistor={persistor}>
    <App />
    </PersistGate>
   
  </Provider>
)
