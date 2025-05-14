import { StackSpaceBetween } from './StackSpaceBetween';
import { PropertyTypeSpan } from '../cells/PropertyTypeSpan';
import { AddressSpan } from '../cells/AddressSpan';
import { DateCellStyle } from '../cells/DateCell';
import { OwnershipSpan } from '../cells/OwnershipSpan';
import { MoneyCellStyle } from '../cells/MoneyCell';
import { HistoricalPropertyData } from './HistoricalPropertyData';
import React from 'react';
import { IHistoricalProperty } from '@cubedelement.com/realty-investor-timeline/dist/src/time/i-historical-property';
import { Panel } from '../panels/Panel';

export function TimelineProperties(props: { rentals: IHistoricalProperty[] }) {
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
        {props.rentals.map((x, i) => (
          <HistoricalPropertyData historicalProperty={x} key={`rental-${i}`} />
        ))}
      </StackSpaceBetween>
    </Panel>
  );
}
