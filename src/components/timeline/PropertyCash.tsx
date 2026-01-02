import { Stack } from '../core/Stack';
import { currencyFormatter } from '../../data/currency-formatter';
import React from 'react';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { FontGroups } from '../../theming/fontGroups';
import { Header } from '../core/text/Header';
import { TypographyDiv } from '../core/text/TypographyDiv';

export interface IPropertyCashHeaderProps {
  value: number;
  title: string;
  fontGroup?: FontGroups;
  tighten?: boolean;
}

export function PropertyCash({ value, title, fontGroup, tighten }: IPropertyCashHeaderProps) {
  const coreTheme = useTheme() as IThemeOptions;

  const Label = tighten ? TypographyDiv : Header;

  const valueString = value === 0 ? '0' : currencyFormatter(value);
  const adjustMinor = tighten ? '0.8em' : '0.9em';
  const adjustMarginTop = tighten ? '0px' : '5px';
  const adjustMarginBottom = tighten ? '0px' : '13px';
  return (
    <Stack marginBottom={adjustMarginBottom} marginTop={adjustMarginTop} style={{ textAlign: 'right' }}>
      <Label theme={coreTheme} fontGroup={fontGroup}>
        ${valueString}
      </Label>
      <Stack style={{ textAlign: 'right', fontSize: '10pt', lineHeight: adjustMinor }}>{title}</Stack>
    </Stack>
  );
}
