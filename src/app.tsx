import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { options } from './theming/theme';
import { Page } from './components/core/Page';

export const App = function () {
  return (
    <ThemeProvider theme={options}>
      <Page />
      <div>hi</div>
    </ThemeProvider>
  );
};
