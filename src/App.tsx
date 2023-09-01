import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { LightTheme } from './shared/themes';
import { AppRoutes } from './routes';

export function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <BrowserRouter basename='/'>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
