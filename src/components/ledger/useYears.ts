import { useFormSelector } from '../../redux/hooks';
import { getStartAndEndDate } from '../../redux/timelineSelectors';

export function useYears(): number[] {
  const [startDate, endDate] = useFormSelector(getStartAndEndDate);
  const years: number[] = [];

  if (!startDate || !endDate) {
    return years;
  }

  for (let i = startDate.getUTCFullYear(); i < endDate.getUTCFullYear() + 1; i++) {
    years.push(i);
  }

  return years;
}
