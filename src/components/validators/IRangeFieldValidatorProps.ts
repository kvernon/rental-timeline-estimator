import { IRangeFieldValidatorEvent } from './IRangeFieldValidatorEvent';
import { FontGroups } from '../../theming/fontGroups';

export interface IRangeFieldValidatorProps extends IRangeFieldValidatorEvent {
  direction?: 'row' | 'column';
  hasSpinner?: boolean;
  inputFontGroup?: FontGroups;
  inputLabelFontGroup?: FontGroups;
  onChange?: (inputData: IRangeFieldValidatorEvent) => void;
  prefix?: string;
  showTitle?: boolean;
  suffix?: string;
  title: string;
  useTransparent?: boolean;
  useUnderlineOnly?: boolean;
}
