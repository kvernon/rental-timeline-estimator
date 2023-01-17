import { ValidatorStackTypes } from './ValidatorStackTypes';
import { IEventResult } from './IEventResult';

export interface IRangeFieldValidatorChange {
  onChange?: (evt: IEventResult) => void;
}

export interface IRangeFieldValidatorProps extends IRangeFieldValidatorChange {
  direction?: 'row' | 'column';
  id: string;
  stackId: string;
  title?: string;
  prefix?: string;
  suffix?: string;
  validationType: ValidatorStackTypes;
  /**
   * will default to 0
   */
  min?: number;

  /**
   * will default to 100
   */
  max?: number;

  /**
   * will default to 0
   */
  defaultValue?: number;
}
