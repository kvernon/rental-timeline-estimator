import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from './app';
import { useTheme } from '@emotion/react';
import { themeMock } from '../__tests__/ThemeMock';
import { IThemeOptions } from './theming/IThemeOptions';

jest.mock('./components/core/Page');
jest.mock('./components/views/UserInformation');

describe('App unit tests', () => {
  describe('and App', () => {
    beforeEach(() => {
      jest.mocked(useTheme).mockReturnValue(themeMock as jest.Mocked<IThemeOptions>);
    });

    describe('and success', () => {
      test('should create', () => {
        render(<App />);

        expect(screen.getByLabelText('User Information')).toBeInTheDocument();
      });
    });
  });
});
