import { ValidatorStackTypes } from '../validators/ValidatorStackTypes';
import { IRuleStackEntity } from './IRuleStackEntity';
import { IFieldType } from './IFieldType';

export interface IRuleCollectionProps {
  id: string;
  title: string;
  validationType: ValidatorStackTypes;
  possibleChoices: IRuleStackEntity[];
  activeChoices?: IFieldType[];
  onChange?: (results: IFieldType[]) => void;
}
