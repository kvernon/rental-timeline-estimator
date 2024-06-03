import { ValidatorTypes } from './ValidatorTypes';

export interface IEventResult<T> {
  id?: string;
  validationResult: ValidatorTypes;
  validationResultName: string;
  value?: T;
}
