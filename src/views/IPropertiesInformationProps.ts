import { IPropertyInformationParams } from '../components/validators/IPropertyInformationParams';

export interface IPropertiesInformationProps {
  apartment: IPropertyInformationParams;
  house: IPropertyInformationParams;
  onChange: (result: { apartment: IPropertyInformationParams; house: IPropertyInformationParams }) => void;
}
