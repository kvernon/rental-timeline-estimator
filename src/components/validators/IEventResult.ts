import { ValidatorTypes } from './ValidatorTypes';

export interface IEventResult<T> {
  validationResult: ValidatorTypes;
  value?: T;
}
