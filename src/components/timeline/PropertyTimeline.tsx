import { IHistoricalProperty } from '@cubedelement.com/realty-investor-timeline/dist/src/time/i-historical-property';
import React from 'react';
import { StackRowPill } from '../core/StackRowPill';
import { Stack } from '../core/Stack';
import { PropertyCash } from './PropertyCash';
import { FontGroups } from '../../theming/fontGroups';
import { currencyFormatter } from '../../data/currency-formatter';
import { Street } from './signs/Street';
import { PropertyType } from '@cubedelement.com/realty-investor-timeline';

export function PropertyTimeline(props: { historicalProperty: IHistoricalProperty }) {
  const costDownValue = props.historicalProperty.property.costDownPrice || 0;
  const costDownAmount = currencyFormatter(costDownValue);
  const marketTitle = costDownValue > 0 ? `Market ($${costDownAmount} Down Payment)` : 'Market';
  const imgSrc = `./images/${props.historicalProperty.property.propertyType === PropertyType.SingleFamily ? 'house' : 'apartment'}.gif`;

  return (
    <StackRowPill direction="column" borderDebug={true}>
      <Street address={props.historicalProperty.property.address} />
      <Stack direction="row" style={{ fontSize: '10pt' }} borderDebug={true}>
        Min Years to Sell: {props.historicalProperty.property.minSellYears}
      </Stack>
      <PropertyCash tighten={true} fontGroup={FontGroups.h6} value={props.historicalProperty.property.purchasePrice} title={marketTitle} />
      <PropertyCash
        tighten={true}
        fontGroup={FontGroups.h6}
        value={
          props.historicalProperty.property.soldDate
            ? props.historicalProperty.property.getEquityFromSell(props.historicalProperty.property.soldDate)
            : 0
        }
        title={'Equity'}
      />
      <PropertyCash
        tighten={true}
        fontGroup={FontGroups.h6}
        value={props.historicalProperty.property.rawEstimatedAnnualCashFlow}
        title={'Cash Flow'}
      />
      <Stack
        marginLeft={'0'}
        marginTop={'0'}
        marginBottom={'0'}
        paddingLeft={'0'}
        paddingRight={'0'}
        paddingTop={'0'}
        paddingBottom={'0'}
        style={{
          height: '0',
          overflow: 'visible',
          position: 'relative',
          transform: `translate(0, -60px)`,
        }}
      >
        <img width={88} height={58} src={imgSrc} alt={props.historicalProperty.property.address} title={props.historicalProperty.property.address} />
      </Stack>
    </StackRowPill>
  );
}
