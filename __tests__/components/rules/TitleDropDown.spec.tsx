import { IThemeOptions } from '../../../src/theme';

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
import { fireEvent, render, screen, configure } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TitleDropDown } from '../../../src/components/rules/TitleDropDown';

describe('TitleDropDown unit tests', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'crypto', {
      value: { randomUUID: jest.fn().mockReturnValue('3') },
    });
  });

  beforeEach(() => {
    configure({ testIdAttribute: 'id' });
  });

  describe('and titles supplied', () => {
    test('should have title', async () => {
      const title = 'Hi';

      render(<TitleDropDown titles={[title]} />);

      expect(screen.getByText(title, {})).toBeInTheDocument();
    });
  });

  describe('and no titles supplied', () => {
    test('should have title', async () => {
      render(<TitleDropDown titles={[]} />);

      expect(screen.queryByTestId(/title-drop-down-3/i)).toBeInTheDocument();
    });
  });
});
