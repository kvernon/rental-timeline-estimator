import { ValidatorTypes } from './ValidatorTypes';
import { evaluateValidation } from './evaluateValidation';

describe('evaluateValidation unit tests', () => {
  describe('and not required', () => {
    describe('and value undefined', () => {
      test(`should return ${ValidatorTypes[ValidatorTypes.Optional]}`, () => {
        const rule = jest.fn();

        const actual = evaluateValidation(false, rule, undefined);

        expect(actual).toEqual({ validationResult: ValidatorTypes.Optional, value: undefined });
      });
    });

    describe('and value populated with options', () => {
      test(`should return rule ${ValidatorTypes[ValidatorTypes.Valid]}`, () => {
        const rule = jest.fn().mockReturnValue(ValidatorTypes.Valid);

        const actual = evaluateValidation(false, rule, 1, { min: 3, max: 4 });

        expect(actual).toEqual({ validationResult: ValidatorTypes.Valid, value: 1 });
      });
    });
  });
  describe('and required', () => {
    describe('and value undefined', () => {
      test(`should return ${ValidatorTypes[ValidatorTypes.Invalid]}`, () => {
        const rule = jest.fn();

        const actual = evaluateValidation(true, rule, undefined);

        expect(actual).toEqual({ validationResult: ValidatorTypes.Invalid, value: undefined });
      });
    });

    describe('and value populated with options', () => {
      test(`should return rule ${ValidatorTypes[ValidatorTypes.Valid]}`, () => {
        const rule = jest.fn().mockReturnValue(ValidatorTypes.Valid);

        const actual = evaluateValidation(true, rule, 1, { min: 3, max: 4 });

        expect(actual).toEqual({ validationResult: ValidatorTypes.Valid, value: 1 });

        expect(rule).toHaveBeenCalledWith(1, { min: 3, max: 4 });
      });
    });
  });
});
