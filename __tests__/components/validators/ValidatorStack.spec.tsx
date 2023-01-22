import { ValidatorStackTypes } from '../../../src/components/validators/ValidatorStackTypes';
import React from 'react';
import { configure, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ValidatorTypes } from '../../../src/components/validators/ValidatorTypes';

const ValidateResults: jest.MockedFn<(validatorStackType: ValidatorStackTypes, children?: ValidatorTypes[]) => ValidatorTypes> = jest.fn();
jest.mock('../../../src/components/validators/ValidateResults', () => ({
  ValidateResults,
}));
import type { Theme } from '@emotion/react';

const useTheme: jest.MockedFn<() => Theme> = jest.fn();
jest.mock('@emotion/react', () => {
  const requireActual = jest.requireActual('@emotion/react');
  return {
    ...requireActual,
    useTheme,
  };
});

import { RangeFieldValidator } from '../../../src/components/validators/RangeFieldValidator';
import { ValidatorStack } from '../../../src/components/validators/ValidatorStack';
import { IThemeOptions, ITypography } from '../../../src/theme';

describe('ValidatorStack unit tests', () => {
  let typographyMock: jest.Mocked<ITypography>;

  beforeEach(() => {
    configure({ testIdAttribute: 'id' });
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
    useTheme.mockReturnValue({
      palette: {
        validation: {
          Invalid: {
            validationColor: '0',
            background: '0',
            backgroundFocus: '0',
          },
          Valid: {
            validationColor: '1',
            background: '1',
            backgroundFocus: '1',
          },
          Optional: {
            validationColor: '1',
            background: '1',
            backgroundFocus: '1',
          },
        },
      },
      typography: typographyMock,
    } as unknown as IThemeOptions);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('and panelValidatorType is Optional', () => {
    describe('and children is empty', () => {
      test('should be Optional', () => {
        ValidateResults.mockReturnValueOnce(ValidatorTypes.Optional);
        const panelValidatorStackType = ValidatorStackTypes.Optional;

        render(<ValidatorStack id={'foo'} panelValidatorStackType={panelValidatorStackType} children={[]}></ValidatorStack>);

        expect(screen.getByTestId(/validation-panel-stack/i)).toBeInTheDocument();

        expect(ValidateResults).toHaveBeenCalledWith(panelValidatorStackType, []);
      });
    });

    describe('and children is populated', () => {
      describe('and valid', () => {
        test('should be Valid', () => {
          ValidateResults.mockReturnValueOnce(ValidatorTypes.Valid);
          ValidateResults.mockReturnValueOnce(ValidatorTypes.Valid);
          ValidateResults.mockReturnValueOnce(ValidatorTypes.Valid);
          ValidateResults.mockReturnValueOnce(ValidatorTypes.Valid);
          const panelValidatorStackType = ValidatorStackTypes.Optional;

          render(
            <ValidatorStack id={'foo'} panelValidatorStackType={panelValidatorStackType}>
              <RangeFieldValidator stackId={'foo'} validationType={ValidatorStackTypes.Optional} id="something" defaultValue={undefined} />
            </ValidatorStack>,
          );

          const something = screen.getByTestId(/TextFieldValidatorsomething/i);
          fireEvent.change(something, { target: { value: '6' } });

          expect(screen.getByTestId(/validation-panel-stack/i)).toBeInTheDocument();

          expect(ValidateResults).toHaveBeenCalledWith(panelValidatorStackType, [ValidatorTypes.Valid]);
        });
      });
      describe('and invalid', () => {
        test('should be Valid', () => {
          ValidateResults.mockReturnValueOnce(ValidatorTypes.Invalid);
          ValidateResults.mockReturnValueOnce(ValidatorTypes.Invalid);
          ValidateResults.mockReturnValueOnce(ValidatorTypes.Invalid);
          ValidateResults.mockReturnValueOnce(ValidatorTypes.Invalid);
          const panelValidatorStackType = ValidatorStackTypes.Optional;

          render(
            <ValidatorStack id={'foo'} panelValidatorStackType={panelValidatorStackType}>
              <RangeFieldValidator stackId={'foo'} validationType={ValidatorStackTypes.Optional} id="something" defaultValue={undefined} />
            </ValidatorStack>,
          );

          const something = screen.getByTestId(/TextFieldValidatorsomething/i);
          fireEvent.change(something, { target: { value: '-1' } });

          expect(screen.getByTestId(/validation-panel-stack/i)).toBeInTheDocument();

          expect(ValidateResults).toHaveBeenCalledWith(panelValidatorStackType, [ValidatorTypes.Invalid]);
        });
      });
    });
  });
});
