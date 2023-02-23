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
            const onChangeMock = jest.fn();

            render(
              <RangeFieldValidator
                id={'Test'}
                validationType={ValidatorStackTypes.Optional}
                defaultValue={0}
                onChange={onChangeMock}
                stackId={'foo'}
              />,
            );

            const entity = screen.getByTestId('TextFieldValidatorTest');
            const value = 33;
            fireEvent.change(entity, { target: { value } });

            expect(onChangeMock).toHaveBeenCalledWith({
              validationResult: ValidatorTypes.Valid,
              validationResultName: 'Valid',
              value,
            });
          });
        });
        describe('and out of range', () => {
          test('should be invalid', () => {
            const onChangeMock = jest.fn();

            render(
              <RangeFieldValidator
                id={'Test'}
                validationType={ValidatorStackTypes.Optional}
                defaultValue={0}
                onChange={onChangeMock}
                stackId={'foo'}
              />,
            );

            const entity = screen.getByTestId('TextFieldValidatorTest');
            const value = -10;
            fireEvent.change(entity, { target: { value } });

            expect(onChangeMock).toHaveBeenCalledWith({
              validationResult: ValidatorTypes.Invalid,
              validationResultName: 'Invalid',
              value,
            });
          });
        });
        describe('and undefined', () => {
          test('should be Optional', () => {
            const onChangeMock = jest.fn();

            render(<RangeFieldValidator id={'Test'} validationType={ValidatorStackTypes.Optional} onChange={onChangeMock} stackId={'foo'} />);

            const entity = screen.getByTestId('TextFieldValidatorTest');
            const value = undefined;
            fireEvent.change(entity, { target: { value } });

            expect(onChangeMock).toHaveBeenCalledWith({
              validationResult: ValidatorTypes.Optional,
              validationResultName: 'Optional',
              value,
            });
          });
        });
      });

      describe('and value defaulted', () => {
        test('should be Valid', () => {
          const onChangeMock = jest.fn();

          const defaultValue = 0;
          render(
            <RangeFieldValidator
              id={'Test'}
              validationType={ValidatorStackTypes.Optional}
              defaultValue={defaultValue}
              onChange={onChangeMock}
              stackId={'foo'}
            />,
          );

          screen.getByTestId('TextFieldValidatorTest');

          expect(onChangeMock).toHaveBeenCalledWith({
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
          const onChangeMock = jest.fn();

          render(
            <RangeFieldValidator
              id={'Test'}
              validationType={ValidatorStackTypes.Required}
              defaultValue={0}
              onChange={onChangeMock}
              stackId={'foo'}
            />,
          );

          const entity = screen.getByTestId('TextFieldValidatorTest');
          const value = 55;
          fireEvent.change(entity, { target: { value } });

          expect(onChangeMock).toHaveBeenCalledWith({
            validationResult: ValidatorTypes.Valid,
            validationResultName: 'Valid',
            value,
          });
        });
      });

      describe('and value not supplied', () => {
        test('should be called and Valid', () => {
          const onChangeMock = jest.fn();

          render(<RangeFieldValidator id={'Test'} validationType={ValidatorStackTypes.Required} onChange={onChangeMock} stackId={'foo'} />);

          screen.getByTestId('TextFieldValidatorTest');

          expect(onChangeMock).toHaveBeenCalledWith({
            validationResult: ValidatorTypes.Invalid,
            validationResultName: 'Invalid',
            value: undefined,
          });
        });

        test('should be not called', () => {
          const onChangeMock = jest.fn();

          render(
            <RangeFieldValidator
              id={'Test'}
              validationType={ValidatorStackTypes.Required}
              onChange={onChangeMock}
              stackId={'foo'}
              defaultValue={undefined}
            />,
          );

          screen.getByTestId('TextFieldValidatorTest');

          expect(onChangeMock).not.toHaveBeenCalledWith();
        });

        describe('and undefined', () => {
          test('should be Invalid', () => {
            const onChangeMock = jest.fn();

            render(<RangeFieldValidator id={'Test'} validationType={ValidatorStackTypes.Required} onChange={onChangeMock} stackId={'foo'} />);

            const entity = screen.getByTestId('TextFieldValidatorTest');
            const value = undefined;
            fireEvent.change(entity, { target: { value } });

            expect(onChangeMock).toHaveBeenCalledWith({
              validationResult: ValidatorTypes.Invalid,
              validationResultName: 'Invalid',
              value,
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
            const onChangeMock = jest.fn();

            render(
              <RangeFieldValidator
                id={'Test'}
                validationType={ValidatorStackTypes.Optional}
                defaultValue={0}
                onChange={onChangeMock}
                stackId={'foo'}
              />,
            );

            const entity = screen.getByTestId('TextFieldValidatorTest');
            const value = 33;
            fireEvent.keyUp(entity, { key: 'Enter', target: { value } });

            expect(onChangeMock).toHaveBeenCalledWith({
              validationResult: ValidatorTypes.Valid,
              validationResultName: 'Valid',
              value,
            });
          });
        });
        describe('and out of range', () => {
          test('should be invalid', () => {
            const onChangeMock = jest.fn();

            render(
              <RangeFieldValidator
                id={'Test'}
                validationType={ValidatorStackTypes.Optional}
                defaultValue={0}
                onChange={onChangeMock}
                stackId={'foo'}
              />,
            );

            const entity = screen.getByTestId('TextFieldValidatorTest');
            const value = -10;
            fireEvent.keyUp(entity, { key: 'Enter', target: { value } });

            expect(onChangeMock).toHaveBeenCalledWith({
              validationResult: ValidatorTypes.Invalid,
              validationResultName: 'Invalid',
              value,
            });
          });
        });
        describe('and undefined', () => {
          test('should be Optional', () => {
            const onChangeMock = jest.fn();

            render(<RangeFieldValidator id={'Test'} validationType={ValidatorStackTypes.Optional} onChange={onChangeMock} stackId={'foo'} />);

            const entity = screen.getByTestId('TextFieldValidatorTest');
            const value = undefined;
            fireEvent.keyUp(entity, { key: 'Enter', target: { value } });

            expect(onChangeMock).toHaveBeenCalledWith({
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
          const onChangeMock = jest.fn();

          render(
            <RangeFieldValidator
              id={'Test'}
              validationType={ValidatorStackTypes.Required}
              defaultValue={0}
              onChange={onChangeMock}
              stackId={'foo'}
            />,
          );

          const entity = screen.getByTestId('TextFieldValidatorTest');
          const value = 55;
          fireEvent.keyUp(entity, { key: 'Enter', target: { value } });

          expect(onChangeMock).toHaveBeenCalledWith({
            validationResult: ValidatorTypes.Valid,
            validationResultName: 'Valid',
            value,
          });
        });
      });

      describe('and value not supplied', () => {
        test('should be Valid', () => {
          const onChangeMock = jest.fn();

          const defaultValue = 0;

          render(
            <RangeFieldValidator
              id={'Test'}
              validationType={ValidatorStackTypes.Required}
              defaultValue={defaultValue}
              onChange={onChangeMock}
              stackId={'foo'}
            />,
          );

          const entity = screen.getByTestId('TextFieldValidatorTest');
          const value = defaultValue;

          fireEvent.keyUp(entity, { key: 'Enter', target: { value } });

          expect(onChangeMock).toHaveBeenCalledWith({
            validationResult: ValidatorTypes.Valid,
            validationResultName: 'Valid',
            value,
          });
        });

        describe('and undefined', () => {
          test('should be Invalid', () => {
            const onChangeMock = jest.fn();

            render(<RangeFieldValidator id={'Test'} validationType={ValidatorStackTypes.Required} onChange={onChangeMock} stackId={'foo'} />);

            const entity = screen.getByTestId('TextFieldValidatorTest');
            const value = undefined;
            fireEvent.keyUp(entity, { key: 'Enter', target: { value } });

            expect(onChangeMock).toHaveBeenCalledWith({
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
