import { IHistoricalProperty } from '@cubedelement.com/realty-investor-timeline/dist/src/time/i-historical-property';
import { PropertyType } from '@cubedelement.com/realty-investor-timeline';
import { AddressSpan } from '../cells/AddressSpan';
import { DateCell } from '../cells/DateCell';
import { OwnershipSpan } from '../cells/OwnershipSpan';
import { MoneyCell } from '../cells/MoneyCell';
import React from 'react';
import styled from '@emotion/styled';
import { Stack } from '../core/Stack';
import { IRentalPropertyEntity } from '@cubedelement.com/realty-investor-timeline';

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

const Img = styled.img`
  padding-top: 0;
`;

const StackRowPill = styled(Stack)`
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #4f41b9;
  border-radius: 0.5rem;
  border: 0.1rem solid black;
  padding: 10px;
  align-items: center;
`;

export function PropertyRow(props: { historicalProperty: IHistoricalProperty }) {
  const propertyOption = props.historicalProperty.property.propertyType;

  return (
    <StackRowPill direction={'row'}>
      <Img
        title={props.historicalProperty.property.address}
        alt={props.historicalProperty.property.address}
        src={`./images/${propertyOption === PropertyType.SingleFamily ? 'house' : 'apartment'}.gif`}
      />
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
    </StackRowPill>
  );
}
