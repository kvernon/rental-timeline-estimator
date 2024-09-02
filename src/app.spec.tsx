import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from './app';
import { useTheme } from '@emotion/react';
import { themeMock } from '../__tests__/ThemeMock';
import { IThemeOptions } from './theming/IThemeOptions';

jest.mock('./components/core/Page');
jest.mock('./views/UserInformation');
jest.mock('./components/navigation/NavList');

describe('App unit tests', () => {
  beforeEach(() => {
    jest.mocked(useTheme).mockReturnValue(themeMock as jest.Mocked<IThemeOptions>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('and defaults', () => {
    test('should contain User Information', () => {
      render(<App />);

      expect(screen.getByLabelText('User Information')).toBeInTheDocument();
    });

    test('should contain Nav', () => {
      render(<App />);

      expect(screen.getByLabelText('navigation')).toBeInTheDocument();
    });
  });
});
