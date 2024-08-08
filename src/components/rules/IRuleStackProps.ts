import React from 'react';
import { IEventResult } from '../validators/IEventResult';
import { ISelectOption } from '../core/ISelectOption';
import { IRuleStackEntity } from './IRuleStackEntity';

export interface IRuleStackProps {
  index: number;
  style?: React.CSSProperties;
  value: {
    title: IEventResult<ISelectOption>;
    property: IEventResult<ISelectOption>;
    range: IEventResult<number>;
  };
  ruleStackValues: IRuleStackEntity[];
  required?: boolean;
  removeClick?: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onUpdate?: (evt: { title: IEventResult<ISelectOption>; property: IEventResult<ISelectOption>; range: IEventResult<number> }) => void;
}
