import { ValidatorStackTypes } from '../../../src/components/validators/ValidatorStackTypes';
import { ValidatorStack } from '../../../src/components/validators/ValidatorStack';
import React from 'react';
import { configure, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ValidateResults } from '../../../src/components/validators/ValidateResults';
import { ValidatorTypes } from '../../../src/components/validators/ValidatorTypes';
import { RangeFieldValidator } from '../../../src/components/validators/RangeFieldValidator';

jest.mock('../../../src/components/validators/ValidateResults', () => ({
  ValidateResults: jest.fn(),
}));

describe('ValidatorStack unit tests', () => {
  beforeEach(() => {
    configure({ testIdAttribute: 'id' });
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  describe('and panelValidatorType is Optional', () => {
    describe('and children is empty', () => {
      test('should be Optional', () => {
        const panelValidatorStackType = ValidatorStackTypes.Optional;

        render(<ValidatorStack id={'foo'} panelValidatorStackType={panelValidatorStackType} children={[]}></ValidatorStack>);

        expect(screen.getByTestId(/validation-panel-stack/i)).toBeInTheDocument();

        expect(ValidateResults).toHaveBeenCalledWith(panelValidatorStackType, []);
      });
    });

    describe('and children is populated', () => {
      describe('and valid', () => {
        test('should be Valid', () => {
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
