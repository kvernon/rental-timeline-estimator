import { useFormSelector } from '../../redux/hooks';
import { getStartAndEndDate } from '../../redux/timelineSelectors';

export function useYears(): number[] {
  const [startDate, endDate] = useFormSelector(getStartAndEndDate);
  const years: number[] = [];

  if (!startDate || !endDate) return years;

  for (let i = startDate.getFullYear(); i < endDate.getFullYear() + 1; i++) {
    years.push(i);
  }

  return years;
}
