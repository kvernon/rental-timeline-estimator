import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { options } from './theming/theme';
import { RouterProvider } from 'react-router/dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Router } from './router/router';

export const App = function () {
  return (
    <ThemeProvider theme={options}>
      <Provider store={store}>
        <RouterProvider router={Router} />
      </Provider>
    </ThemeProvider>
  );
};
