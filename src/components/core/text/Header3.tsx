import styled from '@emotion/styled';
import { IThemeOptions } from '../../../theming/IThemeOptions';
import { FontGroups } from '../../../theming/fontGroups';

export const Header3 = styled.h3<{ theme: IThemeOptions; fontGroup?: FontGroups }>`
  color: ${(props) => props.theme.typography.get(props.fontGroup || FontGroups.h3)?.color};
  font-family: ${(props) => props.theme.typography.get(props.fontGroup || FontGroups.h3)?.font};
  font-size: ${(props) => props.theme.typography.get(props.fontGroup || FontGroups.h3)?.size};
  font-weight: ${(props) => props.theme.typography.get(props.fontGroup || FontGroups.h3)?.weight};
  margin: 0;
`;
