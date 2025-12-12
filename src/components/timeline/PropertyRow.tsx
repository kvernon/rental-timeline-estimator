import { IHistoricalProperty } from '@cubedelement.com/realty-investor-timeline/dist/src/time/i-historical-property';
import React from 'react';
import { StackRowPill } from '../core/StackRowPill';
import { getOwnership } from './getOwnership';
import { PropertyIcon } from './PropertyIcon';
import { MonthsListed } from './MonthsListed';
import { Stack } from '../core/Stack';
import { PropertyCash } from './PropertyCash';
import { FontGroups } from '../../theming/fontGroups';
import { DateAvailable } from './DateAvailable';
import { currencyFormatter } from '../../data/currency-formatter';

export function PropertyRow(props: { historicalProperty: IHistoricalProperty }) {
  const costDownValue = props.historicalProperty.property.costDownPrice || 0;
  const costDownAmount = currencyFormatter(costDownValue);
  const marketTitle = costDownValue > 0 ? `Market ($${costDownAmount} Down Payment)` : 'Market';
  return (
    <StackRowPill direction="row">
      <Stack direction="column">
        <PropertyIcon
          address={props.historicalProperty.property.address}
          propertyType={props.historicalProperty.property.propertyType}
          status={getOwnership(props.historicalProperty.property)}
        />
        <Stack direction="row">
          <MonthsListed
            availableStartDate={props.historicalProperty.property.availableStartDate}
            availableEndDate={props.historicalProperty.property.availableEndDate}
          />
          <Stack direction="row" style={{ fontSize: '10pt' }}>
            Min Years to Sell: {props.historicalProperty.property.minSellYears}
          </Stack>
        </Stack>
      </Stack>
      <Stack borderDebug={false} paddingTop={'10px'} marginLeft={'20px'}>
        <DateAvailable
          availableStartDate={props.historicalProperty.property.availableStartDate}
          availableEndDate={props.historicalProperty.property.availableEndDate}
        />
        <PropertyCash value={props.historicalProperty.property.purchasePrice} title={marketTitle} />
        <PropertyCash
          fontGroup={FontGroups.h5}
          value={
            props.historicalProperty.property.soldDate
              ? props.historicalProperty.property.getEquityFromSell(props.historicalProperty.property.soldDate)
              : 0
          }
          title={'Equity'}
        />
        <PropertyCash fontGroup={FontGroups.h6} value={props.historicalProperty.property.rawEstimatedAnnualCashFlow} title={'Cash Flow'} />
      </Stack>
    </StackRowPill>
  );
}
