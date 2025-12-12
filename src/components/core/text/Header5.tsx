import styled from '@emotion/styled';
import { IThemeOptions } from '../../../theming/IThemeOptions';
import { FontGroups } from '../../../theming/fontGroups';

export const Header5 = styled.h5<{ theme: IThemeOptions; fontGroup?: FontGroups }>`
  color: ${(props) => props.theme.typography.get(props.fontGroup || FontGroups.h5)?.color};
  font-family: ${(props) => props.theme.typography.get(props.fontGroup || FontGroups.h5)?.font};
  font-size: ${(props) => props.theme.typography.get(props.fontGroup || FontGroups.h5)?.size};
  font-weight: ${(props) => props.theme.typography.get(props.fontGroup || FontGroups.h5)?.weight};
  margin: 0;
`;
