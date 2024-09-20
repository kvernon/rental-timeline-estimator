import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import { getValidationResult } from '../components/rules/getValidationResult';
import { IPropertiesInformationPropsEvent } from '../views/IPropertiesInformationProps';
import { IPropertyInformationParams } from '../components/validators/IPropertyInformationParams';

export function validatePropertyInfo(required: boolean, propertyInfo: IPropertyInformationParams): ValidatorTypes {
  const validationResults = [
    propertyInfo.lowestPurchasePrice.validationResult,
    propertyInfo.highestPurchasePrice.validationResult,
    propertyInfo.lowestCashFlow.validationResult,
    propertyInfo.highestCashFlow.validationResult,
    propertyInfo.lowestGenerationAmount.validationResult,
    propertyInfo.highestGenerationAmount.validationResult,
    propertyInfo.lowestEquityCapturePercent.validationResult,
    propertyInfo.highestEquityCapturePercent.validationResult,
  ].sort();

  return getValidationResult(validationResults, required);
}

export function validatePropertiesInfo(required: boolean, propertiesInfo: IPropertiesInformationPropsEvent): ValidatorTypes {
  const results = [validatePropertyInfo(required, propertiesInfo.house), validatePropertyInfo(required, propertiesInfo.apartment)].sort();
  return getValidationResult(results, required);
}
