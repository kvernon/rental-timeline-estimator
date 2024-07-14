import { IRuleStackProps } from '../RuleStack';
import React from 'react';

export const RuleStack = jest.fn((p: IRuleStackProps) => {
  const updatedP: Record<string, unknown> = { ...p };
  delete updatedP.defaultIndex;
  delete updatedP.onUpdate;
  delete updatedP.removeClick;
  delete updatedP.ruleStackValues;
  delete updatedP.validationType;

  return (
    <div {...updatedP} style={{ height: '50px', width: '50px' }}>
      <span data-movable-handle="true">handle</span>
      <span>{p.defaultIndex}</span>
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
