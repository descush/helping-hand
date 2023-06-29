import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { FoodContextProvider } from './Context/FoodContextProvider';
import AuthContextProvider from './Context/AuthContextProvider';
import { DarkThemeContextProvider } from './Context/DarkThemeContextProvider';

// const Provider = compose([
//   FoodContextProvider,
//   AuthContextProvider,
//   DarkThemeContextProvider
// ]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <FoodContextProvider>
          <DarkThemeContextProvider>
            <App />
          </DarkThemeContextProvider>
        </FoodContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode >
);

reportWebVitals();
