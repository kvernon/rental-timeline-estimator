import { configure, render, screen } from '@testing-library/react';
import React from 'react';
import { formatName } from '../../../src/components/naming/FormatName';
import { FormatNames } from '../../../src/components/naming/FormatNames';
import { IPropertyDropDownParams, PropertyDropDownValidator } from '../../../src/components/validators/PropertyDropDownValidator2';
import { FormProvider, useForm } from 'react-hook-form';
import { ValidatorTypes } from '../../../src/components/validators/ValidatorTypes';
import { Theme, useTheme } from '@emotion/react';
import { IThemeOptions } from '../../../src/theming/IThemeOptions';
import { ITypography } from '../../../src/theming/ITypography';
import selectEvent from 'react-select-event';
import '@testing-library/jest-dom';

const Setup = (props: IPropertyDropDownParams) => {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      [`${formatName(props.id as string, FormatNames.PropertyDropDownValidatorId)}`]: {
        value: {
          value: 0,
          label: 'apartment',
        },
        validationResult: ValidatorTypes.Valid,
      },
    },
  });

  return (
    <FormProvider {...methods}>
      <PropertyDropDownValidator {...props} />
    </FormProvider>
  );
};

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
    configure({ testIdAttribute: 'name' });
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
    let id: string;

    beforeEach(() => {
      id = `${formatName(params.id as string, FormatNames.PropertyDropDownValidatorId)}.value`;
    });

    test('should exist', () => {
      render(<Setup {...params} />);

      const entity = screen.queryByTestId<HTMLInputElement>(id);

      expect(entity).toMatchSnapshot();
    });

    test('should contain titles', () => {
      render(<Setup {...params} />);

      const entity = screen.getByTestId<HTMLElement>(id);

      selectEvent.openMenu(entity);

      const allByText = screen.getAllByRole<HTMLImageElement>('img');

      expect(
        allByText.map((x) => ({
          src: x.src,
          title: x.title,
          alt: x.alt,
        })),
      ).toEqual(
        ['apartment', 'house'].map((exp) => ({
          src: `http://localhost/images/${exp}.jpg`,
          title: exp,
          alt: exp,
        })),
      );
    });

    test('call change', async () => {
      render(<Setup {...params} />);

      const entity = screen.getByTestId<HTMLInputElement>(id);

      selectEvent.openMenu(entity);

      await selectEvent.select(entity, (_content, element1): boolean => element1 instanceof HTMLImageElement && element1.alt === 'house');

      const result = screen.getByTestId<HTMLInputElement>(id);

      expect(result.value).toEqual('1111112');
    });
  });
});
