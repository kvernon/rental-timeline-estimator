import { ValidatorStackTypes } from './ValidatorStackTypes';
import { IRangeFieldValidatorChange } from './IRangeFieldValidatorChange';
import { FontGroups } from '../../theming/fontGroups';

export interface IRangeFieldValidatorProps extends IRangeFieldValidatorChange {
  inputFontGroup?: FontGroups;
  inputLabelFontGroup?: FontGroups;
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

  hasSpinner?: boolean;

  useUnderlineOnly?: boolean;

  useTransparent?: boolean;
}
