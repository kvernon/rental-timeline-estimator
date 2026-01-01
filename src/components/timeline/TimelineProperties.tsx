import { StackSpaceBetween } from './StackSpaceBetween';
import { HistoricalPropertyData } from './HistoricalPropertyData';
import React from 'react';
import { Panel } from '../panels/Panel';
import { useFormSelector } from '../../redux/hooks';
import { getRentals, getStartAndEndDate } from '../../redux/timelineSelectors';
import { DEFAULT_START_DELAY } from '../IAnimatedProps';
import { AnimatedWrapFormItem } from '../AnimatedWrapFormItem';
import styled from '@emotion/styled';

const PropertyTypeSpanForProperties = styled(StackSpaceBetween)`
  flex-wrap: wrap;
`;

export function TimelineProperties() {
  const rentals = useFormSelector(getRentals);
  const [, endDate] = useFormSelector(getStartAndEndDate);

  return (
    <Panel title={'Historical Properties'}>
      <StackSpaceBetween>
        <PropertyTypeSpanForProperties direction="row">
          {rentals.map((x, i) => (
            <AnimatedWrapFormItem delay={DEFAULT_START_DELAY * i} key={`rental-${i}`}>
              <HistoricalPropertyData endDate={endDate!} historicalProperty={x} />
            </AnimatedWrapFormItem>
          ))}
        </PropertyTypeSpanForProperties>
      </StackSpaceBetween>
    </Panel>
  );
}
