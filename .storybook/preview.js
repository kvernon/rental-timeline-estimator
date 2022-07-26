import React from 'react';
import {createTheme, ThemeProvider} from '@mui/material';

import {options} from './../src/theme';

const theme = createTheme(options);
const defaultBackground = 'rentalGen3';

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  backgrounds: {
    default: defaultBackground,
    values: [
      {
        name: defaultBackground,
        value: options.palette.primary.dark,
      }
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story/>
    </ThemeProvider>
  ),
];
