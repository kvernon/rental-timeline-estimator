import styled from '@emotion/styled';
import { Stack } from '../core/Stack';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { FontGroups } from '../../theming/fontGroups';

export const DataNode = styled(Stack)<{
  themeOptions: IThemeOptions;
  validatorType: string;
}>`
  font-family: ${(coreTheme) => coreTheme.themeOptions.typography.get(FontGroups.inputGoal)?.font};
  font-size: ${(coreTheme) => coreTheme.themeOptions.typography.get(FontGroups.inputGoal)?.size};
  font-weight: ${(coreTheme) => coreTheme.themeOptions.typography.get(FontGroups.inputGoal)?.weight};
  color: ${(coreTheme) => coreTheme.themeOptions.typography.get(FontGroups.inputGoal)?.color};
  text-shadow: ${(coreTheme) => coreTheme.themeOptions.palette.validation[coreTheme.validatorType].validationColor} 0 0 5px;
  text-align: center;
`;
