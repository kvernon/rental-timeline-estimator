import styled from '@emotion/styled';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { FontGroups } from '../../theming/fontGroups';

export const InputSpanPaddingLeft = styled.span<{
  themeOptions: IThemeOptions;
  fontGroup?: FontGroups;
}>`
  font-family: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.font};
  font-size: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.size};
  font-weight: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.weight};
  line-height: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.lineHeight};
  letter-spacing: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.letterSpacing};
  color: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.color};
  margin: 0;
  padding: ${(props) => (props.title ? '5.5px 7px' : '7px')};
  display: inline-flex;
`;
