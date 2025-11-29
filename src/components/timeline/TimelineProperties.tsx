import { StackSpaceBetween } from './StackSpaceBetween';
import { PropertyTypeSpan } from '../cells/PropertyTypeSpan';
import { AddressSpan } from '../cells/AddressSpan';
import { DateCellStyle } from '../cells/DateCell';
import { OwnershipSpan } from '../cells/OwnershipSpan';
import { MoneyCellStyle } from '../cells/MoneyCell';
import { HistoricalPropertyData } from './HistoricalPropertyData';
import React from 'react';
import { Panel } from '../panels/Panel';
import { useFormSelector } from '../../redux/hooks';
import { getRentals } from '../../redux/timeilneSelectors';
import { DEFAULT_START_DELAY } from '../IAnimatedProps';
import { AnimatedWrapFormItem } from '../AnimatedWrapFormItem';

export function TimelineProperties() {
  const rentals = useFormSelector(getRentals);

  return (
    <Panel title={'Historical Properties'}>
      <StackSpaceBetween spacing={0}>
        <StackSpaceBetween direction={'row'} paddingLeft={'4px'}>
          <PropertyTypeSpan>Property:</PropertyTypeSpan>
          <AddressSpan>Address:</AddressSpan>
          <DateCellStyle>Start:</DateCellStyle>
          <DateCellStyle>End:</DateCellStyle>
          <OwnershipSpan>Ownership:</OwnershipSpan>
          <DateCellStyle>Purchase:</DateCellStyle>
          <DateCellStyle>Sold:</DateCellStyle>
          <MoneyCellStyle>Cash flow:</MoneyCellStyle>
          <MoneyCellStyle>Equity:</MoneyCellStyle>
        </StackSpaceBetween>
        {rentals.map((x, i) => (
          <AnimatedWrapFormItem delay={DEFAULT_START_DELAY * i}>
            <HistoricalPropertyData historicalProperty={x} key={`rental-${i}`} />
          </AnimatedWrapFormItem>
        ))}
      </StackSpaceBetween>
    </Panel>
  );
}
