import styled from '@emotion/styled';
import { IThemeOptions } from '../../../theming/IThemeOptions';
import { FontGroups } from '../../../theming/fontGroups';

export const Header6 = styled.h6<{ theme: IThemeOptions; fontGroup?: FontGroups }>`
  color: ${(props) => props.theme.typography.get(props.fontGroup || FontGroups.h6)?.color};
  font-family: ${(props) => props.theme.typography.get(props.fontGroup || FontGroups.h6)?.font};
  font-size: ${(props) => props.theme.typography.get(props.fontGroup || FontGroups.h6)?.size};
  font-weight: ${(props) => props.theme.typography.get(props.fontGroup || FontGroups.h6)?.weight};
  margin: 0;
`;
