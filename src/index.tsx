import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import { options } from './theme';
import { ThemeProvider } from '@emotion/react';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <ThemeProvider theme={options}>
    <App />
  </ThemeProvider>,
);
