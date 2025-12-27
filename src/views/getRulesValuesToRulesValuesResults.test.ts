import { getRulesValuesToRulesValuesResults } from './getRulesValuesToRulesValuesResults';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import { evaluateValidation } from '../components/validators/evaluateValidation';
import { isInRange } from '../components/validators/isInRange';
import { getRuleChoices } from '../rules/getRuleChoices';
import { purchaseConfig } from '../rules/purchaseRuleConfig';
import { formDefault } from './formDefault';

jest.mock('../components/validators/evaluateValidation');
jest.mock('../components/validators/isInRange');
jest.mock('./formDefault');

describe('getRulesValuesToRulesValuesResults unit tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('and is not required', () => {
    describe('and everything is empty', () => {
      test('should return empty', () => {
        (formDefault as jest.Mock).mockReturnValue([]);
        expect(getRulesValuesToRulesValuesResults(false, [], [])).toEqual([]);
        expect(formDefault).toHaveBeenCalledWith(false, []);
      });
    });

    describe('and value is populated', () => {
      describe('and no rules', () => {
        test('should return populated with default value', () => {
          const values = [
            {
              title: { value: { value: 0, label: '' } },
              range: { value: 0 },
              property: { value: { value: 0, label: 'apt' } },
            },
          ];
          const expected = [
            {
              title: { value: { value: 0, label: '' }, validationResult: ValidatorTypes.Valid },
              range: { value: 0, validationResult: ValidatorTypes.Optional },
              property: { value: { value: 0, label: 'apt' }, validationResult: ValidatorTypes.Valid },
            },
          ];
          (formDefault as jest.Mock).mockReturnValue(expected);

          expect(getRulesValuesToRulesValuesResults(false, values, [])).toEqual(expected);
          expect(formDefault).toHaveBeenCalledWith(false, values);
        });
      });

      describe('and no rules match', () => {
        test('should return populated with default value', () => {
          const values = [
            {
              title: { value: { value: 0, label: '' } },
              range: { value: 0 },
              property: { value: { value: 0, label: 'apt' } },
            },
          ];
          const expected = [
            {
              title: { value: { value: 0, label: '' }, validationResult: ValidatorTypes.Valid },
              range: { value: 0, validationResult: ValidatorTypes.Optional },
              property: { value: { value: 0, label: 'apt' }, validationResult: ValidatorTypes.Valid },
            },
          ];
          (formDefault as jest.Mock).mockReturnValue(expected);

          expect(
            getRulesValuesToRulesValuesResults(false, values, [
              {
                ruleTitle: 'foo',
                property: 0,
                rule: 'HoldRuleTypes',
              },
            ]),
          ).toEqual(expected);
          expect(formDefault).toHaveBeenCalledWith(false, values);
        });
      });

      describe('and rules match', () => {
        test('should return populated with evaluated values', () => {
          jest.mocked(evaluateValidation).mockImplementation((v) => ({
            validationResult: ValidatorTypes.Invalid,
            value: v,
          }));

          const values = [
            {
              title: { value: { value: 0, label: 'fooood' } },
              range: { value: 0 },
              property: { value: { value: 0, label: 'apt' } },
            },
          ];

          expect(
            getRulesValuesToRulesValuesResults(false, values, [
              {
                ruleTitle: 'fooood',
                property: 0,
                rule: 'HoldRuleTypes',
              },
            ]),
          ).toEqual([
            {
              title: { value: { value: 0, label: 'fooood' }, validationResult: ValidatorTypes.Valid },
              range: { value: 0, validationResult: ValidatorTypes.Invalid },
              property: { value: { value: 0, label: 'apt' }, validationResult: ValidatorTypes.Valid },
            },
          ]);

          expect(jest.mocked(evaluateValidation)).toHaveBeenCalledWith(0, isInRange, {
            max: undefined,
            min: undefined,
            isRequired: false,
          });
        });
      });

      describe('and mixed rules match', () => {
        test('should return populated with evaluated values', () => {
          jest.mocked(evaluateValidation).mockImplementation((v) => ({
            validationResult: ValidatorTypes.Invalid,
            value: v,
          }));

          const values = [
            {
              title: { value: { value: 0, label: 'fooood' } },
              range: { value: 0 },
              property: { value: { value: 0, label: 'apt' } },
            },
          ];

          expect(
            getRulesValuesToRulesValuesResults(false, values, [
              {
                ruleTitle: 'fooood',
                property: 0,
                rule: 'HoldRuleTypes',
              },
              {
                ruleTitle: 'foooasddod',
                property: 0,
                rule: 'HoldRuleTypes',
              },
            ]),
          ).toEqual([
            {
              title: { value: { value: 0, label: 'fooood' }, validationResult: ValidatorTypes.Valid },
              range: { value: 0, validationResult: ValidatorTypes.Invalid },
              property: { value: { value: 0, label: 'apt' }, validationResult: ValidatorTypes.Valid },
            },
          ]);

          expect(jest.mocked(evaluateValidation)).toHaveBeenCalledWith(0, isInRange, {
            max: undefined,
            min: undefined,
            isRequired: false,
          });
        });
        test('should return populated with evaluated multiple values', () => {
          jest.mocked(evaluateValidation).mockImplementation((v) => ({
            validationResult: ValidatorTypes.Invalid,
            value: v,
          }));

          const values = [
            {
              title: { value: { value: 0, label: 'fooood' } },
              range: { value: 0 },
              property: { value: { value: 0, label: 'apt' } },
            },
            {
              title: { value: { value: 0, label: 'food1' } },
              range: { value: 0 },
              property: { value: { value: 1, label: 'house' } },
            },
            {
              title: { value: { value: 0, label: 'feed' } },
              range: { value: 0 },
              property: { value: { value: 0, label: 'apt' } },
            },
          ];

          expect(
            getRulesValuesToRulesValuesResults(false, values, [
              {
                ruleTitle: 'fooood',
                property: 0,
                rule: 'HoldRuleTypes',
              },
              {
                ruleTitle: 'foooasddod',
                property: 0,
                rule: 'HoldRuleTypes',
              },
              {
                ruleTitle: 'feed',
                property: 0,
                rule: 'HoldRuleTypes',
              },
            ]),
          ).toEqual([
            {
              title: { value: { value: 0, label: 'fooood' }, validationResult: ValidatorTypes.Valid },
              range: { value: 0, validationResult: ValidatorTypes.Invalid },
              property: { value: { value: 0, label: 'apt' }, validationResult: ValidatorTypes.Valid },
            },
            {
              property: { validationResult: ValidatorTypes.Valid, value: { label: 'apt', value: 0 } },
              range: { validationResult: ValidatorTypes.Invalid, value: 0 },
              title: { validationResult: ValidatorTypes.Valid, value: { label: 'feed', value: 0 } },
            },
          ]);

          expect(jest.mocked(evaluateValidation)).toHaveBeenCalledWith(0, isInRange, {
            max: undefined,
            min: undefined,
            isRequired: false,
          });
        });
      });
    });
  });

  describe('special case', () => {
    test('should return populated with default value', () => {
      const { evaluateValidation: actualEvaluateValidation } = jest.requireActual('../components/validators/evaluateValidation');
      const { isInRange: actualIsInRange } = jest.requireActual('../components/validators/isInRange');

      (evaluateValidation as jest.Mock).mockImplementation(actualEvaluateValidation);
      (isInRange as jest.Mock).mockImplementation(actualIsInRange);

      const values = [
        {
          title: {
            value: {
              value: 0,
              label: 'Min Estimated Annual Cash Flow',
            },
            validationResult: ValidatorTypes.Valid,
          },
          property: {
            value: {
              value: 1,
              label: 'house',
            },
            validationResult: ValidatorTypes.Valid,
          },
          range: {
            value: 3600,
            validationResult: ValidatorTypes.Valid,
          },
        },
        {
          title: {
            value: {
              value: 3,
              label: 'Max Estimated Out Of Pocket',
            },
            validationResult: ValidatorTypes.Valid,
          },
          property: {
            value: {
              value: 1,
              label: 'house',
            },
            validationResult: ValidatorTypes.Valid,
          },
          range: {
            value: 60000,
            validationResult: ValidatorTypes.Valid,
          },
        },
        {
          title: {
            value: {
              value: 0,
              label: 'Min Estimated Annual Cash Flow',
            },
          },
          property: {
            value: {
              value: 0,
              label: 'apartment',
            },
          },
          range: {
            value: undefined,
          },
        },
      ];

      expect(getRulesValuesToRulesValuesResults(false, values, getRuleChoices(purchaseConfig.collection))).toEqual([
        {
          property: { validationResult: ValidatorTypes.Valid, value: { label: 'house', value: 1 } },
          range: { validationResult: ValidatorTypes.Valid, value: 3600 }, // Was undefined in previous test due to mismatch/order, now evaluated correctly
          title: { validationResult: ValidatorTypes.Valid, value: { label: 'Min Estimated Annual Cash Flow', value: 0 } },
        },
        {
          property: { validationResult: ValidatorTypes.Valid, value: { label: 'house', value: 1 } },
          range: { validationResult: ValidatorTypes.Valid, value: 60000 },
          title: { validationResult: ValidatorTypes.Valid, value: { label: 'Max Estimated Out Of Pocket', value: 3 } },
        },
        {
          property: { validationResult: ValidatorTypes.Valid, value: { label: 'apartment', value: 0 } },
          range: { validationResult: ValidatorTypes.Optional, value: undefined },
          title: { validationResult: ValidatorTypes.Valid, value: { label: 'Min Estimated Annual Cash Flow', value: 0 } },
        },
      ]);
    });
  });
});
