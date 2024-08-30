import { IRuleValues } from '../components/rules/IRuleValues';
import { IEventResult } from '../components/validators/IEventResult';
import { ISelectOption } from '../components/core/ISelectOption';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import { ITimeline, PropertyType, simulate } from '@cubedelement.com/realty-investor-timeline';
import { getPurchaseRuleType } from './getPurchaseRuleType';
import { getHoldRuleType } from './getHoldRuleType';
import { LoanSettings } from '@cubedelement.com/realty-investor-timeline/dist/src/loans/loan-settings';
import { validateUserInfo } from './validateUserInfo';

/**
 *
 * @param userInfo
 * @throws Error
 */
export function generate(userInfo: {
  purchaseRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
  holdRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
  savedAtStart: IEventResult<number | undefined>;
  moSavings: IEventResult<number | undefined>;
  goal: IEventResult<number | undefined>;
}): null | ITimeline {
  if (validateUserInfo(true, userInfo) === ValidatorTypes.Invalid) {
    return null;
  }

  return simulate({
    purchaseRules: userInfo.purchaseRules.map((x) => ({
      value: x.range.value as number,
      type: getPurchaseRuleType(x.title.value.label),
      propertyType: x.property.value.value === 0 ? PropertyType.PassiveApartment : PropertyType.SingleFamily,
    })),
    holdRules: userInfo.holdRules.map((x) => ({
      value: x.range.value as number,
      type: getHoldRuleType(x.title.value.label),
      propertyType: x.property.value.value === 0 ? PropertyType.PassiveApartment : PropertyType.SingleFamily,
    })),
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
    generatorOptionsSingleFamily: {
      lowestMinSellInYears: 1,
      highestMinSellInYears: 1,
      lowestPurchasePrice: 150000,
      highestPurchasePrice: 250000,
      lowestSellAppreciationPercent: 5,
      highestSellAppreciationPercent: 7,
      lowestCashFlow: 200,
      highestCashFlow: 550,
      lowestEquityCapturePercent: 7,
      highestEquityCapturePercent: 15,
      maxRentalOpportunities: 4,
    },
    generatorOptionsPassiveApartment: {
      lowestMinSellInYears: 1,
      highestMinSellInYears: 1,
      lowestPurchasePrice: 150000,
      highestPurchasePrice: 200000,
      lowestSellAppreciationPercent: 5,
      highestSellAppreciationPercent: 7,
      lowestCashFlow: 200,
      highestCashFlow: 500,
      lowestEquityCapturePercent: 7,
      highestEquityCapturePercent: 15,
      maxRentalOpportunities: 6,
    },
  });
}
