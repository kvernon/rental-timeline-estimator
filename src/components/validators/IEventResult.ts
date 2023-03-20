import { ValidatorTypes } from './ValidatorTypes';

export interface IEventResult<T> {
  validationResult: ValidatorTypes;
  validationResultName: string;
  value?: T;
}
