import React from 'react';
import { IRangeFieldValidatorProps } from '../validators/IRangeFieldValidatorProps';

export interface IRangeValidationPanelProps<Required extends boolean> {
  required: Required;
  children: React.ReactElement<IRangeFieldValidatorProps<Required>>[] | React.ReactElement<IRangeFieldValidatorProps<Required>>;
  title: string;
}
