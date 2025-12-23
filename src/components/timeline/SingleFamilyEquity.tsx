import { IHistoricalProperty } from '@cubedelement.com/realty-investor-timeline/dist/src/time/i-historical-property';
import { PropertyCash } from './PropertyCash';
import { FontGroups } from '../../theming/fontGroups';
import React from 'react';

export function SingleFamilyEquity(props: { historicalProperty: IHistoricalProperty; endDate: Date }) {
  return (
    <PropertyCash
      fontGroup={FontGroups.h5}
      value={
        props.historicalProperty.property.soldDate
          ? props.historicalProperty.property.getEquityFromSell(props.historicalProperty.property.soldDate)
          : props.historicalProperty.property.getEstimatedEquityFromSell(props.endDate)
      }
      title={props.historicalProperty.property.soldDate ? 'Equity Captured' : 'Potential Equity'}
    />
  );
}
