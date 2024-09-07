import React from 'react';
import { IPropertyInformationParams } from '../IPropertyInformationParams';

export const PropertyInformation = jest.fn((p: IPropertyInformationParams) => {
  return <div aria-label={p.title}></div>;
});
