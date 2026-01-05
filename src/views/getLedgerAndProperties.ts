import { NullableTimeline } from '../redux/timelineSlice';
import { LedgerItem } from '@cubedelement.com/realty-investor-timeline';
import { IHistoricalProperty } from '@cubedelement.com/realty-investor-timeline/dist/src/time/i-historical-property';
import { getPaddedDateRange } from './getPaddedDateRange';

export function getLedgerAndProperties(
  timeline: NullableTimeline,
  activeMonth: { year: number; month: number } | null,
): {
  ledgerItems: { ledger: LedgerItem; isActive: boolean }[];
  properties: { property: IHistoricalProperty; status: string; isActive: boolean }[];
} {
  if (!timeline || !activeMonth) return { ledgerItems: [], properties: [] };

  const currentDate = new Date(Date.UTC(activeMonth.year, activeMonth.month, 1));
  const [startEarly, endLate] = getPaddedDateRange(currentDate);

  let ledgerItems: { ledger: LedgerItem; isActive: boolean }[] = [];
  let properties: { property: IHistoricalProperty; status: string; isActive: boolean }[] = [];

  ledgerItems = timeline.user.ledgerCollection
    .filter((l) => {
      return l.created! >= startEarly && l.created! <= endLate;
    })
    .map((l) => {
      return { ledger: l, isActive: l.dateMatchesYearAndMonth(currentDate) };
    });

  const owned = 'OWNED';

  properties = timeline.rentals
    .map((r) => {
      let status = 'AVAILABLE';
      if (r.property.purchaseDate && currentDate >= r.property.purchaseDate) status = owned;
      if (r.property.soldDate && currentDate >= r.property.soldDate) status = 'SOLD';
      const start = new Date(r.property.availableStartDate);
      const end = new Date(r.property.availableEndDate);
      return { property: r, status, isActive: currentDate >= start && currentDate <= end };
    })
    .filter((r) => {
      const start = new Date(r.property.property.availableStartDate);
      const end = new Date(r.property.property.availableEndDate);

      return (start <= endLate && end >= startEarly) || r.status === owned;
    });

  return { ledgerItems, properties };
}
