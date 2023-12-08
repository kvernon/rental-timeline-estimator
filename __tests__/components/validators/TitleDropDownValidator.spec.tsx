import { Theme, useTheme } from '@emotion/react';
import '@testing-library/jest-dom';

import { configure, render, screen } from '@testing-library/react';
import React from 'react';
import { ITitleDropDownParams } from '../../../src/components/validators/TitleDropDownValidator';
import { ValidatorStackTypes } from '../../../src/components/validators/ValidatorStackTypes';
import { TitleDropDownValidatorName } from '../../../src/components/naming/TitleDropDownValidatorName';
import { TitleDropDownValidator2 } from '../../../src/components/validators/TitleDropDownValidator2';
import { FormProvider, useForm } from 'react-hook-form';
import { IThemeOptions } from '../../../src/theming/IThemeOptions';
import { ITypography } from '../../../src/theming/ITypography';
import selectEvent from 'react-select-event';
import { ValidatorTypes } from '../../../src/components/validators/ValidatorTypes';

const Setup = (props: ITitleDropDownParams) => {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      [`${TitleDropDownValidatorName(props.id as string)}`]: {
        value: {
          value: props.defaultIndex || 0,
          label: props.titles[props.defaultIndex || 0],
        },
        validationResult: props.validationType === ValidatorStackTypes.Optional ? ValidatorTypes.Optional : ValidatorTypes.Invalid,
      },
    },
  });

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
describe('TitleDropDownValidator unit tests', () => {
  let typographyMock: jest.Mocked<ITypography>;

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
  });

  describe('and defaults', () => {
    test('should exist', () => {
      const p: ITitleDropDownParams = {
        id: 'Tested',
        titles: [],
        validationType: ValidatorStackTypes.Required,
      };

      render(<Setup {...p} />);

      const entity = screen.queryByTestId<HTMLInputElement>(`${TitleDropDownValidatorName(p.id as string)}.value`);

      expect(entity).toMatchSnapshot();
    });
  });

  describe('and populated', () => {
    const p: ITitleDropDownParams = {
      id: 'TestedFilled',
      titles: ['one', 'two', 'three', 'four'],
      validationType: ValidatorStackTypes.Required,
    };

    beforeEach(() => {
      render(<Setup {...p} />);
    });

    const translatedId = `${TitleDropDownValidatorName(p.id as string)}.value`;

    test('should contain titles', () => {
      const entity = screen.getByTestId<HTMLElement>(translatedId);

      selectEvent.openMenu(entity);

      const allByText = screen.getAllByText(/(one|two|three|four)/);
      expect(allByText.map((x) => x.innerHTML)).toEqual(p.titles);
    });

    test('call change', async () => {
      const entity = screen.getByTestId<HTMLInputElement>(translatedId);

      const expectedValue = 2;

      const selectedOption = p.titles[expectedValue];
      await selectEvent.select(entity, selectedOption);

      expect(screen.getByText(selectedOption)).toBeInTheDocument();
      expect(screen.getByTestId<HTMLInputElement>(translatedId).value).toEqual(expectedValue.toString());
    });
  });
});
