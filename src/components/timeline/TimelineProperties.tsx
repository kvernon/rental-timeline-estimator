import { StackSpaceBetween } from './StackSpaceBetween';
import { HistoricalPropertyData } from './HistoricalPropertyData';
import React from 'react';
import { Panel } from '../panels/Panel';
import { useFormSelector } from '../../redux/hooks';
import { getRentals } from '../../redux/timelineSelectors';
import { DEFAULT_START_DELAY } from '../IAnimatedProps';
import { AnimatedWrapFormItem } from '../AnimatedWrapFormItem';
import styled from '@emotion/styled';

const PropertyTypeSpanForProperties = styled(StackSpaceBetween)`
  flex-wrap: wrap;
`;

export function TimelineProperties() {
  const rentals = useFormSelector(getRentals);

  return (
    <Panel title={'Historical Properties'}>
      <StackSpaceBetween spacing={0}>
        <PropertyTypeSpanForProperties spacing={0} direction="row">
          {rentals.map((x, i) => (
            <AnimatedWrapFormItem delay={DEFAULT_START_DELAY * i}>
              <HistoricalPropertyData historicalProperty={x} key={`rental-${i}`} />
            </AnimatedWrapFormItem>
          ))}
        </PropertyTypeSpanForProperties>
      </StackSpaceBetween>
    </Panel>
  );
}
