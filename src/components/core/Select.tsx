import { FontGroups } from '../../theming/fontGroups';
import ReactSelect from 'react-select';
import styled from '@emotion/styled';
import { IThemeOptions } from '../../theming/IThemeOptions';

export const Select = styled(ReactSelect)<{ themeOptions: IThemeOptions }>`
  appearance: none;
  white-space: pre-wrap;
  font-size: ${(props) => props.themeOptions.typography.get(FontGroups.inputLabel)?.size};
  font-family: ${(props) => props.themeOptions.typography.get(FontGroups.inputLabel)?.font};
  font-weight: ${(props) => props.themeOptions.typography.get(FontGroups.inputLabel)?.weight};
  width: 100%;
  padding-left: 10px;
  color: ${(props) => props.themeOptions.typography.get(FontGroups.input)?.color};
  overflow: visible;
`;
