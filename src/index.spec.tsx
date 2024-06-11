import type { Root } from 'react-dom/client';

jest.mock('@emotion/react', () => ({
  ThemeProvider: jest.fn(),
}));
jest.mock('react-dom/client');
jest.mock('./app', () => ({
  App: () => {
    return <div>App</div>;
  },
}));

jest.mock('./theming/theme', () => ({
  options: {},
}));

import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { App } from './app';

describe('test ReactDOM.render', () => {
  let mockedRoot: Root;

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetAllMocks();
  });

  beforeEach(() => {
    mockedRoot = {
      unmount: jest.fn(),
      render: jest.fn(),
    };

    jest.doMock('react-dom/client', () => ({
      createRoot: jest.fn().mockReturnValue(mockedRoot),
    }));
  });

  it('should call ReactDOM.render', () => {
    require('./index');
    expect(mockedRoot.render).toHaveBeenCalledWith(
      <ThemeProvider theme={{}}>
        <App />
      </ThemeProvider>,
    );
  });
});
