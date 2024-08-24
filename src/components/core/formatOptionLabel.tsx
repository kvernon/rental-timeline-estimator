import { IPropertyDropDownOption } from './IPropertyDropDownOption';
import React, { ReactNode } from 'react';
import { PropertyImage } from './PropertyImage';

export const formatOptionLabel = (data: IPropertyDropDownOption): ReactNode => {
  return <PropertyImage src={data.image} alt={data.label} title={data.label} />;
};
