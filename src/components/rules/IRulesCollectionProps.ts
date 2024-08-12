import { IRuleStackEntity } from './IRuleStackEntity';
import { IRuleValues } from './IRuleValues';
import { IRuleValuesResult } from './IRuleValuesResult';

export interface IRulesCollectionProps {
  required?: boolean;
  title: string;
  values: IRuleValuesResult[];
  onChange?: (inputData: IRuleValues[]) => void;
  possibleChoices: IRuleStackEntity[];
}
