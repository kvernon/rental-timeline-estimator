import { Stack } from '../components/core/Stack';
import React from 'react';
import { generate } from '../data/generate';
import styled from '@emotion/styled';
import { IUserInfo } from '../data/IUserInfo';
import { IPropertiesInformationPropsEvent } from './IPropertiesInformationProps';
import { ITimeline } from '@cubedelement.com/realty-investor-timeline';
import { Panel } from '../components/panels/Panel';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../theming/IThemeOptions';
import { Card } from '../components/core/Card';
import { getDate } from '../data/getDate';
import { HistoricalProperty } from '../components/timeline/HistoricalProperty';
import { StackSpaceBetween } from '../components/timeline/StackSpaceBetween';
import { PropertyTypeSpan } from '../components/timeline/PropertyTypeSpan';
import { AddressSpan } from '../components/timeline/AddressSpan';
import { DateCell } from '../components/timeline/DateCell';
import { OwnershipSpan } from '../components/timeline/OwnershipSpan';
import { MoneyCell } from '../components/timeline/MoneyCell';

const Err = styled(Stack)`
  padding-top: 30px;
  color: pink;
  text-align: center;
`;

export function RawResults(props: { userInfo: IUserInfo; propertiesInfo: IPropertiesInformationPropsEvent }) {
  try {
    const coreTheme = useTheme() as IThemeOptions;
    const results: ITimeline = generate(props.userInfo, props.propertiesInfo);
    return (
      <>
        <Panel title="User">
          <Card theme={coreTheme}>
            date range: {getDate(results.startDate)} - {getDate(results.endDate)}
          </Card>
          <Card theme={coreTheme}>end balance: {results.getBalance(results.endDate)}</Card>
          <Card theme={coreTheme}>estimated Monthly Cashflow: {results.getEstimatedMonthlyCashFlow()}</Card>
        </Panel>
        <Panel title="User">
          {results.user.ledgerCollection
            .filter((x) => !!x)
            .map((x, i) => (
              <Card theme={coreTheme} key={`ledger-${i}`}>
                date: {getDate(x.created as Date)}, amount: {x.amount}, note: {x.note}
              </Card>
            ))}
        </Panel>
        <Panel title="Properties">
          <StackSpaceBetween spacing={0}>
            <StackSpaceBetween direction={'row'} paddingLeft={'4px'}>
              <PropertyTypeSpan>Property:</PropertyTypeSpan>
              <AddressSpan>Address:</AddressSpan>
              <DateCell>Start:</DateCell>
              <DateCell>End:</DateCell>
              <OwnershipSpan>Ownership:</OwnershipSpan>
              <DateCell>Purchase:</DateCell>
              <DateCell>Sold:</DateCell>
              <MoneyCell>Cash flow:</MoneyCell>
              <MoneyCell>Cap Gains:</MoneyCell>
            </StackSpaceBetween>
            {results.rentals.map((x, i) => (
              <HistoricalProperty historicalProperty={x} key={`rental-${i}`} />
            ))}
          </StackSpaceBetween>
        </Panel>
      </>
    );
  } catch (e) {
    return <Err role="raw-results-failed">{(e as Error).message}</Err>;
  }
}
