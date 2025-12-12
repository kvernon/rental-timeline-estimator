import { IEntityExistence } from '@cubedelement.com/realty-investor-timeline/dist/src/properties/i-entity-existence';
import { Stack } from '../core/Stack';
import { getDate } from '../../data/getDate';

export function DateAvailable({ availableEndDate, availableStartDate }: IEntityExistence) {
  return (
    <Stack style={{ textAlign: 'right' }}>
      {getDate(availableStartDate)} - {getDate(availableEndDate)}
    </Stack>
  );
}
