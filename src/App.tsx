import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@emotion/react';
import { LightTheme } from './shared/themes';
import { AppRoutes } from './routes';
import 'react-toastify/dist/ReactToastify.css';
import "./reset.css"
import { TokenProvider } from './shared/hooks/useAuth';

export function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <TokenProvider>
        <BrowserRouter basename='/'>
          <ToastContainer />
          <AppRoutes />
        </BrowserRouter>
      </TokenProvider>
    </ThemeProvider>
  );
}
