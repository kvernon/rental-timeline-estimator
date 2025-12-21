import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import { ITimeline, PropertyType, simulate } from '@cubedelement.com/realty-investor-timeline';
import { getPurchaseRuleType } from './getPurchaseRuleType';
import { getHoldRuleType } from './getHoldRuleType';
import { LoanSettings } from '@cubedelement.com/realty-investor-timeline/dist/src/loans/loan-settings';
import { validateUserInfo } from './validateUserInfo';
import { IUserInfo } from './IUserInfo';
import { IPropertiesInformationPropsEvent } from '../views/IPropertiesInformationProps';
import { validatePropertiesInfo } from './validatePropertiesInfo';
import { ISettings } from './ISettings';

/**
 *
 * @param userInfo
 * @param propertiesInfo
 * @param settings
 * @throws Error
 */
export function generate(userInfo: IUserInfo, propertiesInfo: IPropertiesInformationPropsEvent, settings: ISettings): ITimeline {
  if (validateUserInfo(true, userInfo) === ValidatorTypes.Invalid || validatePropertiesInfo(true, propertiesInfo) === ValidatorTypes.Invalid) {
    throw new Error('Either UserInformation or PropertyInformation are invalid');
  }

  return simulate({
    maxYears: settings.maxYears.value,
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
        value: settings.singleFamilyLoanRatePercent.value,
        propertyType: PropertyType.SingleFamily,
        name: LoanSettings.LoanRatePercent,
      },
      {
        value: settings.singleFamilyLoanTermInYears.value,
        propertyType: PropertyType.SingleFamily,
        name: LoanSettings.LoanTermInYears,
      },
      {
        value: settings.passiveApartmentsMinimumMonthlyReservesForRental.value,
        propertyType: PropertyType.PassiveApartment,
        name: LoanSettings.MinimumMonthlyReservesForRental,
      },
    ],
    amountInSavings: userInfo.savedAtStart.value,
    monthlyIncomeAmountGoal: userInfo.goal.value,
    monthlySavedAmount: userInfo.moSavings.value,
    generatorOptionsSingleFamily: {
      lowestMinSellInYears: propertiesInfo.house.lowestMinSellInYears.value,
      highestMinSellInYears: propertiesInfo.house.highestMinSellInYears.value,
      lowestPurchasePrice: propertiesInfo.house.lowestPurchasePrice.value,
      highestPurchasePrice: propertiesInfo.house.highestPurchasePrice.value,
      lowestSellAppreciationPercent: propertiesInfo.house.lowestAppreciationValue.value,
      highestSellAppreciationPercent: propertiesInfo.house.highestAppreciationValue.value,
      lowestCashFlow: propertiesInfo.house.lowestCashFlow.value,
      highestCashFlow: propertiesInfo.house.highestCashFlow.value,
      lowestEquityCapturePercent: propertiesInfo.house.lowestEquityCapturePercent.value,
      highestEquityCapturePercent: propertiesInfo.house.highestEquityCapturePercent.value,
      maxRentalOpportunities: propertiesInfo.house.highestGenerationAmount.value,
      maxMonthsToCache: propertiesInfo.house.maxMonthsToCache.value,
    },
    generatorOptionsPassiveApartment: {
      lowestMinSellInYears: propertiesInfo.apartment.lowestMinSellInYears.value,
      highestMinSellInYears: propertiesInfo.apartment.highestMinSellInYears.value,
      lowestPurchasePrice: propertiesInfo.apartment.lowestPurchasePrice.value,
      highestPurchasePrice: propertiesInfo.apartment.highestPurchasePrice.value,
      lowestSellAppreciationPercent: propertiesInfo.apartment.lowestAppreciationValue.value,
      highestSellAppreciationPercent: propertiesInfo.apartment.highestAppreciationValue.value,
      lowestCashFlow: propertiesInfo.apartment.lowestCashFlow.value,
      highestCashFlow: propertiesInfo.apartment.highestCashFlow.value,
      lowestEquityCapturePercent: propertiesInfo.apartment.lowestEquityCapturePercent.value,
      highestEquityCapturePercent: propertiesInfo.apartment.highestEquityCapturePercent.value,
      maxRentalOpportunities: propertiesInfo.apartment.highestGenerationAmount.value,
      maxMonthsToCache: propertiesInfo.apartment.maxMonthsToCache.value,
    },
  });
}
