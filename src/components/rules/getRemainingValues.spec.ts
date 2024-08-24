import { getRemainingValues } from './getRemainingValues';
import { IRuleStackEntity } from './IRuleStackEntity';
import { ValidatorTypes } from '../validators/ValidatorTypes';

/**
 * update this to:
 * somehow use isDisabled to flag what should be turned off into the title drop down later
 */

describe('getRemainingValues unit tests', () => {
  describe('and empty choices', () => {
    test('should return empty array', () => {
      expect(getRemainingValues([], [])).toEqual([]);
    });
  });

  describe('and has choices', () => {
    let choices: IRuleStackEntity[];

    beforeEach(() => {
      choices = [
        { ruleTitle: 'one', property: 0 },
        { ruleTitle: 'two', property: 1 },
        { ruleTitle: 'three', property: 1 },
        { ruleTitle: 'four', property: 1 },
      ];
    });

    describe('and no values', () => {
      test('should return same choices', () => {
        expect(getRemainingValues(choices, [])).toEqual([
          { ruleTitle: 'one', property: 0, isDisabled: false },
          { ruleTitle: 'two', property: 1, isDisabled: false },
          { ruleTitle: 'three', property: 1, isDisabled: false },
          { ruleTitle: 'four', property: 1, isDisabled: false },
        ]);
      });
    });

    describe('and values same length', () => {
      test('should return false', () => {
        expect(
          getRemainingValues(choices, [
            {
              value: { value: 0, label: 'one' },
              validationResult: ValidatorTypes.Valid,
            },
            {
              value: { value: 0, label: 'two' },
              validationResult: ValidatorTypes.Valid,
            },
          ]),
        ).toEqual([
          { ruleTitle: 'one', property: 0, isDisabled: true },
          { ruleTitle: 'two', property: 1, isDisabled: true },
          { ruleTitle: 'three', property: 1, isDisabled: false },
          { ruleTitle: 'four', property: 1, isDisabled: false },
        ]);
      });
    });

    describe('and values is one more in length', () => {
      test('should return all updated choices with true', () => {
        expect(
          getRemainingValues(choices, [
            { value: { value: 0, label: 'one' }, validationResult: ValidatorTypes.Valid },
            { value: { value: 0, label: 'two' }, validationResult: ValidatorTypes.Valid },
            { value: { value: 0, label: 'three' }, validationResult: ValidatorTypes.Valid },
          ]),
        ).toEqual([
          { ruleTitle: 'one', property: 0, isDisabled: true },
          { ruleTitle: 'two', property: 1, isDisabled: true },
          { ruleTitle: 'three', property: 1, isDisabled: true },
          { ruleTitle: 'four', property: 1, isDisabled: false },
        ]);
      });
    });
  });
});
