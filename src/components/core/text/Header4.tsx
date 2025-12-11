import styled from '@emotion/styled';
import { IThemeOptions } from '../../../theming/IThemeOptions';
import { FontGroups } from '../../../theming/fontGroups';

export const Header4 = styled.h4<{ theme: IThemeOptions; fontGroup?: FontGroups }>`
  color: ${(props) => props.theme.typography.get(props.fontGroup || FontGroups.h4)?.color};
  font-family: ${(props) => props.theme.typography.get(props.fontGroup || FontGroups.h4)?.font};
  font-size: ${(props) => props.theme.typography.get(props.fontGroup || FontGroups.h4)?.size};
  font-weight: ${(props) => props.theme.typography.get(props.fontGroup || FontGroups.h4)?.weight};
  margin: 0;
`;
