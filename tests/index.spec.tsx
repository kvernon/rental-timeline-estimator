jest.mock('@mui/material', () => ({
  ThemeProvider: jest.fn(),
  createTheme: jest.fn().mockReturnValue({}),
}));
jest.mock('react-dom/client');
jest.mock('../src/app', () => ({
  App: () => {
    return <div>App</div>;
  },
}));

import { ThemeProvider } from '@mui/material';
import React from 'react';
import { App } from '../src/app';

describe('test ReactDOM.render', () => {
  let mockedRoot: any;

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetAllMocks();
  });

  beforeEach(() => {
    mockedRoot = {
      render: jest.fn(),
    };

    jest.doMock('react-dom/client', () => ({
      createRoot: jest.fn().mockReturnValue(mockedRoot),
    }));
  });

  it('should call ReactDOM.render', () => {
    require('../src/index');
    expect(mockedRoot.render).toBeCalledWith(
      <ThemeProvider theme={{}}>
        <App />
      </ThemeProvider>,
    );
  });
});
