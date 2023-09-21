import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@emotion/react';
import { LightTheme } from './shared/themes';
import { AppRoutes } from './routes';
import 'react-toastify/dist/ReactToastify.css';
import "./reset.css"

export function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <BrowserRouter basename='/'>
        <ToastContainer />
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
