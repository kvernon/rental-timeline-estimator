import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { options } from './theming/theme';

export const App = function () {
  return (
    <ThemeProvider theme={options}>
      <div>hi</div>
    </ThemeProvider>
  );
};
