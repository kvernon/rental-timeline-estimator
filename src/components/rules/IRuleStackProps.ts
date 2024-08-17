import React from 'react';
import { IRuleStackEntity } from './IRuleStackEntity';
import { IRuleValues } from './IRuleValues';
import { ISelectOption } from '../core/ISelectOption';
import { IEventResult, IEventValue } from '../validators/IEventResult';

export interface IRuleStackProps {
  index: number;
  style?: React.CSSProperties;
  value: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>;
  ruleStackValues: IRuleStackEntity[];
  required?: boolean;
  removeClick?: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onUpdate?: (evt: IRuleValues<IEventValue<ISelectOption>, IEventValue<number | undefined>>) => void;
}
