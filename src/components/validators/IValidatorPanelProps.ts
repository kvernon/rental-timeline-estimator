import { ValidatorStackTypes } from './ValidatorStackTypes';
import React from 'react';
import { IRangeFieldValidatorProps } from './IRangeFieldValidatorProps';
export interface IValidatorPanelProps {
  id: string;
  panelValidatorStackType: ValidatorStackTypes;
  children: React.ReactElement<IRangeFieldValidatorProps>[] | React.ReactElement<IRangeFieldValidatorProps>;
}
