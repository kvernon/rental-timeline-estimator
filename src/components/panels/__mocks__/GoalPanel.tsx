import React from 'react';

import { IRangeFieldValidatorProps } from '../../validators/IRangeFieldValidatorProps';

export const GoalPanel = jest.fn((props: IRangeFieldValidatorProps) => {
  return <div aria-label={'Goal Panel'} />;
});
