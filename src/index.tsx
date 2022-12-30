import { ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import { options } from './theme';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <ThemeProvider theme={createTheme(options)}>
    <App />
  </ThemeProvider>,
);
