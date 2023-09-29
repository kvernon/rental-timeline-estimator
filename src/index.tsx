import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import { ThemeProvider } from '@emotion/react';
import { options } from './theming/theme';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(
  <ThemeProvider theme={options}>
    <App />
  </ThemeProvider>,
);
