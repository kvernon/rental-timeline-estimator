import { IEventResult } from './IEventResult';

export interface IRangeFieldValidatorEvent {
  id: string;

  /**
   * will default to 100
   */
  max?: number;
  /**
   * will default to 0
   */
  min?: number;

  required?: boolean;

  value?: IEventResult<number>;
}