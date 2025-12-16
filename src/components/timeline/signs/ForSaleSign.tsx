import { Stack } from '../../core/Stack';
import styled from '@emotion/styled';
import { IThemeOptions } from '../../../theming/IThemeOptions';
import { FontGroups } from '../../../theming/fontGroups';
import { useTheme } from '@emotion/react';

export const SignStyle = styled(Stack)<{
  themeOptions: IThemeOptions;
}>`
  width: fit-content;
  font-family: ${(props) => props.themeOptions.typography.get(FontGroups.propertySignForSale)?.font};
  font-size: ${(props) => props.themeOptions.typography.get(FontGroups.propertySignForSale)?.size};
  font-weight: bold;
  background-color: ${(props) => props.themeOptions.palette.propertyStatusForSaleBackground};
  border: ${(props) => props.themeOptions.palette.propertyStatusForSaleBorder};
  border-radius: ${(props) => props.themeOptions.palette.propertyStatusRadius};
  color: ${(props) => props.themeOptions.typography.get(FontGroups.propertySignForSale)?.color};
  white-space: nowrap;
  min-width: auto;
  padding-left: 5px;
  padding-right: 5px;
  margin-top: 0;
`;

export function ForSaleSign() {
  const coreTheme = useTheme() as IThemeOptions;
  return <SignStyle themeOptions={coreTheme}>FOR SALE</SignStyle>;
}
