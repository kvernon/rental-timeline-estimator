import { generate } from './generate';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import type { IUserInfo } from './IUserInfo';
import type { IPropertiesInformationPropsEvent } from '../views/IPropertiesInformationProps';
import type { ISettings } from './ISettings';
import { ISimulateOptions } from '@cubedelement.com/realty-investor-timeline/dist/src/time/simulate';
import { PropertyType } from '@cubedelement.com/realty-investor-timeline';

jest.mock('./validateUserInfo', () => ({
  validateUserInfo: jest.fn(() => ValidatorTypes.Valid),
}));

jest.mock('./validatePropertiesInfo', () => ({
  validatePropertiesInfo: jest.fn(() => ValidatorTypes.Valid),
}));

jest.mock('@cubedelement.com/realty-investor-timeline', () => ({
  __esModule: true,
  PropertyType: { PassiveApartment: 0, SingleFamily: 1 },
  simulate: jest.fn((args: ISimulateOptions) => ({ id: 'timeline', args })),
}));

describe('generate', () => {
  const userInfo: IUserInfo = {
    goal: { value: 2000, validationResult: ValidatorTypes.Valid },
    savedAtStart: { value: 10000, validationResult: ValidatorTypes.Valid },
    moSavings: { value: 500, validationResult: ValidatorTypes.Valid },
    purchaseRules: [
      {
        title: { value: { value: 0, label: 'Buy Every Years' }, validationResult: ValidatorTypes.Valid },
        property: { value: { value: 1, label: 'Single Family' }, validationResult: ValidatorTypes.Valid },
        range: { value: 2, validationResult: ValidatorTypes.Valid },
      },
    ],
    holdRules: [
      {
        title: { value: { value: 0, label: 'Sell In Years' }, validationResult: ValidatorTypes.Valid },
        property: { value: { value: 0, label: 'Passive Apartment' }, validationResult: ValidatorTypes.Valid },
        range: { value: 3, validationResult: ValidatorTypes.Valid },
      },
    ],
  };

  const propertiesInfo: IPropertiesInformationPropsEvent = {
    house: {
      title: 'Home',
      propertyType: PropertyType.SingleFamily,
      lowestPurchasePrice: { value: 100000, validationResult: ValidatorTypes.Valid },
      highestPurchasePrice: { value: 200000, validationResult: ValidatorTypes.Valid },
      lowestCashFlow: { value: 200, validationResult: ValidatorTypes.Valid },
      highestCashFlow: { value: 500, validationResult: ValidatorTypes.Valid },
      lowestEquityCapturePercent: { value: 10, validationResult: ValidatorTypes.Valid },
      highestEquityCapturePercent: { value: 20, validationResult: ValidatorTypes.Valid },
      lowestGenerationAmount: { value: 1, validationResult: ValidatorTypes.Valid },
      highestGenerationAmount: { value: 3, validationResult: ValidatorTypes.Valid },
      lowestMinSellInYears: { value: 2, validationResult: ValidatorTypes.Valid },
      highestMinSellInYears: { value: 5, validationResult: ValidatorTypes.Valid },
      lowestAppreciationValue: { value: 5, validationResult: ValidatorTypes.Valid },
      highestAppreciationValue: { value: 10, validationResult: ValidatorTypes.Valid },
      maxMonthsToCache: { value: 20, validationResult: ValidatorTypes.Valid },
    },
    apartment: {
      title: 'Apartment',
      propertyType: PropertyType.PassiveApartment,
      lowestPurchasePrice: { value: 25000, validationResult: ValidatorTypes.Valid },
      highestPurchasePrice: { value: 500000, validationResult: ValidatorTypes.Valid },
      lowestCashFlow: { value: 100, validationResult: ValidatorTypes.Valid },
      highestCashFlow: { value: 300, validationResult: ValidatorTypes.Valid },
      lowestEquityCapturePercent: { value: 5, validationResult: ValidatorTypes.Valid },
      highestEquityCapturePercent: { value: 7, validationResult: ValidatorTypes.Valid },
      lowestGenerationAmount: { value: 0, validationResult: ValidatorTypes.Valid },
      highestGenerationAmount: { value: 2, validationResult: ValidatorTypes.Valid },
      lowestMinSellInYears: { value: 3, validationResult: ValidatorTypes.Valid },
      highestMinSellInYears: { value: 8, validationResult: ValidatorTypes.Valid },
      lowestAppreciationValue: { value: 12, validationResult: ValidatorTypes.Valid },
      highestAppreciationValue: { value: 25, validationResult: ValidatorTypes.Valid },
      maxMonthsToCache: { value: 30, validationResult: ValidatorTypes.Valid },
    },
  };

  const settings: ISettings = {
    maxYears: { value: 20, validationResult: ValidatorTypes.Valid },
    singleFamilyLoanRatePercent: { value: 7, validationResult: ValidatorTypes.Valid },
    singleFamilyLoanTermInYears: { value: 30, validationResult: ValidatorTypes.Valid },
    passiveApartmentsMinimumMonthlyReservesForRental: { value: 25000, validationResult: ValidatorTypes.Valid },
    singleFamilyMinimumMonthlyReservesForRental: { value: 4, validationResult: ValidatorTypes.Valid },
  };

  test('throws when validations are invalid', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { validateUserInfo } = require('./validateUserInfo');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { validatePropertiesInfo } = require('./validatePropertiesInfo');
    validateUserInfo.mockReturnValueOnce(ValidatorTypes.Invalid);
    expect(() => generate(userInfo, propertiesInfo, settings)).toThrow('Either UserInformation or PropertyInformation are invalid');

    // second invalid path
    validateUserInfo.mockReturnValue(ValidatorTypes.Valid);
    validatePropertiesInfo.mockReturnValueOnce(ValidatorTypes.Invalid);
    expect(() => generate(userInfo, propertiesInfo, settings)).toThrow();
  });

  test('maps inputs correctly and calls simulate with proper payload', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { simulate, PropertyType } = require('@cubedelement.com/realty-investor-timeline');
    const out = generate(userInfo, propertiesInfo, settings);
    expect(simulate).toHaveBeenCalledTimes(1);
    const args: ISimulateOptions = (simulate as jest.Mock).mock.calls[0][0];

    expect(args.maxYears).toBe(20);
    expect(args.amountInSavings).toBe(userInfo.savedAtStart.value);
    expect(args.monthlyIncomeAmountGoal).toBe(userInfo.goal.value);
    expect(args.monthlySavedAmount).toBe(userInfo.moSavings.value);

    // purchase rules map to types and property types
    expect(args.purchaseRules[0]).toEqual({ value: 2, type: 'buyEveryYears', propertyType: PropertyType.SingleFamily });
    expect(args.holdRules[0]).toEqual({ value: 3, type: 'sellInYears', propertyType: PropertyType.PassiveApartment });

    // single family generator options picked from house
    expect(args?.generatorOptionsSingleFamily?.lowestMinSellInYears).toBe(propertiesInfo.house.lowestMinSellInYears.value);
    expect(args?.generatorOptionsPassiveApartment?.lowestPurchasePrice).toBe(propertiesInfo.apartment.lowestPurchasePrice.value);

    expect(out).toEqual({ id: 'timeline', args });
  });
});
