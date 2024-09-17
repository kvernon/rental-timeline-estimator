import { PropertyType } from '@cubedelement.com/realty-investor-timeline';
import { ConditionalNumber, ConditionEventResult } from './IRangeFieldValidatorEvent';

export interface IPropertyInformationParams {
  title: string;
  propertyType: Omit<PropertyType, PropertyType.None>;
  lowestPurchasePrice: ConditionEventResult<true, ConditionalNumber<true>>;
  highestPurchasePrice: ConditionEventResult<true, ConditionalNumber<true>>;
  lowestCashFlow: ConditionEventResult<true, ConditionalNumber<true>>;
  highestCashFlow: ConditionEventResult<true, ConditionalNumber<true>>;
  lowestEquityCapturePercent: ConditionEventResult<true, ConditionalNumber<true>>;
  highestEquityCapturePercent: ConditionEventResult<true, ConditionalNumber<true>>;
  lowestGenerationAmount: ConditionEventResult<true, ConditionalNumber<true>>;
  highestGenerationAmount: ConditionEventResult<true, ConditionalNumber<true>>;
}

export interface IPropertyInformationOnChangeParams extends IPropertyInformationParams {
  onChange: (result: IPropertyInformationParams) => void;
}
