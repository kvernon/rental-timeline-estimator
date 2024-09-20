import { IEventResult } from './IEventResult';

export type ConditionalNumber<B extends boolean> = B extends true ? number : number | undefined;
export type ConditionEventResult<B extends boolean, T> = B extends true ? IEventResult<T> : IEventResult<T> | undefined;

export interface IRangeFieldValidatorEvent<Required extends boolean = false> {
  id: string;

  /**
   * will default to 100
   */
  max?: number;
  /**
   * will default to 0
   */
  min?: number;

  required?: Required;

  value: ConditionEventResult<Required, ConditionalNumber<Required>>;
}
