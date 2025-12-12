import React from 'react';
import { IEntityExistence } from '@cubedelement.com/realty-investor-timeline/dist/src/properties/i-entity-existence';

export const DateAvailable = jest.fn(({ availableEndDate, availableStartDate }: IEntityExistence): React.ReactNode => {
  return (
    <div data-testid="date-available">
      <div>{availableEndDate.toDateString()}</div>
      <div>{availableStartDate.toDateString()}</div>
    </div>
  );
});
