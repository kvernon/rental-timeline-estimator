import { ValidatorStackTypes } from './ValidatorStackTypes';
import React from 'react';
import { IRangeFieldValidatorChange } from './IRangeFieldValidatorProps';
export interface IValidatorPanelProps {
  id: string;
  panelValidatorStackType: ValidatorStackTypes;
  children: React.ReactElement<IRangeFieldValidatorChange>[] | React.ReactElement<IRangeFieldValidatorChange>;
}
