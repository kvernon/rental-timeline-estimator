import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ValidatorTypes } from './ValidatorTypes';

import { ValidationBar } from './ValidationBar';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { themeMock } from '../../../__tests__/ThemeMock';
import { useTheme } from '@emotion/react';

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
      expect(byTitle).toHaveStyle('background-color: rgba(0, 0, 0, 0)');
    });
  });
});
