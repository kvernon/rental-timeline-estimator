import React from 'react';
import { IEntityExistence } from '@cubedelement.com/realty-investor-timeline/dist/src/properties/i-entity-existence';

export const MonthsListed = jest.fn(({ availableEndDate, availableStartDate }: IEntityExistence): React.ReactNode => {
  return (
    <div data-testid="months-listed">
      <div>{availableEndDate.toDateString()}</div>
      <div>{availableStartDate.toDateString()}</div>
    </div>
  );
});
