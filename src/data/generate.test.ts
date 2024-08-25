import { HoldRuleTypes, ISimulateOptions, PropertyType, PurchaseRuleTypes, simulate } from '@cubedelement.com/realty-investor-timeline';
import { IRuleValues } from '../components/rules/IRuleValues';
import { IEventResult } from '../components/validators/IEventResult';
import { ISelectOption } from '../components/core/ISelectOption';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import { getValidationResult } from '../components/rules/getValidationResult';
import { generate } from './generate';
import { getPurchaseRuleType } from './getPurchaseRuleType';
import { getHoldRuleType } from './getHoldRuleType';

jest.mock('@cubedelement.com/realty-investor-timeline');
jest.mock('../components/rules/getValidationResult');
jest.mock('../data/getPurchaseRuleType');
jest.mock('../data/getHoldRuleType');

describe('generate unit tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('and all data', () => {
    test('should call', () => {
      jest.mocked(getValidationResult).mockReturnValue(ValidatorTypes.Valid);
      jest.mocked(getPurchaseRuleType).mockReturnValue(PurchaseRuleTypes.MinAskingPrice);
      jest.mocked(getHoldRuleType).mockReturnValue(HoldRuleTypes.MinSellInYears);

      const userInfo: {
        purchaseRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
        holdRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
        amountInSavings: IEventResult<number | undefined>;
        monthlySavedAmount: IEventResult<number | undefined>;
        monthlyIncomeAmountGoal: IEventResult<number | undefined>;
      } = {
        purchaseRules: [
          {
            title: {
              value: { value: 1, label: PurchaseRuleTypes.MinAskingPrice },
              validationResult: ValidatorTypes.Valid,
            },
            property: { value: { value: 1, label: 'house' }, validationResult: ValidatorTypes.Valid },
            range: { value: 8, validationResult: ValidatorTypes.Valid },
          },
        ],
        holdRules: [
          {
            title: {
              value: { value: 1, label: HoldRuleTypes.MinSellIfHighEquityPercent },
              validationResult: ValidatorTypes.Valid,
            },
            property: { value: { value: 0, label: 'apartment' }, validationResult: ValidatorTypes.Valid },
            range: { value: 18, validationResult: ValidatorTypes.Valid },
          },
        ],
        amountInSavings: { value: 1, validationResult: ValidatorTypes.Valid },
        monthlySavedAmount: { value: 2, validationResult: ValidatorTypes.Valid },
        monthlyIncomeAmountGoal: { value: 3, validationResult: ValidatorTypes.Valid },
      };

      generate(userInfo);

      const expected: ISimulateOptions = {
        purchaseRules: [
          {
            value: 8,
            type: PurchaseRuleTypes.MinAskingPrice,
            propertyType: PropertyType.SingleFamily,
          },
        ],
        holdRules: [
          {
            value: 18,
            type: HoldRuleTypes.MinSellInYears,
            propertyType: PropertyType.PassiveApartment,
          },
        ],
        loanSettings: [],
        amountInSavings: userInfo.amountInSavings.value as number,
        monthlyIncomeAmountGoal: userInfo.monthlyIncomeAmountGoal.value as number,
        monthlySavedAmount: userInfo.monthlySavedAmount.value as number,
      };

      expect(simulate).toHaveBeenCalledWith(expected);
    });
  });

  describe('and invalid data', () => {
    test('should call', () => {
      jest.mocked(getValidationResult).mockReturnValue(ValidatorTypes.Invalid);

      const userInfo: {
        purchaseRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
        holdRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
        amountInSavings: IEventResult<number | undefined>;
        monthlySavedAmount: IEventResult<number | undefined>;
        monthlyIncomeAmountGoal: IEventResult<number | undefined>;
      } = {
        purchaseRules: [],
        holdRules: [],
        amountInSavings: { value: 1, validationResult: ValidatorTypes.Invalid },
        monthlySavedAmount: { value: 2, validationResult: ValidatorTypes.Invalid },
        monthlyIncomeAmountGoal: { value: 3, validationResult: ValidatorTypes.Invalid },
      };

      expect(() => generate(userInfo)).toThrow(new Error('data is invalid'));
    });
  });
});
