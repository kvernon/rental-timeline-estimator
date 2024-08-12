import React from 'react';
import { IRangeFieldValidatorProps } from '../validators/IRangeFieldValidatorProps';

export interface IRangeValidationPanelProps {
  required?: boolean;
  children: React.ReactElement<IRangeFieldValidatorProps>[] | React.ReactElement<IRangeFieldValidatorProps>;
  title: string;
}
