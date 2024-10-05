import { Stack } from '../components/core/Stack';
import { getDate } from '../data/getDate';
import React from 'react';
import { ValidationPanel } from '../components/panels/ValidationPanel';
import { currencyFormatter } from '../data/data-number';

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
  return (
    <ValidationPanel title={'Results'} isValid={() => props.metMonthlyGoal}>
      <Stack direction={'row'}>
        {' '}
        Date range: {getDate(props.startDate)} - {getDate(props.endDate)}
      </Stack>
      <Stack direction={'row'}>End balance: {currencyFormatter(props.balance)}</Stack>
      <Stack direction={'row'}>Estimated monthly cash flow: {currencyFormatter(props.estimatedCashFlow)}</Stack>
      <Stack direction={'row'}>Every property owned: {props.allOwnedProperties}</Stack>
      <Stack direction={'row'}>Properties owned: {props.ownedProperties}</Stack>
      <Stack direction={'row'}>Properties equity: {currencyFormatter(props.equity)}</Stack>
    </ValidationPanel>
  );
}
