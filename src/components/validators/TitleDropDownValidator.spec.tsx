import { Theme, useTheme } from '@emotion/react';
import { ITypography } from '../../theming/ITypography';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { render, screen } from '@testing-library/react';
import { ITitleDropDownParams, TitleDropDownValidator } from './TitleDropDownValidator';
import React from 'react';
import '@testing-library/jest-dom';
import selectEvent from 'react-select-event';
import { ValidatorTypes } from './ValidatorTypes';

jest.mock('@emotion/react', () => {
  const requireActual = jest.requireActual('@emotion/react');
  const useTheme: jest.MockedFn<() => Theme> = jest.fn();
  return {
    ...requireActual,
    useTheme,
  };
});

describe('TitleDropDownValidator unit test', () => {
  let typographyMock: jest.Mocked<ITypography>;
  let params: ITitleDropDownParams;

  const validationColorOptionalRight = '#0000FF';
  const validationColorValidMiddle = '#00FF00';
  const validationColorInvalidLeft = '#FF0000';

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    const useThemeMock = jest.mocked(useTheme);
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

    useThemeMock.mockReturnValue({
      palette: {
        pageBackground: 'pageBackground',
        panelBackground: 'panelBackground',
        panelShadow: 'panelShadow',

        inputBackgroundBadFocus: 'inputBackgroundBadFocus',
        inputBackgroundBad: 'inputBackgroundBad',
        inputBackground: 'inputBackground',
        inputBackgroundFocus: 'inputBackgroundFocus',

        validation: {
          Invalid: {
            validationColor: validationColorInvalidLeft,
            background: validationColorInvalidLeft,
            backgroundFocus: validationColorInvalidLeft,
          },
          Valid: {
            validationColor: validationColorValidMiddle,
            background: validationColorValidMiddle,
            backgroundFocus: validationColorValidMiddle,
          },
          Optional: {
            validationColor: validationColorOptionalRight,
            background: validationColorOptionalRight,
            backgroundFocus: validationColorOptionalRight,
          },
        },
      },
      typography: typographyMock,
    } as jest.Mocked<IThemeOptions>);

    params = {
      title: 'Title Drop',
      optionTitles: [],
      onChange: jest.fn(),
    };
  });

  describe('and defaults', () => {
    test('should render', () => {
      render(<TitleDropDownValidator {...params} />);

      const actual = screen.getByLabelText<HTMLInputElement>(params.title);

      expect(actual).toBeInTheDocument();
    });

    describe('and options', () => {
      describe('and empty', () => {
        test('should have no options', () => {
          render(<TitleDropDownValidator {...params} />);

          const element = screen.getByLabelText<HTMLInputElement>(params.title);

          selectEvent.openMenu(element);

          const emptyNode = screen.getByText<HTMLDivElement>('No options');

          expect(emptyNode).toBeInTheDocument();
        });
      });

      describe('and populated', () => {
        test('should have no options', () => {
          params.optionTitles = ['one'];

          render(<TitleDropDownValidator {...params} />);

          const element = screen.getByLabelText<HTMLInputElement>(params.title);

          selectEvent.openMenu(element);

          const options = screen.getAllByRole<HTMLDivElement>('option');

          options.forEach((e, i) => {
            expect(e).toHaveTextContent(params.optionTitles[i]);
          });
        });
      });
    });
  });

  describe('and value prop is updated', () => {
    test('should receive updated entry', () => {
      params.optionTitles = ['one', 'two', 'three'];
      params.value = {
        value: {
          value: 1,
          label: params.optionTitles[1],
        },
        validationResult: ValidatorTypes.Valid,
      };

      render(<TitleDropDownValidator title={params.title} value={params.value} optionTitles={params.optionTitles} onChange={params.onChange} />);

      const element = screen.getByLabelText<HTMLInputElement>(params.title);

      expect(element.value).toEqual('');
    });
  });
});
