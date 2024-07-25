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
import { ITypography } from '../../theming/ITypography';

describe('ValidationBar unit tests', () => {
  let typographyMock: jest.Mocked<ITypography>;
  beforeAll(() => {
    Object.defineProperty(window, 'crypto', {
      value: { randomUUID: jest.fn().mockReturnValue('3') },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    typographyMock = {
      parent: {
        allPopulated: jest.fn(),
        font: 'p',
        color: 'p',
        size: 'p',
      },
      get: jest.fn().mockReturnValue({
        font: 'child',
        color: 'child',
        size: 'child',
      }),
    };
    useTheme.mockReturnValue({
      palette: {
        validation: {
          Invalid: {
            validationColor: 'Invalid',
            background: 'Invalid',
            backgroundFocus: 'Invalid',
          },
          Valid: {
            validationColor: 'Valid',
            background: 'Valid',
            backgroundFocus: 'Valid',
          },
          Optional: {
            validationColor: 'Valid',
            background: 'Valid',
            backgroundFocus: 'Valid',
          },
        },
      },
      typography: typographyMock,
    } as unknown as IThemeOptions);
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
