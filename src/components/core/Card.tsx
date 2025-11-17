import styled from '@emotion/styled';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { FontGroups } from '../../theming/fontGroups';

export const Card = styled.div<{ theme: IThemeOptions }>`
  background: ${(props) => `linear-gradient(#7950C5, ${props.theme.palette.panelBackground} 3px)`};
  color: ${(props) => props.theme.typography.get(FontGroups.panelTitle)?.color};
  box-shadow: 0 10px 15px rgba(16, 27, 30, 0.4);
  border: 0.3rem solid black;
  border-radius: 0.3rem;
`;
