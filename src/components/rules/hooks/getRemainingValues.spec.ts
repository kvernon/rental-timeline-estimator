import { getRemainingValues } from './getRemainingValues';
import { IRuleStackEntity } from '../IRuleStackEntity';
import { ValidatorTypes } from '../../validators/ValidatorTypes';

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
        { ruleTitle: 'one', property: 1 },
        { ruleTitle: 'two', property: 0 },
        { ruleTitle: 'two', property: 1 },
        { ruleTitle: 'three', property: 1 },
        { ruleTitle: 'four', property: 1 },
      ];
    });

    describe('and no values', () => {
      test('should return same choices', () => {
        expect(getRemainingValues(choices, [])).toEqual(
          choices.map((c) => {
            return { ...c, isDisabled: false };
          }),
        );
      });
    });

    describe('and values same length', () => {
      test('should return collection', () => {
        expect(
          getRemainingValues(choices, [
            {
              title: {
                value: { value: 0, label: 'one' },
                validationResult: ValidatorTypes.Valid,
              },
              property: {
                value: { value: 0, label: 'apt' },
                validationResult: ValidatorTypes.Valid,
              },
            },
            {
              title: {
                value: { value: 0, label: 'two' },
                validationResult: ValidatorTypes.Valid,
              },
              property: {
                value: { value: 1, label: 'home' },
                validationResult: ValidatorTypes.Valid,
              },
            },
          ]),
        ).toEqual([
          { isDisabled: true, property: 0, ruleTitle: 'one' },
          { isDisabled: false, property: 1, ruleTitle: 'one' },
          { isDisabled: false, property: 0, ruleTitle: 'two' },
          { isDisabled: true, property: 1, ruleTitle: 'two' },
          { isDisabled: false, property: 1, ruleTitle: 'three' },
          { isDisabled: false, property: 1, ruleTitle: 'four' },
        ]);
      });
    });

    describe('and values is one more in length', () => {
      test('should return all updated choices with true', () => {
        expect(
          getRemainingValues(choices, [
            {
              title: {
                value: { value: 0, label: 'one' },
                validationResult: ValidatorTypes.Valid,
              },
              property: {
                value: { value: 0, label: 'apt' },
                validationResult: ValidatorTypes.Valid,
              },
            },
            {
              title: {
                value: { value: 0, label: 'two' },
                validationResult: ValidatorTypes.Valid,
              },
              property: {
                value: { value: 0, label: 'apt' },
                validationResult: ValidatorTypes.Valid,
              },
            },
            {
              title: {
                value: { value: 0, label: 'three' },
                validationResult: ValidatorTypes.Valid,
              },
              property: {
                value: { value: 0, label: 'apt' },
                validationResult: ValidatorTypes.Valid,
              },
            },
          ]),
        ).toEqual([
          { isDisabled: true, property: 0, ruleTitle: 'one' },
          { isDisabled: false, property: 1, ruleTitle: 'one' },
          { isDisabled: true, property: 0, ruleTitle: 'two' },
          { isDisabled: false, property: 1, ruleTitle: 'two' },
          { isDisabled: false, property: 1, ruleTitle: 'three' },
          { isDisabled: false, property: 1, ruleTitle: 'four' },
        ]);
      });
    });
  });
});
