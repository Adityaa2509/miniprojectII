import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import {store,persistor} from './store/store.js'
import ThemeProvider from './components/ThemeProvider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
   <PersistGate persistor={persistor}>
  <Provider store={store}>
  <React.StrictMode>
  <ThemeProvider>
    <App />
    </ThemeProvider>
  </React.StrictMode>
</Provider>
</PersistGate>
)
