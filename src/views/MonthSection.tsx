import React from 'react';
import { useActiveMonth } from './useActiveMonth';
import { getDate } from '../data/getDate';
import styled from '@emotion/styled';

const StickyHeader = styled.h2`
  position: sticky;
  top: 100px;
  z-index: 100; /* header is always above */
  background: lightgray;
  padding: 12px;
  margin: 0;
`;

export function MonthSection({
  year,
  month,
  setActiveMonth,
  minHeight,
}: {
  year: number;
  month: number;
  setActiveMonth: React.Dispatch<React.SetStateAction<{ year: number; month: number } | null>>;
  minHeight: number;
}) {
  const sectionRef = useActiveMonth(year, month, setActiveMonth);
  const currentDate = new Date(Date.UTC(year, month, 1));

  return (
    <section ref={sectionRef} style={{ minHeight: `${minHeight}px`, transition: 'min-height 0.2s ease-out' }}>
      <StickyHeader>{getDate(currentDate)}</StickyHeader>
    </section>
  );
}
