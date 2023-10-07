import { ValidatorStackTypes } from './ValidatorStackTypes';
import { IRangeFieldValidatorBlur } from './IRangeFieldValidatorBlur';

export interface IRangeFieldValidatorProps extends IRangeFieldValidatorBlur {
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
