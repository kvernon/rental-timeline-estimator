import { PropertyType } from '@cubedelement.com/realty-investor-timeline';
import { IEventResult } from './IEventResult';

export interface IPropertyInformationParams {
  title: string;
  propertyType: Omit<PropertyType, PropertyType.None>;
  lowestPurchasePrice: IEventResult<number>;
  highestPurchasePrice: IEventResult<number>;
  lowestCashFlow: IEventResult<number>;
  highestCashFlow: IEventResult<number>;
  lowestEquityCapturePercent: IEventResult<number>;
  highestEquityCapturePercent: IEventResult<number>;
  lowestGenerationAmount: IEventResult<number>;
  highestGenerationAmount: IEventResult<number>;
}
