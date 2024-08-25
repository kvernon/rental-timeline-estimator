import { IRuleValues } from '../components/rules/IRuleValues';
import { IEventResult } from '../components/validators/IEventResult';
import { ISelectOption } from '../components/core/ISelectOption';
import { getValidationResult } from '../components/rules/getValidationResult';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import { PropertyType, simulate } from '@cubedelement.com/realty-investor-timeline';
import { getPurchaseRuleType } from './getPurchaseRuleType';
import { getHoldRuleType } from './getHoldRuleType';
import { LoanSettings } from '@cubedelement.com/realty-investor-timeline/dist/src/loans/loan-settings';

export function generate(userInfo: {
  purchaseRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
  holdRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
  amountInSavings: IEventResult<number | undefined>;
  monthlySavedAmount: IEventResult<number | undefined>;
  monthlyIncomeAmountGoal: IEventResult<number | undefined>;
}) {
  if (
    getValidationResult(
      [userInfo.monthlySavedAmount.validationResult, userInfo.monthlyIncomeAmountGoal.validationResult, userInfo.amountInSavings.validationResult],
      true,
    ) === ValidatorTypes.Invalid
  ) {
    throw new Error('data is invalid');
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
    amountInSavings: userInfo.amountInSavings.value as number,
    monthlyIncomeAmountGoal: userInfo.monthlyIncomeAmountGoal.value as number,
    monthlySavedAmount: userInfo.monthlySavedAmount.value as number,
  });
}
