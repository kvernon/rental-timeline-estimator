import { ValidatorTypes } from './ValidatorTypes';

export interface IEventResult {
  validationResult: ValidatorTypes;
  validationResultName: string;
  value?: number;
}
