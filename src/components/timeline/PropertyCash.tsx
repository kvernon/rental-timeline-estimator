import { Stack } from '../core/Stack';
import { currencyFormatter } from '../../data/currency-formatter';
import React from 'react';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { FontGroups } from '../../theming/fontGroups';
import { Header } from '../core/text/Header';

export interface IPropertyCashHeaderProps {
  value: number;
  title: string;
  fontGroup?: FontGroups;
}

export function PropertyCash({ value, title, fontGroup }: IPropertyCashHeaderProps) {
  const coreTheme = useTheme() as IThemeOptions;

  const valueString = value === 0 ? '0' : currencyFormatter(value);

  return (
    <Stack marginBottom={'13px'} marginTop={'5px'} style={{ textAlign: 'right' }}>
      <Header theme={coreTheme} fontGroup={fontGroup}>
        ${valueString}
      </Header>
      <Stack style={{ textAlign: 'right', fontSize: '10pt', lineHeight: '0.9em' }}>{title}</Stack>
    </Stack>
  );
}
