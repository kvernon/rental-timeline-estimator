import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
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
  sx?: SxProps<Theme>;
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
