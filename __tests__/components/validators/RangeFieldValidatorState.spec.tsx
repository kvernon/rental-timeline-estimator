import { Theme } from '@emotion/react';

const useTheme: jest.MockedFn<() => Theme> = jest.fn();
jest.mock('@emotion/react', () => {
  const requireActual = jest.requireActual('@emotion/react');
  return {
    ...requireActual,
    useTheme,
  };
});

import { IRangeFieldValidatorProps } from '../../../src/components/validators/IRangeFieldValidatorProps';
import { FormProvider, useForm } from 'react-hook-form';
import React from 'react';
import { configure, fireEvent, render, screen } from '@testing-library/react';
import { ValidatorStackTypes } from '../../../src/components/validators/ValidatorStackTypes';
import '@testing-library/jest-dom';
import { RangeFieldValidatorState } from '../../../src/components/validators/RangeFieldValidatorState';
import { IThemeOptions } from '../../../src/theming/IThemeOptions';
import { ITypography } from '../../../src/theming/ITypography';

const RangeFieldValidatorSetup = (props: IRangeFieldValidatorProps) => {
  const methods = useForm({ mode: 'onBlur' });
  return (
    <FormProvider {...methods}>
      <RangeFieldValidatorState {...props} />
    </FormProvider>
  );
};

describe('RangeFieldValidatorState unit tests', () => {
  let typographyMock: jest.Mocked<ITypography>;

  const validationColorOptionalRight = '#0000FF';
  const validationColorValidMiddle = '#00FF00';
  const validationColorInvalidLeft = '#FF0000';

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
    } as unknown as IThemeOptions);
  });

  describe('and initialized', () => {
    describe('and Required', () => {
      describe('and value not supplied', () => {
        test('should be the following', () => {
          render(<RangeFieldValidatorSetup id={'Test'} validationType={ValidatorStackTypes.Required} />);

          const entity = screen.getByTestId<HTMLInputElement>('rangeFieldValidatorTest.value');

          expect(entity.value).toEqual('');

          expect(entity).toHaveStyle('background-color:rgba(255, 0, 0, 0.255)');
        });
      });
      describe('and value supplied', () => {
        test('should be the following', () => {
          render(<RangeFieldValidatorSetup id={'Test'} defaultValue={20} validationType={ValidatorStackTypes.Required} />);

          const entity = screen.getByTestId<HTMLInputElement>('rangeFieldValidatorTest.value');

          expect(entity.value).toEqual('20');

          expect(entity).toHaveStyle('background-color:rgba(255, 0, 0, 0.506)');
        });
      });
    });

    describe('and Optional', () => {
      describe('and value not supplied', () => {
        test('should be the following', () => {
          render(<RangeFieldValidatorSetup id={'Test'} validationType={ValidatorStackTypes.Optional} />);

          const entity = screen.getByTestId<HTMLInputElement>('rangeFieldValidatorTest.value');

          expect(entity.value).toEqual('');

          expect(entity).toHaveStyle('background-color:rgba(0, 0, 255, 0.255)');
        });
      });
      describe('and value supplied', () => {
        test('should be the following', () => {
          render(<RangeFieldValidatorSetup id={'Test'} defaultValue={2} validationType={ValidatorStackTypes.Optional} />);

          const entity = screen.getByTestId<HTMLInputElement>('rangeFieldValidatorTest.value');

          expect(entity.value).toEqual('2');

          expect(entity).toHaveStyle('background-color:rgba(0, 0, 255, 0.506)');
        });
      });
    });
  });

  describe('and altering data', () => {
    describe('and Required', () => {
      describe('and valid with rule', () => {
        test('should be the following', () => {
          render(<RangeFieldValidatorSetup id={'Test'} validationType={ValidatorStackTypes.Required} />);

          const entity = screen.getByTestId<HTMLInputElement>('rangeFieldValidatorTest.value');

          const value = 1;

          fireEvent.input(entity, {
            target: {
              value,
            },
          });

          fireEvent.blur(entity);

          expect(entity.value).toEqual(value.toString());

          expect(entity).toHaveStyle('background-color:rgba(0, 255, 0, 0.255)');
        });
      });
      describe('and invalid with rule', () => {
        test('should be the following', () => {
          render(<RangeFieldValidatorSetup id={'Test'} validationType={ValidatorStackTypes.Required} />);

          const entity = screen.getByTestId<HTMLInputElement>('rangeFieldValidatorTest.value');

          const value = -1;

          fireEvent.input(entity, {
            target: {
              value,
            },
          });

          fireEvent.blur(entity);

          expect(entity.value).toEqual(value.toString());

          expect(entity).toHaveStyle('background-color:rgba(255, 0, 0, 0.255)');
        });
      });
    });
    describe('and Optional', () => {
      describe('and valid with rule', () => {
        test('should be the following', () => {
          render(<RangeFieldValidatorSetup id={'Test'} validationType={ValidatorStackTypes.Optional} />);

          const entity = screen.getByTestId<HTMLInputElement>('rangeFieldValidatorTest.value');

          const value = 1;

          fireEvent.input(entity, {
            target: {
              value,
            },
          });

          fireEvent.blur(entity);

          expect(entity.value).toEqual(value.toString());

          expect(entity).toHaveStyle('background-color:rgba(0, 255, 0, 0.255)');
        });
      });
      describe('and invalid with rule', () => {
        test('should be the following', () => {
          render(<RangeFieldValidatorSetup id={'Test'} validationType={ValidatorStackTypes.Optional} />);

          const entity = screen.getByTestId<HTMLInputElement>('rangeFieldValidatorTest.value');

          const value = -1;

          fireEvent.input(entity, {
            target: {
              value,
            },
          });

          fireEvent.blur(entity);

          expect(entity.value).toEqual(value.toString());

          expect(entity).toHaveStyle('background-color:rgba(255, 0, 0, 0.255)');
        });
      });
    });
  });
});
