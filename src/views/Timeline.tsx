import { useFormSelector } from '../redux/hooks';
import { getTimeline } from '../redux/timelineSelectors';
import { LedgerItem, LedgerItemType } from '@cubedelement.com/realty-investor-timeline';
import { getDate } from '../data/getDate';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { IHistoricalProperty } from '@cubedelement.com/realty-investor-timeline/dist/src/time/i-historical-property';
import { Stack } from '../components/core/Stack';
import { PropertyTimeline } from '../components/timeline/PropertyTimeline';
import { AnimatePresence } from 'motion/react';
import { useYears } from '../components/ledger/useYears';
import { getLedgerAndProperties } from './getLedgerAndProperties';
import { MonthSection } from './MonthSection';
import { CurrencyContainer } from './CurrencyContainer';
import { ItemOnOff } from './ItemOnOff';

const DataLedgerTotalLayer = styled.div`
  position: relative;
  top: 10px;
  padding: 12px;
  width: 15%;
  margin-left: 50px;
  display: inline-block;
  float: left;
  vertical-align: top;
  border: 1px solid #291b46;
`;

const DataLayer = styled.div`
  position: relative;
  top: 100px;
  padding: 12px;
  width: 15%;
  margin-left: 50px;
  display: inline-block;
  vertical-align: top;
  border: 1px solid #eee;
`;

const DataLayerProperty = styled(DataLayer)`
  position: relative;
  top: 100px;
  margin-left: 5%; /* Spacing between columns */
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
`;

const FixedWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;
  pointer-events: none;
  border: 1px solid #ff3c3c;
  justify-content: left;
`;

function LedgerItemDisplay({ item, isActive }: { item: LedgerItem; isActive: boolean }) {
  const isAdd = item.type !== LedgerItemType.Purchase;
  return <CurrencyContainer isActive={isActive} amount={item.amount} isAdd={isAdd} date={item.created!} />;
}

function LedgerGroup({ items }: { items: { ledger: LedgerItem; isActive: boolean }[] }) {
  return (
    <Stack>
      {items.map((item, i) => (
        <AnimatePresence mode="wait" initial={false} key={`${getDate(item.ledger.created!)}-${i}`}>
          <LedgerItemDisplay key={`${getDate(item.ledger.created!)}-${i}`} item={item.ledger} isActive={item.isActive} />
        </AnimatePresence>
      ))}
    </Stack>
  );
}

export function Timeline() {
  const timeline = useFormSelector(getTimeline);
  const years = useYears();
  const [activeMonth, setActiveMonth] = useState<{ year: number; month: number } | null>(null);

  if (!timeline) return null;

  // Compute active month’s data
  let results: {
    ledgerItems: { ledger: LedgerItem; isActive: boolean }[];
    properties: { property: IHistoricalProperty; status: string; isActive: boolean }[];
  } | null = { ledgerItems: [], properties: [] };

  if (activeMonth) {
    results = getLedgerAndProperties(timeline, activeMonth);
  }

  return (
    <div style={{ backgroundColor: 'gray', opacity: 0.95, minHeight: '100vh' }}>
      {/* Month sections only provide headers to drive activeMonth */}
      {years.map((year) => {
        const data = timeline.user.ledgerCollection.getSummariesAnnual(year);
        return data.map((ledgeSummary, index) => {
          const dynamicHeight = results.properties.length > 0 || results.ledgerItems.length > 0 ? 1000 : 200;

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

      {/* Container for fixed overlay */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', pointerEvents: 'none', zIndex: 50 }}>
        {activeMonth && (
          <FixedWrapper style={{ pointerEvents: 'auto' }}>
            <DataLedgerTotalLayer>
              <CurrencyContainer
                isActive={true}
                amount={timeline.user.ledgerCollection.getBalance(new Date(Date.UTC(activeMonth.year, activeMonth.month, 1)))}
                isAdd={true}
              />
            </DataLedgerTotalLayer>
            <Stack direction="row">
              <DataLayer>
                <LedgerGroup items={results.ledgerItems} />
              </DataLayer>
              <DataLayerProperty>
                {results.properties.map((p, i) => (
                  <ItemOnOff key={i} visible={p.isActive} style={{ paddingRight: '10px' }}>
                    <PropertyTimeline historicalProperty={p.property} />
                  </ItemOnOff>
                ))}
              </DataLayerProperty>
            </Stack>
          </FixedWrapper>
        )}
      </div>
    </div>
  );
}
