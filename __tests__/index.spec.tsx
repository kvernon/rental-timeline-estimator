import type { Root } from 'react-dom/client';

jest.mock('@emotion/react', () => ({
  ThemeProvider: jest.fn(),
}));
jest.mock('react-dom/client');
jest.mock('../src/app', () => ({
  App: () => {
    return <div>App</div>;
  },
}));

jest.mock('../src/theming/theme', () => ({
  options: {},
}));

import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { App } from '../src/app';

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
    require('../src/index');
    expect(mockedRoot.render).toHaveBeenCalledWith(
      <ThemeProvider theme={{}}>
        <App />
      </ThemeProvider>,
    );
  });
});
