import '@testing-library/jest-dom';
import { matchers } from '@emotion/jest';
import { Theme } from '@emotion/react';

expect.extend(matchers);

jest.mock('@emotion/react', () => {
  const requireActual = jest.requireActual('@emotion/react');
  const useTheme: jest.MockedFn<() => Theme> = jest.fn();
  return {
    ...requireActual,
    useTheme,
  };
});
