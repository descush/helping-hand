import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { FoodContextProvider } from './Context/FoodContextProvider';
import AuthContextProvider from './Context/AuthContextProvider';
import { DarkThemeContextProvider } from './Context/DarkThemeContextProvider';
import { ToastProvider } from './Context/ToastContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <DarkThemeContextProvider>
          <ToastProvider>
            <FoodContextProvider>
              <App />
            </FoodContextProvider>
          </ToastProvider>
        </DarkThemeContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode >
);

reportWebVitals();
