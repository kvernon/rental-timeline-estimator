import { getDate } from '../data/getDate';
import React from 'react';
import { IThemeOptions } from '../theming/IThemeOptions';
import { useTheme } from '@emotion/react';
import { Header5 } from '../components/core/text/Header5';
import { currencyFormatter } from '../data/currency-formatter';
import { ItemOnOff } from './ItemOnOff';

export function CurrencyContainer({ amount, isActive, isAdd, date }: { amount: number; isActive: boolean; isAdd: boolean; date?: Date }) {
  const coreTheme = useTheme() as IThemeOptions;
  const positiveOrNegative = isAdd ? '+' : '-';

  return (
    <ItemOnOff visible={isActive}>
      <Header5 theme={coreTheme} style={{ float: 'left', width: '20px' }}>
        {positiveOrNegative}
      </Header5>
      <Header5 theme={coreTheme} style={{ float: 'left', width: '20px' }}>
        $
      </Header5>
      <Header5 theme={coreTheme} style={{ textAlign: 'right' }}>
        {currencyFormatter(amount)}
      </Header5>
      {date && <input type="hidden" value={getDate(date)} />}
    </ItemOnOff>
  );
}
