import { ConditionalNumber, ConditionEventResult, IRangeFieldValidatorEvent } from './IRangeFieldValidatorEvent';
import { FontGroups } from '../../theming/fontGroups';

export interface IRangeFieldValidatorProps<Required extends boolean = false> extends IRangeFieldValidatorEvent<Required> {
  direction?: 'row' | 'column';
  hasSpinner?: boolean;
  inputFontGroup?: FontGroups;
  inputLabelFontGroup?: FontGroups;
  onChange?: (inputData: ConditionEventResult<Required, ConditionalNumber<Required>>) => void;
  prefix?: string;
  showTitle?: boolean;
  suffix?: string;
  title: string;
  useTransparent?: boolean;
  useUnderlineOnly?: boolean;
}
