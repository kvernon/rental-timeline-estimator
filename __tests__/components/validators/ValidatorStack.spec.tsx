import { ValidatorStackTypes } from '../../../src/components/validators/ValidatorStackTypes';
import React from 'react';
import { configure, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import type { Theme } from '@emotion/react';

const useTheme: jest.MockedFn<() => Theme> = jest.fn();
jest.mock('@emotion/react', () => {
  const requireActual = jest.requireActual('@emotion/react');
  return {
    ...requireActual,
    useTheme,
  };
});

jest.mock('react-hook-form', () => {
  //const watchMock: jest.Mock = jest.fn();
  return {
    useForm: jest.fn().mockReturnValue({}),
    useFormContext: jest.fn().mockReturnValue({
      register: jest.fn(),
      getValues: jest.fn(),
      setValue: jest.fn(),
      trigger: jest.fn(),
    }),
  };
});

import { ValidatorTypes } from '../../../src/components/validators/ValidatorTypes';
import { RangeFieldValidator } from '../../../src/components/validators/RangeFieldValidator';
import { ValidatorStack } from '../../../src/components/validators/ValidatorStack';
import { IValidatorPanelProps } from '../../../src/components/validators/IValidatorPanelProps';
import { IThemeOptions } from '../../../src/theming/IThemeOptions';
import { ITypography } from '../../../src/theming/ITypography';
import { useValidationChildren } from '../../../src/components/hooks/useValidationChildren';
import { useWatcher } from '../../../src/components/hooks/useWatcher';

jest.mock('../../../src/components/hooks/useWatcher', () => {
  const returnMock = jest.fn();
  return {
    useWatcher: returnMock,
  };
});

jest.mock('../../../src/components/hooks/useValidationChildren', () => {
  const returnMock = jest.fn();
  return {
    useValidationChildren: returnMock,
  };
});

const ValidatorStackSetup = (props: IValidatorPanelProps) => {
  return (
    <ValidatorStack id={props.id} panelValidatorStackType={props.panelValidatorStackType}>
      {props.children}
    </ValidatorStack>
  );
};

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
    jest.resetModules();
  });

  describe('and panelValidatorType is Optional', () => {
    describe('and children is empty', () => {
      test('should be Valid', () => {
        const useValidationChildrenMocked = jest.mocked(useValidationChildren);
        useValidationChildrenMocked.mockReturnValueOnce({
          isValid: ValidatorTypes.Optional,
          isValidCollection: [],
        });

        const panelValidatorStackType = ValidatorStackTypes.Optional;

        render(<ValidatorStackSetup id={'foo'} panelValidatorStackType={panelValidatorStackType} children={[]}></ValidatorStackSetup>);

        expect(screen.getByTestId(/validatorStackfoo/i)).toBeInTheDocument();

        expect(screen.getByTitle(/Optional/i)).toBeInTheDocument();
      });
    });

    describe('and children is populated', () => {
      describe('and valid', () => {
        test('should be Valid', () => {
          const useWatcherMocked = jest.mocked(useWatcher);
          useWatcherMocked.mockReturnValue([[], () => []]);

          const useValidationChildrenMocked = jest.mocked(useValidationChildren);
          useValidationChildrenMocked.mockReturnValueOnce({
            isValid: ValidatorTypes.Valid,
            isValidCollection: [],
          });

          const panelValidatorStackType = ValidatorStackTypes.Optional;

          render(
            <ValidatorStackSetup id={'foo'} panelValidatorStackType={panelValidatorStackType}>
              <RangeFieldValidator validationType={ValidatorStackTypes.Optional} id="something" defaultValue={undefined} />
            </ValidatorStackSetup>,
          );

          const something = screen.getByTestId(/rangeFieldValidatorsomething.value/i);
          fireEvent.change(something, { target: { value: '6' } });

          expect(screen.getByTestId('validatorStackfoo')).toBeInTheDocument();

          expect(screen.getByTitle(/Valid/i)).toBeInTheDocument();
        });
      });
      describe('and invalid', () => {
        test('should be Valid', () => {
          const useValidationChildrenMocked = jest.mocked(useValidationChildren);
          useValidationChildrenMocked.mockReturnValueOnce({
            isValid: ValidatorTypes.Invalid,
            isValidCollection: [],
          });

          const panelValidatorStackType = ValidatorStackTypes.Optional;

          render(
            <ValidatorStackSetup id={'foo'} panelValidatorStackType={panelValidatorStackType}>
              <RangeFieldValidator validationType={ValidatorStackTypes.Optional} id="something" defaultValue={undefined} />
            </ValidatorStackSetup>,
          );

          const something = screen.getByTestId(/rangeFieldValidatorsomething.value/i);
          fireEvent.change(something, { target: { value: -1 } });

          fireEvent.blur(something);

          expect(screen.getByTestId('validatorStackfoo')).toBeInTheDocument();

          expect(screen.getByTitle(/Invalid/i)).toBeInTheDocument();
        });
      });
    });
  });
});
