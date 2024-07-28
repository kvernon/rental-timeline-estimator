import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ValidatorTypes } from './ValidatorTypes';
import type { Theme } from '@emotion/react';

const useTheme: jest.MockedFn<() => Theme> = jest.fn();
jest.mock('@emotion/react', () => {
  const requireActual = jest.requireActual('@emotion/react');
  return {
    ...requireActual,
    useTheme,
  };
});

import { ValidationBar } from './ValidationBar';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { themeMock } from '../../../__tests__/ThemeMock';

describe('ValidationBar unit tests', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'crypto', {
      value: { randomUUID: jest.fn().mockReturnValue('3') },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.mocked(useTheme).mockReturnValue(themeMock as jest.Mocked<IThemeOptions>);
  });

  describe('and Invalid supplied', () => {
    test('should show red', async () => {
      const expectedValidatorType = ValidatorTypes.Invalid;

      render(<ValidationBar isValid={expectedValidatorType} />);

      const byTitle = screen.getByTitle('Invalid');
      expect(byTitle).toHaveStyle('background-color: Invalid');
    });
  });
});
