import { IRuleStackProps } from '../RuleStack';
import React from 'react';

export const RuleStack = jest.fn((p: IRuleStackProps) => {
  return (
    <div {...p} style={{ height: '50px', width: '50px' }}>
      <span data-movable-handle="true">handle</span>
      <div
        onClick={(e) => {
          if (p.removeClick) {
            p?.removeClick(e);
          }
        }}
      >
        delete button
      </div>
    </div>
  );
});
