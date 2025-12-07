import React from 'react';

import { IRangeValidationPanelProps } from '../IRangeValidationPanelProps';

export const RangeValidationPanel = <Required extends boolean = false>(props: IRangeValidationPanelProps<Required>) => {
  return (
    <div aria-label={props.title}>
      <span>{props.title}</span>
      {props.children}
    </div>
  );
};
