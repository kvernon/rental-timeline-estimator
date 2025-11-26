import React from 'react';
import { ValidatorTypes } from '../../validators/ValidatorTypes';

export const GoalPanelDataSummary = jest.fn((props: { data: number; validationType: ValidatorTypes }) => {
  return (
    <div aria-label="Goal Panel Data Summary">
      <span>{props.data}</span>
      <span>{props.validationType}</span>
    </div>
  );
});
