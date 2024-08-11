import { IRuleStackProps } from '../IRuleStackProps';
import React from 'react';
import { ValidatorTypes } from '../../validators/ValidatorTypes';

export const RuleStack = jest.fn((p: IRuleStackProps) => {
  const updatedP: Record<string, unknown> = { ...p };
  delete updatedP.defaultIndex;
  delete updatedP.onUpdate;
  delete updatedP.removeClick;
  delete updatedP.ruleStackValues;
  delete updatedP.validationType;

  console.log('Render', p.onUpdate);
  return (
    <div {...updatedP} style={{ height: '50px', width: '50px' }} aria-label={`Rule Number ${p.index}`}>
      <span data-movable-handle="true">handle</span>
      <span>{JSON.stringify(p.value)}</span>
      <input
        type="number"
        aria-label="Rule Range"
        onChange={(e) => {
          if (p.onUpdate) {
            p.onUpdate({
              ...p.value,
              range: {
                value: parseInt(e.target.value),
                validationResult: ValidatorTypes.Valid,
              },
            });
          }
        }}
      />
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
