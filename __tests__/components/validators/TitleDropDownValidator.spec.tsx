import { Theme, useTheme } from '@emotion/react';

import { configure, render, screen } from '@testing-library/react';
import React from 'react';
import { ITitleDropDownParams } from '../../../src/components/validators/TitleDropDownValidator';
import { ValidatorStackTypes } from '../../../src/components/validators/ValidatorStackTypes';
import { TitleDropDownValidatorName } from '../../../src/components/naming/TitleDropDownValidatorName';
import { TitleDropDownValidator2 } from '../../../src/components/validators/TitleDropDownValidator2';
import { FormProvider, useForm } from 'react-hook-form';
import { IThemeOptions } from '../../../src/theming/IThemeOptions';
import { ITypography } from '../../../src/theming/ITypography';

const Setup = (props: ITitleDropDownParams) => {
  const methods = useForm({ mode: 'onBlur' });
  return (
    <FormProvider {...methods}>
      <TitleDropDownValidator2 {...props} />
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
describe.only('TitleDropDownValidator unit tests', () => {
  let typographyMock: jest.Mocked<ITypography>;

  const validationColorOptionalRight = '#0000FF';
  const validationColorValidMiddle = '#00FF00';
  const validationColorInvalidLeft = '#FF0000';

  afterEach(() => {
    jest.clearAllMocks();
  });

  const p: ITitleDropDownParams = {
    id: 'Tested',
    titles: [],
    validationType: ValidatorStackTypes.Required,
  };

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

    render(<Setup {...p} />);
  });

  test('should contain styles', () => {
    const entity = screen.getByTestId<HTMLInputElement>(`${TitleDropDownValidatorName(p.id as string)}.value`);

    expect(entity).toMatchSnapshot();
  });
});
