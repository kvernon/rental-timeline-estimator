import { IPropertyInformationParams } from '../components/validators/IPropertyInformationParams';

export interface IPropertiesInformationPropsEvent {
  apartment: IPropertyInformationParams;
  house: IPropertyInformationParams;
}

export interface IPropertiesInformationProps extends IPropertiesInformationPropsEvent {
  onChange: (result: IPropertiesInformationPropsEvent) => void;
}
