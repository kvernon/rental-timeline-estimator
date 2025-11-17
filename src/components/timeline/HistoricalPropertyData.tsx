import React, { ReactNode } from 'react';
import { IHistoricalProperty } from '@cubedelement.com/realty-investor-timeline/dist/src/time/i-historical-property';
import { PropertyType } from '@cubedelement.com/realty-investor-timeline';
import { IRentalPropertyEntity } from '@cubedelement.com/realty-investor-timeline/dist/src/properties';
import { Stack } from '../core/Stack';
import styled from '@emotion/styled';
import { AddressSpan } from '../cells/AddressSpan';
import { DateCell } from '../cells/DateCell';
import { OwnershipSpan } from '../cells/OwnershipSpan';
import { MoneyCell } from '../cells/MoneyCell';
import { currencyFormatter } from '../../data/currency-formatter';

enum OwnershipType {
  NeverOwned,
  IsOwned,
  WasOwned,
}

const StackRowPill = styled(Stack)`
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #4f41b9;
  border-radius: 0.5rem;
  border: 0.1rem solid black;
  padding: 10px;
  align-items: center;
`;

const Img = styled.img`
  padding-top: 0;
`;

const getOwnership = (property: IRentalPropertyEntity): OwnershipType => {
  if (property.isOwned) {
    return OwnershipType.IsOwned;
  }

  if (property.soldDate) {
    return OwnershipType.WasOwned;
  }

  return OwnershipType.NeverOwned;
};

function PropertyRow(props: { historicalProperty: IHistoricalProperty }) {
  const propertyOption = props.historicalProperty.property.propertyType;

  return (
    <StackRowPill direction={'row'}>
      <Img
        width={`${629 / 8}px`}
        height={`${467 / 8}px`}
        title={props.historicalProperty.property.address}
        alt={props.historicalProperty.property.address}
        src={`./images/${propertyOption === PropertyType.SingleFamily ? 'house' : 'apartment'}-lg.gif`}
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

function ReasonDoesNotMeetUserRuleAnnualCashFlow(props: { reason: string }) {
  if (!props.reason.startsWith('DoesNotMeetUserRuleAnnualCashFlow')) {
    return null;
  }

  //"DoesNotMeetUserRuleAnnualCashFlow rule: 3600 property: 3156",
  const strings = props.reason.split(':');
  const rule = parseInt(strings[1].replace(' property', ''));
  const propertyCashFlow = parseInt(strings[2]);

  return (
    <>
      <span>Does Not Meet User Rule Annual Cash Flow</span>
      <span>Rule: {currencyFormatter(rule)}</span>
      <span>Property: {currencyFormatter(propertyCashFlow)}</span>
    </>
  );
}

function ReasonUserHasNoMoneyToInvest(props: { reason: string }) {
  if (!props.reason.startsWith('UserHasNoMoneyToInvest')) {
    return null;
  }

  return (
    <>
      <span>User Has No Money To Invest</span>
      <span>{currencyFormatter(parseInt(props.reason.split(':')[1]))}</span>
    </>
  );
}

function Reasons(props: { historicalProperty: IHistoricalProperty }) {
  if (props.historicalProperty.reasons.length === 0) {
    return null;
  }

  return (
    <ul>
      {props.historicalProperty.reasons.map((x) => {
        const userHaNoMoneyToInvest = <ReasonUserHasNoMoneyToInvest reason={x.reason} />;
        const ruleCashFlowFalse = <ReasonDoesNotMeetUserRuleAnnualCashFlow reason={x.reason} />;
        return (
          <li key={`reason-${props.historicalProperty.property.address}`}>
            <DateCell date={x.date} />
            {userHaNoMoneyToInvest}
            {ruleCashFlowFalse}
            {!userHaNoMoneyToInvest && !ruleCashFlowFalse && x.reason}
          </li>
        );
      })}
    </ul>
  );
}

export function HistoricalPropertyData(props: { historicalProperty: IHistoricalProperty }): ReactNode {
  return (
    <Stack direction={'column'}>
      <PropertyRow historicalProperty={props.historicalProperty} key={`property-${props.historicalProperty.property.address}`} />
      <Reasons historicalProperty={props.historicalProperty} />
    </Stack>
  );
}
