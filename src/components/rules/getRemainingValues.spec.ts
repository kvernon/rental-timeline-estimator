import { getRemainingValues } from './getRemainingValues';
import { IRuleStackEntity } from './IRuleStackEntity';
import { ValidatorTypes } from '../validators/ValidatorTypes';

describe('getRemainingValues unit tests', () => {
  describe('and empty choices', () => {
    test('should return false', () => {
      expect(getRemainingValues([], [])).toEqual([]);
    });
  });

  describe('and has choices', () => {
    let choices: IRuleStackEntity[];

    beforeEach(() => {
      choices = [
        { ruleTitle: 'one', property: 0 },
        { ruleTitle: 'two', property: 1 },
      ];
    });

    describe('and no values', () => {
      test('should return true', () => {
        expect(getRemainingValues(choices, [])).toEqual([
          { index: 0, entity: { ruleTitle: 'one', property: 0 } },
          { index: 1, entity: { ruleTitle: 'two', property: 1 } },
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
            { value: { value: 0, label: 'two' }, validationResult: ValidatorTypes.Valid },
          ]),
        ).toEqual([]);
      });
    });

    describe('and values is one more in length', () => {
      test('should return false', () => {
        expect(
          getRemainingValues(choices, [
            { value: { value: 0, label: 'one' }, validationResult: ValidatorTypes.Valid },
            { value: { value: 0, label: 'two' }, validationResult: ValidatorTypes.Valid },
            { value: { value: 0, label: 'three' }, validationResult: ValidatorTypes.Valid },
          ]),
        ).toEqual([]);
      });
    });
  });
});
