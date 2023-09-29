import styled from '@emotion/styled';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { FontGroups } from '../../theming/fontGroups';

export const Header5 = styled.h5<{ theme: IThemeOptions }>`
  color: ${(props) => props.theme.typography.get(FontGroups.panelTitle)?.color};
  font-family: ${(props) => props.theme.typography.get(FontGroups.panelTitle)?.font};
  font-size: ${(props) => props.theme.typography.get(FontGroups.panelTitle)?.size};
  font-weight: ${(props) => props.theme.typography.get(FontGroups.panelTitle)?.weight};
  margin: 0;
`;
