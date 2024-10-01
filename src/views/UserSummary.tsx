import { ITimeline } from '@cubedelement.com/realty-investor-timeline';
import { Stack } from '../components/core/Stack';
import { getDate } from '../data/getDate';
import React from 'react';
import { ValidationPanel } from '../components/panels/ValidationPanel';

export function UserSummary(props: { results: ITimeline }) {
  return (
    <ValidationPanel
      title={'Results'}
      isValid={() =>
        props.results.user.metMonthlyGoal(
          props.results.endDate,
          props.results.rentals.map((x) => x.property),
        )
      }
    >
      <Stack direction={'row'}>
        {' '}
        date range: {getDate(props.results.startDate)} - {getDate(props.results.endDate)}
      </Stack>
      <Stack direction={'row'}>end balance: {props.results.getBalance(props.results.endDate)}</Stack>
      <Stack direction={'row'}>estimated Monthly cash flow: {props.results.getEstimatedMonthlyCashFlow()}</Stack>
    </ValidationPanel>
  );
}
