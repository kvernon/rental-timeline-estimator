import { IRangeFieldValidatorEvent } from './IRangeFieldValidatorEvent';
import { FontGroups } from '../../theming/fontGroups';
import { IEventResult, IEventValue } from './IEventResult';

export interface IRangeFieldValidatorProps extends IRangeFieldValidatorEvent<IEventResult<number>> {
  direction?: 'row' | 'column';
  hasSpinner?: boolean;
  inputFontGroup?: FontGroups;
  inputLabelFontGroup?: FontGroups;
  onChange?: (inputData: IRangeFieldValidatorEvent<IEventValue<number>>) => void;
  prefix?: string;
  showTitle?: boolean;
  suffix?: string;
  title: string;
  useTransparent?: boolean;
  useUnderlineOnly?: boolean;
}
