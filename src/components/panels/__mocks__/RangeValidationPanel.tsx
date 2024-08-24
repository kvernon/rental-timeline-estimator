import React from 'react';

import { IRangeValidationPanelProps } from '../IRangeValidationPanelProps';

export const RangeValidationPanel = (props: IRangeValidationPanelProps) => {
  return <div aria-label={props.title}>{props.children}</div>;
};
