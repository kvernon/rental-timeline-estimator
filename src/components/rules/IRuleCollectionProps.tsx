import { ValidatorStackTypes } from '../validators/ValidatorStackTypes';
import { IRuleStackEntity } from './IRuleStackEntity';

export interface IRuleCollectionProps {
  id: string;
  title: string;
  validationType: ValidatorStackTypes;
  possibleChoices: IRuleStackEntity[];
}
