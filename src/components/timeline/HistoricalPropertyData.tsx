import React, { ReactNode } from 'react';
import { IHistoricalProperty } from '@cubedelement.com/realty-investor-timeline/dist/src/time/i-historical-property';

import { Stack } from '../core/Stack';
import { Reasons } from '../reasons/Reasons';
import { PropertyRow } from './PropertyRow';
import styled from '@emotion/styled';

const HistoricalPropertyDataStyle = styled(Stack)`
  width: 525px;
  padding-right: 10px;
`;

export function HistoricalPropertyData(props: { historicalProperty: IHistoricalProperty; endDate: Date }): ReactNode {
  return (
    <HistoricalPropertyDataStyle>
      <PropertyRow
        endDate={props.endDate}
        historicalProperty={props.historicalProperty}
        key={`property-${props.historicalProperty.property.address}`}
      />
      <Reasons historicalProperty={props.historicalProperty} />
    </HistoricalPropertyDataStyle>
  );
}
