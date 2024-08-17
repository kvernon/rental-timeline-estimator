import { getRulesValuesToRulesValuesResults } from './getRulesValuesToRulesValuesResults';
import { ValidatorTypes } from '../validators/ValidatorTypes';
import { evaluateValidation } from '../validators/evaluateValidation';
import { isInRange } from '../validators/isInRange';

jest.mock('../validators/evaluateValidation');
jest.mock('../validators/isInRange');

describe('getRulesValuesToRulesValuesResults unit tests', () => {
  describe('and is not required', () => {
    describe('and everything is empty', () => {
      test('should return empty', () => {
        expect(getRulesValuesToRulesValuesResults(false, [], [])).toEqual([]);
      });
    });

    describe('and value is populated', () => {
      describe('and no rules', () => {
        test('should return populated with default value', () => {
          const values = [
            {
              title: { value: { value: 0, label: '' } },
              range: { value: 0 },
              property: { value: { value: 0, label: '' } },
            },
          ];

          expect(getRulesValuesToRulesValuesResults(false, values, [])).toEqual([
            {
              title: { value: { value: 0, label: '' }, validationResult: ValidatorTypes.Valid },
              range: { value: 0, validationResult: ValidatorTypes.Optional },
              property: { value: { value: 0, label: '' }, validationResult: ValidatorTypes.Valid },
            },
          ]);
        });
      });

      describe('and no rules match', () => {
        test('should return populated with default value', () => {
          const values = [
            {
              title: { value: { value: 0, label: '' } },
              range: { value: 0 },
              property: { value: { value: 0, label: '' } },
            },
          ];

          expect(
            getRulesValuesToRulesValuesResults(false, values, [
              {
                ruleTitle: 'foo',
                property: 0,
              },
            ]),
          ).toEqual([
            {
              title: { value: { value: 0, label: '' }, validationResult: ValidatorTypes.Valid },
              range: { value: 0, validationResult: ValidatorTypes.Optional },
              property: { value: { value: 0, label: '' }, validationResult: ValidatorTypes.Valid },
            },
          ]);
        });
      });
      describe('and rules match', () => {
        test('should return populated with evaluated values', () => {
          jest.mocked(evaluateValidation).mockImplementation((b, r, v) => ({
            validationResult: ValidatorTypes.Invalid,
            value: v,
          }));

          const values = [
            {
              title: { value: { value: 0, label: 'fooood' } },
              range: { value: 0 },
              property: { value: { value: 0, label: '' } },
            },
          ];

          expect(
            getRulesValuesToRulesValuesResults(false, values, [
              {
                ruleTitle: 'fooood',
                property: 0,
              },
            ]),
          ).toEqual([
            {
              title: { value: { value: 0, label: 'fooood' }, validationResult: ValidatorTypes.Valid },
              range: { value: 0, validationResult: ValidatorTypes.Invalid },
              property: { value: { value: 0, label: '' }, validationResult: ValidatorTypes.Valid },
            },
          ]);

          expect(jest.mocked(evaluateValidation)).toHaveBeenCalledWith(false, isInRange, 0, {
            max: undefined,
            min: undefined,
          });
        });
      });
    });
  });
});
