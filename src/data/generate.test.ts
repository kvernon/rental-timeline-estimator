import { HoldRuleTypes, ISimulateOptions, PropertyType, PurchaseRuleTypes, simulate } from '@cubedelement.com/realty-investor-timeline';
import { IRuleValues } from '../components/rules/IRuleValues';
import { IEventResult } from '../components/validators/IEventResult';
import { ISelectOption } from '../components/core/ISelectOption';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import { generate } from './generate';
import { getPurchaseRuleType } from './getPurchaseRuleType';
import { getHoldRuleType } from './getHoldRuleType';
import { LoanSettings } from '@cubedelement.com/realty-investor-timeline/dist/src/loans/loan-settings';
import { validateUserInfo } from './validateUserInfo';
import { IUserInfo } from './IUserInfo';

jest.mock('@cubedelement.com/realty-investor-timeline');
jest.mock('../data/validateUserInfo');
jest.mock('../data/getPurchaseRuleType');
jest.mock('../data/getHoldRuleType');

describe('generate unit tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('and all data', () => {
    test('should call', () => {
      jest.mocked(validateUserInfo).mockReturnValue(ValidatorTypes.Valid);
      jest.mocked(getPurchaseRuleType).mockReturnValue(PurchaseRuleTypes.MinAskingPrice);
      jest.mocked(getHoldRuleType).mockReturnValue(HoldRuleTypes.MinSellInYears);

      const userInfo: IUserInfo = {
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
        savedAtStart: { value: 1, validationResult: ValidatorTypes.Valid },
        moSavings: { value: 2, validationResult: ValidatorTypes.Valid },
        goal: { value: 3, validationResult: ValidatorTypes.Valid },
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
        loanSettings: [
          {
            value: 7,
            propertyType: PropertyType.SingleFamily,
            name: LoanSettings.LoanRatePercent,
          },
          { value: 30, propertyType: PropertyType.SingleFamily, name: LoanSettings.LoanTermInYears },
          {
            value: 25000,
            propertyType: PropertyType.PassiveApartment,
            name: LoanSettings.MinimumMonthlyReservesForRental,
          },
        ],
        amountInSavings: userInfo.savedAtStart.value as number,
        monthlyIncomeAmountGoal: userInfo.goal.value as number,
        monthlySavedAmount: userInfo.moSavings.value as number,
        generatorOptionsPassiveApartment: {
          highestCashFlow: 500,
          highestEquityCapturePercent: 15,
          highestMinSellInYears: 1,
          highestPurchasePrice: 200000,
          highestSellAppreciationPercent: 7,
          lowestCashFlow: 200,
          lowestEquityCapturePercent: 7,
          lowestMinSellInYears: 1,
          lowestPurchasePrice: 150000,
          lowestSellAppreciationPercent: 5,
          maxRentalOpportunities: 6,
        },
        generatorOptionsSingleFamily: {
          highestCashFlow: 550,
          highestEquityCapturePercent: 15,
          highestMinSellInYears: 1,
          highestPurchasePrice: 250000,
          highestSellAppreciationPercent: 7,
          lowestCashFlow: 200,
          lowestEquityCapturePercent: 7,
          lowestMinSellInYears: 1,
          lowestPurchasePrice: 150000,
          lowestSellAppreciationPercent: 5,
          maxRentalOpportunities: 4,
        },
      };

      expect(simulate).toHaveBeenCalledWith(expected);
    });
  });

  describe('and invalid data', () => {
    test('should call', () => {
      jest.mocked(validateUserInfo).mockReturnValue(ValidatorTypes.Invalid);

      const userInfo: IUserInfo = {
        purchaseRules: [],
        holdRules: [],
        savedAtStart: { value: 1, validationResult: ValidatorTypes.Invalid },
        moSavings: { value: 2, validationResult: ValidatorTypes.Invalid },
        goal: { value: 3, validationResult: ValidatorTypes.Invalid },
      };

      expect(generate(userInfo)).toEqual(null);
    });
  });
});
