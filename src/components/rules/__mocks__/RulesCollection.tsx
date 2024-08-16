import React from 'react';
import { IRulesCollectionProps } from '../IRulesCollectionProps';
import { IRuleValues } from '../IRuleValues';
import { IEventResult } from '../../validators/IEventResult';
import { ISelectOption } from '../../core/ISelectOption';

export const RulesCollection = jest.fn((componentProps: IRulesCollectionProps) => {
  return (
    <div
      aria-label={componentProps.title}
      onClick={() => {
        if (componentProps.onChange) {
          let inputData: IRuleValues<IEventResult<ISelectOption>, IEventResult<number>>[] = [];

          if (componentProps.values.length > 1) {
            // used to force a return
            inputData = [componentProps.values[1], componentProps.values[0]];
          }

          componentProps.onChange(inputData);
        }
      }}
    />
  );
});
