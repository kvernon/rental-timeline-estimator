import styled from '@emotion/styled';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { FontGroups } from '../../theming/fontGroups';

export const Header6 = styled.h6<{ theme: IThemeOptions }>`
  color: ${(props) => props.theme.typography.get(FontGroups.panelTitle)?.color};
  font-family: ${(props) => props.theme.typography.get(FontGroups.panelTitle)?.font};
  font-size: ${(props) => props.theme.typography.get(FontGroups.panelTitle)?.size};
  font-weight: ${(props) => props.theme.typography.get(FontGroups.panelTitle)?.weight};
  margin: 0;
`;
