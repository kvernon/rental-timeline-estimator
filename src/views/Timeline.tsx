import { useFormSelector } from '../redux/hooks';
import { getTimeline } from '../redux/timelineSelectors';
import { IRentalPropertyEntity, LedgerItem, LedgerItemType } from '@cubedelement.com/realty-investor-timeline';
import { getDate } from '../data/getDate';
import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { currencyFormatter } from '../data/currency-formatter';
import { propertyOptions, propertyOptionsMap } from '../components/validators/PropertyOptions';

function useActiveMonth(year: number, month: number, setActiveMonth: React.Dispatch<React.SetStateAction<{ year: number; month: number } | null>>) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the top of the section hits the top of the viewport
        if (entry.isIntersecting) {
          setActiveMonth({ year, month });
        } else if (entry.boundingClientRect.top > 0) {
          // If the section's top edge moves down below the viewport top (user scrolled up past it)
          setActiveMonth((current) => (current?.year === year && current?.month === month ? null : current));
        }
      },
      // Trigger when the element crosses the line at the very top of the screen
      { rootMargin: '-1px 0px -100% 0px' },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [year, month, setActiveMonth]);

  return ref;
}

const ItemOnOff = styled.div<{ visible: boolean }>`
  color: ${({ visible }) => `#332211${visible ? '' : '11'}`};
  transition: all 0.6s ease;
  width: unset;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

function LedgerItemDisplay({ item, isActive }: { item: LedgerItem; isActive: boolean }) {
  const isAdd = item.type !== LedgerItemType.Purchase;
  const positiveOrNegative = isAdd ? '+' : '-';

  return (
    <ItemOnOff visible={isActive}>
      {positiveOrNegative} {getDate(item.created!)} ${currencyFormatter(item.amount)}
    </ItemOnOff>
  );
}

function LedgerGroup({ items }: { items: { ledger: LedgerItem; isActive: boolean }[] }) {
  return (
    <div>
      {items.map((item, i) => (
        <LedgerItemDisplay key={`${getDate(item.ledger.created!)} ${i}`} item={item.ledger} isActive={item.isActive} />
      ))}
    </div>
  );
}

function PropertyCard({ property, status }: { property: IRentalPropertyEntity; status: string }) {
  const propertyType = propertyOptionsMap.find((x) => x.propertyType === property.propertyType);

  return (
    <div style={{ border: '1px solid #ccc', padding: '8px', float: 'left' }}>
      <div>{property.address}</div>
      <div>
        <img src={`./images/${propertyType?.label}.gif`} alt={propertyType?.label} />
      </div>
      <div>{status}</div>
    </div>
  );
}

const StickyHeader = styled.h2`
  position: sticky;
  top: 0;
  z-index: 100; /* header is always above */
  background: lightgray;
  padding: 12px;
  margin: 0;
`;

function MonthSection({
  year,
  month,
  setActiveMonth,
  minHeight = 200,
}: {
  year: number;
  month: number;
  setActiveMonth: React.Dispatch<React.SetStateAction<{ year: number; month: number } | null>>;
  minHeight?: number;
}) {
  const sectionRef = useActiveMonth(year, month, setActiveMonth);
  const currentDate = new Date(Date.UTC(year, month, 1));

  return (
    <section ref={sectionRef} style={{ minHeight: `${minHeight}px`, transition: 'min-height 0.2s ease-out' }}>
      {/* Sticky header is the only visible element in each section */}
      <StickyHeader>{getDate(currentDate)}</StickyHeader>
    </section>
  );
}

const DataLayer = styled.div`
  /* No longer fixed, flows inside the wrapper */
  padding: 12px;
  width: 45%;
  margin-left: 50px;
  display: inline-block;
  vertical-align: top;
`;

const DataLayerProperty = styled(DataLayer)`
  margin-left: 5%; /* Spacing between columns */
`;

const FixedWrapper = styled.div`
  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  z-index: 50;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  pointer-events: none;
`;

export function Timeline() {
  const timeline = useFormSelector(getTimeline);
  const [activeMonth, setActiveMonth] = useState<{ year: number; month: number } | null>(null);
  const [wrapperHeight, setWrapperHeight] = useState(0);

  // Use a callback ref to attach the ResizeObserver immediately when the node enters the DOM
  // Note: For production-grade cleanup, storing observer in a useRef and disconnecting in this callback when node is null is better.
  // Implementing strictly safe version below:

  const observerRef = useRef<ResizeObserver | null>(null);
  const measuredRef = React.useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (node !== null) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
          setWrapperHeight(height);
        }
      });
      observer.observe(node);
      observerRef.current = observer;
    }
  }, []);

  if (!timeline) return null;

  const years = [];
  for (let y = timeline.startDate.getUTCFullYear(); y <= timeline.endDate.getUTCFullYear(); y++) {
    years.push(y);
  }

  // Compute active month’s data
  let ledgerItems: { ledger: LedgerItem; isActive: boolean }[] = [];
  let properties: { property: IRentalPropertyEntity; status: string; isActive: boolean }[] = [];
  if (activeMonth) {
    const currentDate = new Date(Date.UTC(activeMonth.year, activeMonth.month, 1));

    const startEarly = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), 1));
    startEarly.setMonth(startEarly.getMonth() - 1);

    const endLate = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), 1));
    endLate.setMonth(endLate.getMonth() + 1);

    ledgerItems = timeline.user.ledgerCollection
      .filter((l) => {
        return l.created! >= startEarly && l.created! <= endLate;
      })
      .map((l) => {
        return { ledger: l, isActive: l.dateMatchesYearAndMonth(currentDate) };
      });

    properties = timeline.rentals
      .map((r) => {
        let status = 'AVAILABLE';
        if (r.property.purchaseDate && currentDate >= r.property.purchaseDate) status = 'OWNED';
        if (r.property.soldDate && currentDate >= r.property.soldDate) status = 'SOLD';
        const start = new Date(r.property.availableStartDate);
        const end = new Date(r.property.availableEndDate);
        return { property: r.property, status, isActive: currentDate >= start && currentDate <= end };
      })
      .filter((r) => {
        const start = new Date(r.property.availableStartDate);
        const end = new Date(r.property.availableEndDate);

        return start <= endLate && end >= startEarly;
      });
  }

  return (
    <div style={{ backgroundColor: 'gray', opacity: 0.95, minHeight: '100vh' }}>
      {/* Month sections only provide headers to drive activeMonth */}
      {years.map((year) => {
        const data = timeline.user.ledgerCollection.getSummariesAnnual(year);
        return data.map((ledgeSummary, index) => {
          const dynamicHeight = wrapperHeight > 0 ? wrapperHeight + 80 : 200;

          return (
            <MonthSection
              key={`${ledgeSummary.date.toString()}-${index}`}
              year={ledgeSummary.date.getUTCFullYear()}
              month={ledgeSummary.date.getUTCMonth()}
              setActiveMonth={setActiveMonth}
              minHeight={dynamicHeight}
            />
          );
        });
      })}
      {/* Sticky panel always visible */}
      {/* Global data panels update with activeMonth */}
      {/* Data layer sits behind headers, updates with activeMonth */}

      {/* Container for fixed overlay */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', pointerEvents: 'none', zIndex: 50 }}>
        {activeMonth && (
          <FixedWrapper ref={measuredRef} style={{ pointerEvents: 'auto' }}>
            <DataLayer>
              <LedgerGroup items={ledgerItems} />
            </DataLayer>
            <DataLayerProperty>
              {properties.length === 0 && <div>No properties available for this month</div>}
              {properties.map((p, i) => (
                <ItemOnOff key={i} visible={p.isActive}>
                  <PropertyCard property={p.property} status={p.status} />
                </ItemOnOff>
              ))}
            </DataLayerProperty>
          </FixedWrapper>
        )}
      </div>
    </div>
  );
}
