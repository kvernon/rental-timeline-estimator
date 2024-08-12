import React from 'react';
import { IEventResult } from '../validators/IEventResult';
import { ISelectOption } from '../core/ISelectOption';
import { IRuleStackEntity } from './IRuleStackEntity';
import { IRuleValuesResult } from './IRuleValuesResult';
import { IRuleValues } from './IRuleValues';

export interface IRuleStackProps {
  index: number;
  style?: React.CSSProperties;
  value: IRuleValuesResult;
  ruleStackValues: IRuleStackEntity[];
  required?: boolean;
  removeClick?: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onUpdate?: (evt: IRuleValues) => void;
}
