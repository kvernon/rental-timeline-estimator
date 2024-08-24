import { ValidatorTypes } from './ValidatorTypes';

export interface IEventValue<T> {
  value: T;
}

export interface IEventResult<T> extends IEventValue<T> {
  validationResult: ValidatorTypes;
}
