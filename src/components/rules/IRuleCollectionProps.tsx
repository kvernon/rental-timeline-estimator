import { ValidatorStackTypes } from '../validators/ValidatorStackTypes';
import { IRuleStackEntity } from './IRuleStackEntity';
import { IFieldTypeProperties } from './IFieldTypeProperties';

export interface IRuleCollectionProps {
  id: string;
  title: string;
  validationType: ValidatorStackTypes;
  possibleChoices: IRuleStackEntity[];
  activeChoices?: IFieldTypeProperties[];
  onChange?: (results: IFieldTypeProperties[]) => void;
}
