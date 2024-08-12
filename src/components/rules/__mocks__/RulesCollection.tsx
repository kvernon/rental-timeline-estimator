import React from 'react';
import { IRulesCollectionProps } from '../IRulesCollectionProps';

export const RulesCollection = jest.fn((componentProps: IRulesCollectionProps) => {
  return (
    <div
      aria-label={componentProps.title}
      onClick={() => {
        if (componentProps.onChange) componentProps.onChange(componentProps.values);
      }}
    />
  );
});
