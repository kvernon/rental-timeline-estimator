import { ITimeline } from '@cubedelement.com/realty-investor-timeline';
import { Panel } from '../components/panels/Panel';
import { Stack } from '../components/core/Stack';
import { getDate } from '../data/getDate';
import React from 'react';

export function UserSummary(props: { results: ITimeline }) {
  return (
    <Panel title={'Results'}>
      <Stack direction={'row'}>
        {' '}
        date range: {getDate(props.results.startDate)} - {getDate(props.results.endDate)}
      </Stack>
      <Stack direction={'row'}>end balance: {props.results.getBalance(props.results.endDate)}</Stack>
      <Stack direction={'row'}>estimated Monthly cash flow: {props.results.getEstimatedMonthlyCashFlow()}</Stack>
    </Panel>
  );
}
