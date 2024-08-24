import { IRangeFieldValidatorEvent } from './IRangeFieldValidatorEvent';
import { FontGroups } from '../../theming/fontGroups';
import { IEventResult, IEventValue } from './IEventResult';

export interface IRangeFieldValidatorProps extends IRangeFieldValidatorEvent<IEventResult<number | undefined>> {
  direction?: 'row' | 'column';
  hasSpinner?: boolean;
  inputFontGroup?: FontGroups;
  inputLabelFontGroup?: FontGroups;
  onChange?: (inputData: IRangeFieldValidatorEvent<IEventValue<number | undefined>>) => void;
  prefix?: string;
  showTitle?: boolean;
  suffix?: string;
  title: string;
  useTransparent?: boolean;
  useUnderlineOnly?: boolean;
}
