import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IRulesCollectionProps, RulesCollection } from './RulesCollection';
import { Theme, useTheme } from '@emotion/react';
import { themeMock } from '../../../__tests__/ThemeMock';
import { IThemeOptions } from '../../theming/IThemeOptions';

jest.mock('../core/CardListLayout');
jest.mock('@emotion/react', () => {
  const requireActual = jest.requireActual('@emotion/react');
  const useTheme: jest.MockedFn<() => Theme> = jest.fn();
  return {
    ...requireActual,
    useTheme,
  };
});

describe('RulesCollection unit tests', () => {
  beforeEach(() => {
    jest.mocked(useTheme).mockReturnValue(themeMock as jest.Mocked<IThemeOptions>);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('should be setup with the basics', () => {
    let props: IRulesCollectionProps;

    beforeEach(() => {
      props = {
        title: 'Rules Collection',
      };

      render(<RulesCollection {...props} />);
    });

    test('should render correctly', () => {
      expect(screen.getByLabelText(props.title)).toBeInTheDocument();
    });
  });
});
