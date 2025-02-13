import React, { ReactNode } from 'react';
import { IHistoricalProperty } from '@cubedelement.com/realty-investor-timeline/dist/src/time/i-historical-property';
import { PropertyType } from '@cubedelement.com/realty-investor-timeline';
import { IRentalPropertyEntity } from '@cubedelement.com/realty-investor-timeline/dist/src/properties';
import { Stack } from '../core/Stack';
import { getDate } from '../../data/getDate';
import { StackSpaceBetween } from './StackSpaceBetween';
import { PropertyTypeSpan } from './PropertyTypeSpan';
import { AddressSpan } from './AddressSpan';
import { OwnershipSpan } from './OwnershipSpan';
import { MoneyCell } from './MoneyCell';
import { DateCell } from './DateCell';

enum OwnershipType {
  NeverOwned,
  IsOwned,
  WasOwned,
}

const getOwnership = (property: IRentalPropertyEntity): OwnershipType => {
  if (property.isOwned) {
    return OwnershipType.IsOwned;
  }

  if (property.soldDate) {
    return OwnershipType.WasOwned;
  }

  return OwnershipType.NeverOwned;
};

export function HistoricalProperty(props: { historicalProperty: IHistoricalProperty }): ReactNode {
  return (
    <Stack direction={'column'}>
      <StackSpaceBetween direction={'row'}>
        <PropertyTypeSpan>{PropertyType[props.historicalProperty.property.propertyType]}</PropertyTypeSpan>
        <AddressSpan>{props.historicalProperty.property.address}</AddressSpan>
        <DateCell date={props.historicalProperty.property.availableStartDate} />
        <DateCell date={props.historicalProperty.property.availableEndDate} />
        <OwnershipSpan>{OwnershipType[getOwnership(props.historicalProperty.property)]}</OwnershipSpan>
        <DateCell date={props.historicalProperty.property.purchaseDate} />
        <DateCell date={props.historicalProperty.property.soldDate} />
        <MoneyCell currency={props.historicalProperty.property.rawEstimatedAnnualCashFlow} />
        <MoneyCell
          currency={
            props.historicalProperty.property.soldDate
              ? props.historicalProperty.property.getEquityFromSell(props.historicalProperty.property.soldDate)
              : 0
          }
        />
      </StackSpaceBetween>
      {props.historicalProperty.reasons.length > 0 && (
        <ul>
          {props.historicalProperty.reasons.map((x) => (
            <li key={`reason-${props.historicalProperty.property.address}`}>
              <span>{getDate(x.date)}</span>
              <span>{x.reason}</span>
            </li>
          ))}
        </ul>
      )}
    </Stack>
  );
}
