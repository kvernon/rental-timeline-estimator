import { IThemeOptions } from '../src/theme';

jest.mock('@emotion/react', () => {
  const all = jest.requireActual('@emotion/react');
  return {
    ...all,
    useTheme: jest.fn().mockReturnValue({
      palette: {
        validation: {
          Invalid: {
            validationColor: '0',
            background: '0',
          },
          Valid: {
            validationColor: '1',
            background: '1',
          },
        },
      },
    } as unknown as IThemeOptions),
  };
});

import React from 'react';
import { App } from '../src/app';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('App unit tests', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'crypto', {
      value: { randomUUID: jest.fn().mockReturnValue('3') },
    });
  });

  describe('and App', () => {
    describe('and success', () => {
      test('should create', async () => {
        render(<App />);

        expect(screen.getByText('Hi', {})).toBeInTheDocument();
      });
    });
  });
});
