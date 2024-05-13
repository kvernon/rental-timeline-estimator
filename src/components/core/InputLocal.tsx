import styled from '@emotion/styled';
import { Input } from './input';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { ValidatorTypes } from '../validators/ValidatorTypes';
import { FontGroups } from '../../theming/fontGroups';

export const InputLocal = styled(Input)<{
  themeOptions: IThemeOptions;
  validationType: ValidatorTypes;
  id: string;
  fontGroup?: FontGroups;
  useTransparent: boolean;
}>`
  font-family: ${(coreTheme) => coreTheme.themeOptions.typography.get(coreTheme.fontGroup ?? FontGroups.input)?.font};
  font-size: ${(coreTheme) => coreTheme.themeOptions.typography.get(coreTheme.fontGroup ?? FontGroups.input)?.size};
  font-weight: ${(coreTheme) => coreTheme.themeOptions.typography.get(coreTheme.fontGroup ?? FontGroups.input)?.weight};
  color: ${(coreTheme) => coreTheme.themeOptions.typography.get(coreTheme.fontGroup ?? FontGroups.input)?.color};

  ${(coreTheme) =>
    !coreTheme.useTransparent &&
    `
     background-color: ${coreTheme.themeOptions.palette.validation[ValidatorTypes[coreTheme.validationType]].background}41;

     &:hover {
        background-color: ${coreTheme.themeOptions.palette.validation[ValidatorTypes[coreTheme.validationType]].backgroundFocus}81;
     }

     &:focus {
        background-color: ${coreTheme.themeOptions.palette.validation[ValidatorTypes[coreTheme.validationType]].backgroundFocus}81;
     }
  `}

  ${(coreTheme) =>
    coreTheme.useTransparent &&
    `
     background-color: transparent;
     border-color: ${coreTheme.themeOptions.palette.validation[ValidatorTypes[coreTheme.validationType]].background};

     &:hover {
        border-color: ${coreTheme.themeOptions.palette.validation[ValidatorTypes[coreTheme.validationType]].backgroundFocus};
     }
   `}
`;
