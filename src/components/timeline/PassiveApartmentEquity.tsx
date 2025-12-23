import { IHistoricalProperty } from '@cubedelement.com/realty-investor-timeline/dist/src/time/i-historical-property';
import { RentalPassiveApartment } from '@cubedelement.com/realty-investor-timeline';
import { PropertyCash } from './PropertyCash';
import { FontGroups } from '../../theming/fontGroups';
import React from 'react';
import { currencyFormatter } from '../../data/currency-formatter';

export function PassiveApartmentEquity(props: { historicalProperty: IHistoricalProperty; endDate: Date }) {
  if (!props.historicalProperty.property.soldDate) {
    const clone = props.historicalProperty.property.clone() as RentalPassiveApartment;
    clone.costDownPrice = clone.offeredInvestmentAmounts[0];

    return (
      <PropertyCash
        fontGroup={FontGroups.h5}
        value={clone.getEstimatedEquityFromSell(props.endDate)}
        title={`Potential Equity with $${currencyFormatter(clone.offeredInvestmentAmounts[0])} Down (${currencyFormatter(clone.investmentPercent)}%)`}
      />
    );
  }

  return (
    <PropertyCash
      fontGroup={FontGroups.h5}
      value={props.historicalProperty.property.getEquityFromSell(props.historicalProperty.property.soldDate)}
      title={'Equity Captured'}
    />
  );
}
