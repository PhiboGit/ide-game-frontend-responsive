import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import App from './App';

import { 
  Route, 
  RouterProvider, 
  createBrowserRouter,
  createRoutesFromElements,
 } from 'react-router-dom';

import HomePage from './homepage/HomePage';
import GameRoot from './gamepage/GamepageRoot';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="game" element={<GameRoot />} />
      <Route path="*" element={<HomePage />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
