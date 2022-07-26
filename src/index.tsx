import { ThemeProvider, createTheme } from '@mui/material';
import { pink } from '@mui/material/colors';
import React from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00695c',
    },
    secondary: pink,
  },
});

import ReactDOM from 'react-dom';
import { App } from './app';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);
