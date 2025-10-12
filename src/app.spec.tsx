import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// Polyfill TextEncoder/TextDecoder for react-router in Jest/JSDOM
import { TextEncoder, TextDecoder } from 'util';
// @ts-ignore
(global as any).TextEncoder = TextEncoder;
// @ts-ignore
(global as any).TextDecoder = TextDecoder;
import { App } from './app';
import { useTheme } from '@emotion/react';
import { themeMock } from '../__tests__/ThemeMock';
import { IThemeOptions } from './theming/IThemeOptions';

jest.mock('./components/core/Page', () => ({
  Page: () => <div />,
}));

jest.mock('./views/UserInformation', () => ({
  UserInformation: () => <div aria-label="User Information" />,
}));

jest.mock('./components/navigation/NavListSub', () => ({
  NavListGeneric: (props: { title: string }) => <nav aria-label={props.title} />,
}));

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

      expect(screen.getByLabelText('Navigation')).toBeInTheDocument();
    });
  });
});
