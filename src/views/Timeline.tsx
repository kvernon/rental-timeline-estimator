import { useFormSelector } from '../redux/hooks';
import { getTimeline } from '../redux/timelineSelectors';
import { LedgerItem, LedgerItemType } from '@cubedelement.com/realty-investor-timeline';
import { getDate } from '../data/getDate';
import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { currencyFormatter } from '../data/currency-formatter';
import { IHistoricalProperty } from '@cubedelement.com/realty-investor-timeline/dist/src/time/i-historical-property';
import { Stack } from '../components/core/Stack';
import { Header5 } from '../components/core/text/Header5';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../theming/IThemeOptions';
import { PropertyTimeline } from '../components/timeline/PropertyTimeline';

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

const ItemOnOff = styled(Stack)<{ visible: boolean }>`
  width: unset;
  color: ${({ visible }) => `#332211${visible ? '' : '11'}`};
  transition: all 0.6s ease;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

function LedgerItemDisplay({ item, isActive }: { item: LedgerItem; isActive: boolean }) {
  const isAdd = item.type !== LedgerItemType.Purchase;
  const positiveOrNegative = isAdd ? '+' : '-';
  const coreTheme = useTheme() as IThemeOptions;

  return (
    <ItemOnOff visible={isActive}>
      <Header5 theme={coreTheme}>
        {positiveOrNegative} {} ${currencyFormatter(item.amount)}
      </Header5>
    </ItemOnOff>
  );
}

function LedgerGroup({ items }: { items: { ledger: LedgerItem; isActive: boolean }[] }) {
  return (
    <Stack>
      {items.map((item, i) => (
        <LedgerItemDisplay key={`${getDate(item.ledger.created!)} ${i}`} item={item.ledger} isActive={item.isActive} />
      ))}
    </Stack>
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
  minHeight = 900,
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
  width: 15%;
  margin-left: 50px;
  display: inline-block;
  vertical-align: top;
  border: 1px solid #eee;
`;

const DataLayerProperty = styled(DataLayer)`
  margin-left: 5%; /* Spacing between columns */
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
`;

const FixedWrapper = styled.div`
  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  pointer-events: none;
  border: 1px solid #ff3c3c;
  justify-content: left;
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
  let properties: { property: IHistoricalProperty; status: string; isActive: boolean }[] = [];
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
        return { property: r, status, isActive: currentDate >= start && currentDate <= end };
      })
      .filter((r) => {
        const start = new Date(r.property.property.availableStartDate);
        const end = new Date(r.property.property.availableEndDate);

        return start <= endLate && end >= startEarly;
      });
  }

  return (
    <div style={{ backgroundColor: 'gray', opacity: 0.95, minHeight: '100vh' }}>
      {/* Month sections only provide headers to drive activeMonth */}
      {years.map((year) => {
        const data = timeline.user.ledgerCollection.getSummariesAnnual(year);
        return data.map((ledgeSummary, index) => {
          const dynamicHeight = wrapperHeight > 0 ? wrapperHeight + 80 : 500;

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
              {properties.map((p, i) => (
                <ItemOnOff key={i} visible={p.isActive} style={{ width: '400px', height: '100px', paddingRight: '10px' }}>
                  <PropertyTimeline historicalProperty={p.property} useSmall={true} />
                </ItemOnOff>
              ))}
            </DataLayerProperty>
          </FixedWrapper>
        )}
      </div>
    </div>
  );
}
