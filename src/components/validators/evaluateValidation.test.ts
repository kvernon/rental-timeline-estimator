import { ValidatorTypes } from './ValidatorTypes';
import { evaluateValidation } from './evaluateValidation';

describe('evaluateValidation unit tests', () => {
  describe('and not required', () => {
    describe('and value undefined', () => {
      test(`should return ${ValidatorTypes[ValidatorTypes.Optional]}`, () => {
        const rule = jest.fn();

        const actual = evaluateValidation(undefined, rule);

        expect(actual).toEqual({ validationResult: ValidatorTypes.Optional, value: undefined });
      });
    });

    describe('and value populated with options', () => {
      test(`should return rule ${ValidatorTypes[ValidatorTypes.Valid]}`, () => {
        const rule = jest.fn().mockReturnValue(ValidatorTypes.Valid);

        const actual = evaluateValidation(1, rule, { min: 3, max: 4, isRequired: false });

        expect(actual).toEqual({ validationResult: ValidatorTypes.Valid, value: 1 });
      });
    });
  });
  describe('and required', () => {
    describe('and value populated with options', () => {
      test(`should return rule ${ValidatorTypes[ValidatorTypes.Valid]}`, () => {
        const rule = jest.fn().mockReturnValue(ValidatorTypes.Valid);

        const actual = evaluateValidation(1, rule, { min: 3, max: 4, isRequired: true });

        expect(actual).toEqual({ validationResult: ValidatorTypes.Valid, value: 1 });

        expect(rule).toHaveBeenCalledWith(1, { min: 3, max: 4, isRequired: true });
      });
    });
  });
});
