import { validatePropertyInfo, validatePropertiesInfo } from './validatePropertiesInfo';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import type { IPropertyInformationParams } from '../components/validators/IPropertyInformationParams';
import type { IPropertiesInformationPropsEvent } from '../views/IPropertiesInformationProps';

jest.mock('../components/rules/hooks/getValidationResult', () => ({
  getValidationResult: jest.fn((values: number[], required: boolean) => {
    return required && values.includes(ValidatorTypes.Invalid) ? ValidatorTypes.Invalid : ValidatorTypes.Valid;
  }),
}));

const makePropInfo = (overrides?: Partial<IPropertyInformationParams>): IPropertyInformationParams => ({
  title: 'X',
  propertyType: 1 as any,
  lowestPurchasePrice: { value: 1, validationResult: ValidatorTypes.Valid },
  highestPurchasePrice: { value: 2, validationResult: ValidatorTypes.Valid },
  lowestCashFlow: { value: 3, validationResult: ValidatorTypes.Valid },
  highestCashFlow: { value: 4, validationResult: ValidatorTypes.Valid },
  lowestGenerationAmount: { value: 5, validationResult: ValidatorTypes.Valid },
  highestGenerationAmount: { value: 6, validationResult: ValidatorTypes.Valid },
  lowestEquityCapturePercent: { value: 7, validationResult: ValidatorTypes.Valid },
  highestEquityCapturePercent: { value: 8, validationResult: ValidatorTypes.Valid },
  lowestMinSellInYears: { value: 1, validationResult: ValidatorTypes.Valid },
  highestMinSellInYears: { value: 2, validationResult: ValidatorTypes.Valid },
  lowestAppreciationValue: { value: 10, validationResult: ValidatorTypes.Valid },
  highestAppreciationValue: { value: 20, validationResult: ValidatorTypes.Valid },
  ...overrides,
});

describe('validatePropertiesInfo', () => {
  test('validatePropertyInfo returns Valid when all fields are valid', () => {
    const result = validatePropertyInfo(true, makePropInfo());
    expect(result).toBe(ValidatorTypes.Valid);
  });

  test('validatePropertyInfo returns Invalid when any is invalid and required', () => {
    const result = validatePropertyInfo(true, makePropInfo({ highestCashFlow: { value: 4, validationResult: ValidatorTypes.Invalid } }));
    expect(result).toBe(ValidatorTypes.Invalid);
  });

  test('validatePropertiesInfo aggregates house and apartment', () => {
    const props: IPropertiesInformationPropsEvent = {
      house: makePropInfo(),
      apartment: makePropInfo({ lowestPurchasePrice: { value: 1, validationResult: ValidatorTypes.Invalid } }),
    };
    const result = validatePropertiesInfo(true, props);
    expect(result).toBe(ValidatorTypes.Invalid);
  });
});
