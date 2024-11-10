import { Stack } from '../components/core/Stack';
import { getDate } from '../data/getDate';
import React from 'react';
import { ValidationPanel } from '../components/panels/ValidationPanel';
import { GoalPanelDataSummary } from '../components/panels/GoalPanelDataSummary';
import { PanelDataSummary } from '../components/panels/PanelDataSummary';
import styled from '@emotion/styled';
import { currencyFormatter } from '../data/currency-formatter';

const StackContainer = styled(Stack)`
  align-items: stretch;
`;

const StackContainColumn = styled(Stack)`
  > div {
    margin-bottom: 10px;
  }

  > div:last-of-type {
    margin-bottom: 0;
  }
`;

export function UserSummary(props: {
  ownedProperties: number;
  allOwnedProperties: number;
  startDate: Date;
  endDate: Date;
  metMonthlyGoal: boolean;
  balance: number;
  equity: number;
  estimatedCashFlow: number;
}) {
  const isValid = () => props.metMonthlyGoal;
  return (
    <ValidationPanel title={`Results: ${getDate(props.startDate)} - ${getDate(props.endDate)}`} padRight={false} isValid={isValid}>
      <StackContainer direction="row" paddingLeft="0" paddingRight="0" paddingBottom="0">
        <Stack direction="row" paddingLeft="0" paddingRight="0" paddingBottom="0" marginBottom="0">
          <StackContainColumn direction="column" paddingLeft="0" paddingBottom="0">
            <PanelDataSummary title="Properties equity" data={currencyFormatter(props.equity)} />
            <PanelDataSummary title="End balance" data={currencyFormatter(props.balance)} />
          </StackContainColumn>
          <StackContainColumn direction="column" paddingLeft="10px" paddingBottom="0">
            <PanelDataSummary title="Property owned" data={props.allOwnedProperties.toString()} />
            <PanelDataSummary title="Current properties" data={props.ownedProperties.toString()} />
          </StackContainColumn>
        </Stack>
        <GoalPanelDataSummary data={props.estimatedCashFlow} isValid={isValid} />
      </StackContainer>
    </ValidationPanel>
  );
}
