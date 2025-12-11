import { Stack } from '../../core/Stack';
import styled from '@emotion/styled';
import { IThemeOptions } from '../../../theming/IThemeOptions';
import { FontGroups } from '../../../theming/fontGroups';
import { useTheme } from '@emotion/react';

export const SignStyle = styled(Stack)<{
  themeOptions: IThemeOptions;
}>`
  width: fit-content;
  font-family: ${(props) => props.themeOptions.typography.get(FontGroups.propertySign)?.font};
  font-size: ${(props) => props.themeOptions.typography.get(FontGroups.propertySign)?.size};
  font-weight: bold;
  background-color: ${(props) => props.themeOptions.palette.propertyStatusSoldBackground};
  border: ${(props) => props.themeOptions.palette.propertyStatusBorder};
  border-radius: ${(props) => props.themeOptions.palette.propertyStatusRadius};
  rotate: -10deg;
  white-space: nowrap;
  min-width: auto;
  padding-left: 5px;
  padding-right: 5px;
  margin-top: 0;
  position: relative;
  top: 125px;
  left: 125px;
`;

export function SoldSign() {
  const coreTheme = useTheme() as IThemeOptions;
  return <SignStyle themeOptions={coreTheme}>SOLD</SignStyle>;
}
