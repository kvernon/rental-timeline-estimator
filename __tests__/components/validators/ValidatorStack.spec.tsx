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

import { RangeFieldValidator } from '../../../src/components/validators/RangeFieldValidator';
import { ValidatorStack } from '../../../src/components/validators/ValidatorStack';
import { IThemeOptions, ITypography } from '../../../src/theme';
import { FormProvider, useForm } from 'react-hook-form';
import { IValidatorPanelProps } from '../../../src/components/validators/IValidatorPanelProps';

const ValidatorStackSetup = (props: IValidatorPanelProps) => {
  const methods = useForm({});
  return (
    <FormProvider {...methods}>
      <ValidatorStack id={props.id} panelValidatorStackType={props.panelValidatorStackType}>
        {props.children}
      </ValidatorStack>
    </FormProvider>
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
    jest.resetAllMocks();
  });

  describe('and panelValidatorType is Optional', () => {
    describe('and children is empty', () => {
      test('should be Valid', () => {
        const panelValidatorStackType = ValidatorStackTypes.Optional;

        render(<ValidatorStackSetup id={'foo'} panelValidatorStackType={panelValidatorStackType} children={[]}></ValidatorStackSetup>);

        expect(screen.getByTestId(/validatorStackfoo/i)).toBeInTheDocument();

        expect(screen.getByTitle(/Valid/i)).toBeInTheDocument();
      });
    });

    describe('and children is populated', () => {
      describe('and valid', () => {
        test('should be Valid', () => {
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
