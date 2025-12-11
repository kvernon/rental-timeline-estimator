import { IEntityExistence } from '@cubedelement.com/realty-investor-timeline/dist/src/properties/i-entity-existence';
import { Stack } from '../core/Stack';
import { getExactMonthDifference } from './getExactMonthDifference';

export function MonthsListed({ availableEndDate, availableStartDate }: IEntityExistence) {
  const exactMonthDifference = getExactMonthDifference(availableEndDate, availableStartDate);
  const text = exactMonthDifference === 1 ? 'Month Listed' : 'Months Listed';
  return (
    <Stack paddingLeft={'10px'} style={{ fontSize: '10pt' }}>
      {exactMonthDifference} {text}
    </Stack>
  );
}
