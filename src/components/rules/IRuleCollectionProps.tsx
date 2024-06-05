import { ValidatorStackTypes } from '../validators/ValidatorStackTypes';
import { IRuleStackEntity } from './IRuleStackEntity';
import { IFieldType } from './FormInterfaces';

export interface IRuleCollectionProps {
  id: string;
  title: string;
  validationType: ValidatorStackTypes;
  possibleChoices: IRuleStackEntity[];
  activeChoices?: IFieldType[];
}
