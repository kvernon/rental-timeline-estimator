import { configure, render, screen } from '@testing-library/react';
import React from 'react';
import { IPropertyDropDownParams, PropertyDropDownValidator } from '../../../src/components/validators/PropertyDropDownValidator';
import { Theme, useTheme } from '@emotion/react';
import { IThemeOptions } from '../../../src/theming/IThemeOptions';
import { ITypography } from '../../../src/theming/ITypography';
import selectEvent from 'react-select-event';
import '@testing-library/jest-dom';

jest.mock('@emotion/react', () => {
  const requireActual = jest.requireActual('@emotion/react');
  const useTheme: jest.MockedFn<() => Theme> = jest.fn();
  return {
    ...requireActual,
    useTheme,
  };
});

describe('PropertyDropDownValidator unit test', () => {
  let typographyMock: jest.Mocked<ITypography>;
  let params: IPropertyDropDownParams;

  const validationColorOptionalRight = '#0000FF';
  const validationColorValidMiddle = '#00FF00';
  const validationColorInvalidLeft = '#FF0000';

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    configure({ testIdAttribute: 'id' });
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
      id: 'Tested',
    };
  });

  describe('and defaults', () => {
    test('should exist', () => {
      render(
        <form role="form">
          <label htmlFor="Tested">property</label>
          <PropertyDropDownValidator {...params} />
        </form>,
      );

      const entity = screen.queryByTestId<HTMLInputElement>(params.id as string);

      expect(entity).toMatchSnapshot();
    });

    test('should contain titles', () => {
      render(<PropertyDropDownValidator {...params} />);

      const entity = screen.getByTestId<HTMLElement>(params.id as string);

      selectEvent.openMenu(entity);

      const allByText = screen.getAllByRole<HTMLImageElement>('img');

      expect(
        allByText.map((x) => ({
          src: x.src,
          title: x.title,
          alt: x.alt,
        })),
      ).toEqual(
        ['house', 'apartment', 'house'].map((exp) => ({
          src: `http://localhost/images/${exp}.jpg`,
          title: exp,
          alt: exp,
        })),
      );
    });

    test('call change', async () => {
      render(
        <form role="form">
          <label htmlFor="Tested">property</label>
          <PropertyDropDownValidator {...params} />
        </form>,
      );

      const entity = screen.getByRole<HTMLInputElement>('combobox');

      selectEvent.openMenu(entity);

      await selectEvent.select(entity, (_content, element1): boolean => {
        return element1 instanceof HTMLImageElement && element1.alt === 'house';
      });

      expect(screen.getByRole('form')).toHaveFormValues({ Tested: '1' });
    });
  });
});
