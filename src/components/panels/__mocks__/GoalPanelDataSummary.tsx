import React from 'react';

export const GoalPanelDataSummary = jest.fn((props: { data: number; isValid: () => boolean }) => {
  return (
    <div aria-label="Goal Panel Data Summary">
      <span>{props.data}</span>
      <span>{props.isValid()}</span>
    </div>
  );
});
