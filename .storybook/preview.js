import React from 'react';

import {options} from './../src/theme';
import {ThemeProvider} from '@emotion/react';

const defaultBackground = 'rentalGen3';

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  backgrounds: {
    default: defaultBackground,
    values: [
      {
        name: defaultBackground,
        value: options.palette.pageBackground,
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
    <ThemeProvider theme={options}>
      <Story/>
    </ThemeProvider>
  ),
];
