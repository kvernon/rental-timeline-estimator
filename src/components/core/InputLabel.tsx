import styled from '@emotion/styled';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { FontGroups } from '../../theming/fontGroups';

export const InputLabel = styled.label<{
  themeOptions: IThemeOptions;
  direction?: 'row' | 'column';
  fontGroup?: FontGroups;
}>`
  font-family: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.font};
  font-size: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.size};
  font-weight: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.weight};
  line-height: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.lineHeight};
  letter-spacing: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.letterSpacing};
  text-shadow: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.textShadow};
  display: flex;
  color: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.color};
  white-space: ${(props) => (props.fontGroup === FontGroups.inputLabel ? 'nowrap' : 'normal')};
  padding: 5px;
  transform: none;
  overflow: visible;
  align-self: ${(props) => (props.direction === 'column' ? 'flex-start' : 'center')};
  flex-grow: 2;

  &:focus {
    color: #9ee5ff;
  }
`;
