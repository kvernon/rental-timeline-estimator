import { getRulesValuesToRulesValuesResults } from './getRulesValuesToRulesValuesResults';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import { evaluateValidation } from '../components/validators/evaluateValidation';
import { isInRange } from '../components/validators/isInRange';

jest.mock('../components/validators/evaluateValidation');
jest.mock('../components/validators/isInRange');

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

      describe('and mixed rules match', () => {
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
              {
                ruleTitle: 'foooasddod',
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
        test('should return populated with evaluated multiple values', () => {
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
            {
              title: { value: { value: 0, label: 'food1' } },
              range: { value: 0 },
              property: { value: { value: 0, label: '' } },
            },
            {
              title: { value: { value: 0, label: 'feed' } },
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
              {
                ruleTitle: 'foooasddod',
                property: 0,
              },
              {
                ruleTitle: 'feed',
                property: 0,
              },
            ]),
          ).toEqual([
            {
              title: { value: { value: 0, label: 'fooood' }, validationResult: ValidatorTypes.Valid },
              range: { value: 0, validationResult: ValidatorTypes.Invalid },
              property: { value: { value: 0, label: '' }, validationResult: ValidatorTypes.Valid },
            },
            {
              property: { validationResult: 1, value: { label: '', value: 0 } },
              range: { validationResult: 0, value: 0 },
              title: { validationResult: 1, value: { label: 'feed', value: 0 } },
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
