import React from 'react';

export const PanelDataSummary = jest.fn((props: { title: string; data: string }) => {
  return (
    <div aria-label={props.title}>
      <span>{props.title}</span>
      <span>{props.data}</span>
    </div>
  );
});
