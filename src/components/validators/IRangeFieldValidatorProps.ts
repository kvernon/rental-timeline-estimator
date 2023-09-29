import { ValidatorStackTypes } from './ValidatorStackTypes';
import { IEventResult } from './IEventResult';

export interface IRangeFieldValidatorBlur {
  onBlur?: (evt: IEventResult<number>) => void;
}

export interface IRangeFieldValidatorProps extends IRangeFieldValidatorBlur {
  id: string;
  validationType: ValidatorStackTypes;
  direction?: 'row' | 'column';
  title?: string;
  prefix?: string;
  suffix?: string;
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
