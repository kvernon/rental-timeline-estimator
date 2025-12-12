import React from 'react';
import { PropertyType } from '@cubedelement.com/realty-investor-timeline';
import { OwnershipType } from '../OwnershipType';

export const PropertyIcon = jest.fn((props: { propertyType: PropertyType; status: OwnershipType; address: string }): React.ReactNode => {
  return (
    <div data-testid="property-icon">
      <div>{props.address}</div>
      <div>{props.status}</div>
      <div>{PropertyType[props.propertyType]}</div>
    </div>
  );
});
