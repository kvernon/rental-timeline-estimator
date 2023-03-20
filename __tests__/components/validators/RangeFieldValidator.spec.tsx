import { IThemeOptions, ITypography } from '../../../src/theme';
import { ValidatorStackTypes } from '../../../src/components/validators/ValidatorStackTypes';
import React from 'react';
import { configure, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ValidatorTypes } from '../../../src/components/validators/ValidatorTypes';
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
import { IRangeFieldValidatorProps } from '../../../src/components/validators/IRangeFieldValidatorProps';
import { FormProvider, useForm } from 'react-hook-form';

const RangeFieldValidatorSetup = (props: IRangeFieldValidatorProps) => {
  const methods = useForm({});
  return (
    <FormProvider {...methods}>
      <RangeFieldValidator {...props} />
    </FormProvider>
  );
};

describe('RangeFieldValidator unit tests', () => {
  let typographyMock: jest.Mocked<ITypography>;

  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
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

    configure({ testIdAttribute: 'id' });
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

  describe('and onChange', () => {
    describe('and Optional', () => {
      describe('and value supplied', () => {
        describe('and in range', () => {
          test('should be Valid', () => {
            const onBlurMock = jest.fn();

            render(<RangeFieldValidatorSetup id={'Test'} validationType={ValidatorStackTypes.Optional} defaultValue={0} onBlur={onBlurMock} />);

            const entity = screen.getByTestId('rangeFieldValidatorTest.value');
            const value = 33;

            fireEvent.input(entity, {
              target: {
                value,
              },
            });

            fireEvent.blur(entity);

            expect(onBlurMock).toHaveBeenCalledWith({
              validationResult: ValidatorTypes.Valid,
              validationResultName: 'Valid',
              value,
            });
          });
        });
        describe('and out of range', () => {
          test('should be invalid', () => {
            const onBlurMock = jest.fn();

            render(<RangeFieldValidatorSetup id={'Test'} validationType={ValidatorStackTypes.Optional} defaultValue={0} onBlur={onBlurMock} />);

            const entity = screen.getByTestId('rangeFieldValidatorTest.value');
            const value = -10;

            fireEvent.input(entity, {
              target: {
                value,
              },
            });
            fireEvent.blur(entity);

            expect(onBlurMock).toHaveBeenCalledWith({
              validationResult: ValidatorTypes.Invalid,
              validationResultName: 'Invalid',
              value,
            });
          });
        });
        describe('and undefined', () => {
          test('should be called', () => {
            const onBlurMock = jest.fn();

            render(<RangeFieldValidatorSetup id={'Test'} validationType={ValidatorStackTypes.Optional} onBlur={onBlurMock} />);

            const entity = screen.getByTestId('rangeFieldValidatorTest.value');
            const value = undefined;

            fireEvent.input(entity, {
              target: {
                value,
              },
            });
            fireEvent.blur(entity);

            expect(onBlurMock).toHaveBeenCalledWith({
              validationResult: 2,
              validationResultName: 'Optional',
              value: undefined,
            });
          });
        });
      });

      describe('and value defaulted', () => {
        test('should be Valid', () => {
          const onBlurMock = jest.fn();

          const defaultValue = 0;
          render(
            <RangeFieldValidatorSetup id={'Test'} validationType={ValidatorStackTypes.Optional} defaultValue={defaultValue} onBlur={onBlurMock} />,
          );

          const entity = screen.getByTestId('rangeFieldValidatorTest.value');
          fireEvent.input(entity, {
            target: {
              value: defaultValue,
            },
          });
          fireEvent.blur(entity);

          expect(onBlurMock).toHaveBeenCalledWith({
            validationResult: ValidatorTypes.Valid,
            validationResultName: 'Valid',
            value: defaultValue,
          });
        });
      });
    });

    describe('and Required', () => {
      describe('and value supplied', () => {
        test('should be Valid', () => {
          const onBlurMock = jest.fn();

          render(<RangeFieldValidatorSetup id={'Test'} validationType={ValidatorStackTypes.Required} defaultValue={0} onBlur={onBlurMock} />);

          const value = 55;
          const entity = screen.getByTestId('rangeFieldValidatorTest.value');
          fireEvent.input(entity, {
            target: {
              value,
            },
          });
          fireEvent.blur(entity);

          expect(onBlurMock).toHaveBeenCalledWith({
            validationResult: ValidatorTypes.Valid,
            validationResultName: 'Valid',
            value,
          });
        });
      });

      describe('and value not supplied', () => {
        test('should be called', () => {
          const onBlurMock = jest.fn();

          render(<RangeFieldValidatorSetup id={'Test'} validationType={ValidatorStackTypes.Required} onBlur={onBlurMock} />);

          const entity = screen.getByTestId('rangeFieldValidatorTest.value');
          fireEvent.input(entity, {
            target: {
              value: undefined,
            },
          });
          fireEvent.blur(entity);

          expect(onBlurMock).toHaveBeenCalledWith({
            validationResult: 0,
            validationResultName: 'Invalid',
            value: undefined,
          });
        });

        test('should be not called', () => {
          const onBlurMock = jest.fn();

          render(<RangeFieldValidatorSetup id={'Test'} validationType={ValidatorStackTypes.Required} onBlur={onBlurMock} defaultValue={undefined} />);

          screen.getByTestId('rangeFieldValidatorTest.value');

          expect(onBlurMock).not.toHaveBeenCalledWith();
        });

        describe('and undefined', () => {
          test('should be called', () => {
            const onBlurMock = jest.fn();

            render(<RangeFieldValidatorSetup id={'Test'} validationType={ValidatorStackTypes.Required} onBlur={onBlurMock} />);

            const entity = screen.getByTestId('rangeFieldValidatorTest.value');
            const value = undefined;
            fireEvent.input(entity, {
              target: {
                value,
              },
            });
            fireEvent.blur(entity);

            expect(onBlurMock).toHaveBeenCalledWith({
              validationResult: 0,
              validationResultName: 'Invalid',
              value: undefined,
            });
          });
        });
      });
    });
  });

  describe('and onKeyUp', () => {
    describe('and Optional', () => {
      describe('and value supplied', () => {
        describe('and in range', () => {
          test('should be Valid', () => {
            const onBlurMock = jest.fn();

            render(<RangeFieldValidatorSetup id={'Test'} validationType={ValidatorStackTypes.Optional} defaultValue={0} onBlur={onBlurMock} />);

            const entity = screen.getByTestId('rangeFieldValidatorTest.value');
            const value = 33;
            fireEvent.keyUp(entity, { key: 'Enter', target: { value } });

            fireEvent.blur(entity);

            expect(onBlurMock).toHaveBeenCalledWith({
              validationResult: ValidatorTypes.Valid,
              validationResultName: 'Valid',
              value,
            });
          });
        });
        describe('and out of range', () => {
          test('should be invalid', () => {
            const onBlurMock = jest.fn();

            render(<RangeFieldValidatorSetup id={'Test'} validationType={ValidatorStackTypes.Optional} defaultValue={0} onBlur={onBlurMock} />);

            const entity = screen.getByTestId('rangeFieldValidatorTest.value');
            const value = -10;
            fireEvent.keyUp(entity, { key: 'Enter', target: { value } });

            fireEvent.blur(entity);

            expect(onBlurMock).toHaveBeenCalledWith({
              validationResult: ValidatorTypes.Invalid,
              validationResultName: 'Invalid',
              value,
            });
          });
        });
        describe('and undefined', () => {
          test('should be Optional', () => {
            const onBlurMock = jest.fn();

            render(<RangeFieldValidatorSetup id={'Test'} validationType={ValidatorStackTypes.Optional} onBlur={onBlurMock} />);

            const entity = screen.getByTestId('rangeFieldValidatorTest.value');
            const value = undefined;
            fireEvent.keyUp(entity, { key: 'Enter', target: { value } });

            fireEvent.blur(entity);

            expect(onBlurMock).toHaveBeenCalledWith({
              validationResult: ValidatorTypes.Optional,
              validationResultName: 'Optional',
              value,
            });
          });
        });
      });
    });
    describe('and Required', () => {
      describe('and value supplied', () => {
        test('should be Valid', () => {
          const onBlurMock = jest.fn();

          render(<RangeFieldValidatorSetup id={'Test'} validationType={ValidatorStackTypes.Required} defaultValue={0} onBlur={onBlurMock} />);

          const entity = screen.getByTestId('rangeFieldValidatorTest.value');
          const value = 55;
          fireEvent.keyUp(entity, { key: 'Enter', target: { value } });

          fireEvent.blur(entity);

          expect(onBlurMock).toHaveBeenCalledWith({
            validationResult: ValidatorTypes.Valid,
            validationResultName: 'Valid',
            value,
          });
        });
      });

      describe('and value not supplied', () => {
        test('should be Valid', () => {
          const onBlurMock = jest.fn();

          const defaultValue = 0;

          render(
            <RangeFieldValidatorSetup id={'Test'} validationType={ValidatorStackTypes.Required} defaultValue={defaultValue} onBlur={onBlurMock} />,
          );

          const entity = screen.getByTestId('rangeFieldValidatorTest.value');
          const value = defaultValue;

          fireEvent.keyUp(entity, { key: 'Enter', target: { value } });

          fireEvent.blur(entity);

          expect(onBlurMock).toHaveBeenCalledWith({
            validationResult: ValidatorTypes.Valid,
            validationResultName: 'Valid',
            value,
          });
        });

        describe('and undefined', () => {
          test('should be Invalid', () => {
            const onBlurMock = jest.fn();

            render(<RangeFieldValidatorSetup id={'Test'} validationType={ValidatorStackTypes.Required} onBlur={onBlurMock} />);

            const entity = screen.getByTestId('rangeFieldValidatorTest.value');
            const value = undefined;
            fireEvent.keyUp(entity, { key: 'Enter', target: { value } });

            fireEvent.blur(entity);

            expect(onBlurMock).toHaveBeenCalledWith({
              validationResult: ValidatorTypes.Invalid,
              validationResultName: 'Invalid',
              value,
            });
          });
        });
      });
    });
  });
});
