jest.mock('@mui/material', () => ({
  ThemeProvider: () => ({}),
  createTheme: () => ({}),
}));
jest.mock('react-dom');
jest.mock('../src/app', () => ({
  App: () => {
    return <div>App</div>;
  },
}));

import { ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../src/app';

describe('test ReactDOM.render', () => {
  let expectedHtml: HTMLElement | null;

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetAllMocks();
  });

  beforeEach(() => {
    expectedHtml = null;
    global.document.getElementById = jest.fn().mockReturnValue(expectedHtml);
  });

  it('should call ReactDOM.render', () => {
    require('../src/index');
    expect(ReactDOM.render).toBeCalledWith(
      <ThemeProvider theme={{}}>
        <App />
      </ThemeProvider>,
      expectedHtml,
    );
  });
});
